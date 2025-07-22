# app.py
import csv
import json
import os
from io import StringIO

import requests
from flask import Flask, jsonify, request, send_from_directory

# Define the HTML filename as a constant
HTML_FILENAME = "KNS.html"

# Initialize Flask app, explicitly setting static and template folders to the current directory
app = Flask(__name__, static_folder=".", template_folder=".")


# Route to serve the main HTML file (KNS.html) when accessing the root URL or /KNS.html
@app.route("/")
def serve_kns_html_root():
    return send_from_directory(app.root_path, HTML_FILENAME)


@app.route(f"/{HTML_FILENAME}")
def serve_kns_html_explicit():
    return send_from_directory(app.root_path, HTML_FILENAME)


# Route to serve other static files (JS, CSS, etc.)
# This route will catch requests for odataConfig.js, style.css, etc.
@app.route("/<path:filename>")
def static_files(filename):
    # Ensure that the requested file is within the current directory to prevent directory traversal attacks
    # This is a basic safety check.
    if not os.path.exists(os.path.join(app.root_path, filename)):
        return "File not found", 404
    return send_from_directory(app.root_path, filename)


def json_to_csv(json_data):
    """
    Converts JSON data into a CSV string.
    Handles OData responses (data in 'value' key) and direct lists of dictionaries.
    If the data is a single dictionary, it will be treated as a single row.
    """
    print(f"Attempting JSON to CSV conversion. Input type: {type(json_data)}")
    if not json_data:
        print("JSON data is empty for CSV conversion.")
        return ""

    data_rows = []
    if isinstance(json_data, dict):
        if "value" in json_data and isinstance(json_data["value"], list):
            data_rows = json_data["value"]
            print(f"CSV: Found 'value' key with {len(data_rows)} items.")
        else:
            # Assume it's a single object that should be a single row in CSV
            data_rows = [json_data]
            print("CSV: Treating as single dictionary row.")
    elif isinstance(json_data, list):
        data_rows = json_data
        print(f"CSV: Treating as direct list with {len(data_rows)} items.")
    else:
        print(
            f"Warning: Unexpected JSON data format for CSV conversion: {type(json_data)}. Expected dict or list."
        )
        return ""  # Cannot convert to CSV

    if not data_rows:
        print("No data rows found for CSV conversion.")
        return ""

    # Collect all unique headers from all rows to ensure all columns are captured
    headers = set()
    for row in data_rows:
        if isinstance(row, dict):
            headers.update(row.keys())
    headers = sorted(list(headers))  # Sort headers for consistent column order
    print(f"CSV Headers identified: {headers}")

    output = StringIO()
    writer = csv.writer(output)

    writer.writerow(headers)  # Write header row

    for i, row in enumerate(data_rows):
        if isinstance(row, dict):
            # Ensure values are strings to prevent csv.writer errors with non-string types
            writer.writerow(
                [str(row.get(header, "")) for header in headers]
            )  # Write data rows
        else:
            # This case should ideally not happen if data_rows contains only dicts,
            # but as a fallback, convert to string.
            print(
                f"Warning: Row {i} is not a dictionary for CSV conversion: {type(row)}"
            )
            writer.writerow([str(row)])

    return output.getvalue()


# API endpoint to fetch and save OData data
@app.route("/fetch_and_save_data", methods=["POST"])
def fetch_and_save_data():
    data = request.json
    url = data.get("url")
    filename_base = data.get(
        "filename", "knesset_odata_data"
    )  # Base filename without extension
    save_format = data.get("save_format", "json")  # 'json', 'csv', or 'both'

    if not url:
        return jsonify({"status": "error", "message": "URL is missing."}), 400

    print("\n--- New Fetch Request ---")
    print(f"Server received request to fetch: {url}")
    print(f"Server saving as: {save_format}")

    try:
        # Fetch data from the OData URL
        response = requests.get(url, headers={"Accept": "application/json"})
        response.raise_for_status()  # Raise an HTTPError for bad responses (4xx or 5xx)

        json_content = None
        csv_content = None
        fetched_json_data = None  # Store parsed JSON data

        try:
            fetched_json_data = response.json()
            json_content = json.dumps(fetched_json_data, indent=2, ensure_ascii=False)
            print("Successfully parsed response as JSON.")

            # Only attempt CSV conversion if JSON parsing was successful and format requested
            if save_format in ["csv", "both"]:
                csv_content = json_to_csv(fetched_json_data)
                if (
                    csv_content is None
                ):  # json_to_csv might return None if conversion fails
                    print("CSV conversion failed or returned None.")
                elif csv_content == "":
                    print("CSV content is empty (no data rows).")
                else:
                    print("CSV content generated successfully.")

        except json.JSONDecodeError as e:
            # If the response is not JSON, save it as plain text regardless of format request
            print(f"Response is NOT valid JSON. Error: {e}. Saving as plain text.")
            plain_text_content = response.text

            save_path = os.path.join(app.root_path, f"{filename_base}.txt")
            with open(save_path, "w", encoding="utf-8") as f:
                f.write(plain_text_content)
            return jsonify(
                {
                    "status": "success",
                    "message": f"Response was not JSON. Saved as plain text to {filename_base}.txt on the server.",
                }
            )

        messages = []

        if save_format in ["json", "both"] and json_content:
            json_filename = f"{filename_base}.json"
            save_path = os.path.join(app.root_path, json_filename)
            with open(save_path, "w", encoding="utf-8") as f:
                f.write(json_content)
            messages.append(f"JSON saved to {json_filename}")
            print(f"Saved {json_filename}")

        if (
            save_format in ["csv", "both"] and csv_content is not None
        ):  # Check for None explicitly as empty string is valid
            if csv_content != "":  # Only save if there's actual CSV content
                csv_filename = f"{filename_base}.csv"
                save_path = os.path.join(app.root_path, csv_filename)
                with open(
                    save_path, "w", encoding="utf-8", newline=""
                ) as f:  # newline='' is crucial for csv.writer
                    f.write(csv_content)
                messages.append(f"CSV saved to {csv_filename}")
                print(f"Saved {csv_filename}")
            else:
                messages.append("CSV not saved (no data or conversion issue).")
                print("CSV not saved because content was empty.")

        if not messages:
            return jsonify(
                {
                    "status": "error",
                    "message": "No content was saved. Check URL or data format.",
                }
            ), 500

        return jsonify(
            {"status": "success", "message": " and ".join(messages) + " on the server."}
        )

    except requests.exceptions.RequestException as e:
        error_message = f"Error fetching data from OData service: {e}"
        print(error_message)
        return jsonify({"status": "error", "message": error_message}), 500
    except Exception as e:
        error_message = f"An unexpected server error occurred: {e}"
        print(error_message)
        return jsonify({"status": "error", "message": error_message}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
