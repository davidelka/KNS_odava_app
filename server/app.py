# app.py
import csv
import json
import os
from io import StringIO
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

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
    base_url_from_frontend = data.get("url")
    filename_base = data.get(
        "filename", "knesset_odata_data"
    )  # Base filename without extension
    save_format = data.get("save_format", "json")  # 'json', 'csv', or 'both'

    # Define a timeout for external requests (e.g., 30 seconds)
    REQUEST_TIMEOUT = 30

    if not base_url_from_frontend:
        return jsonify({"status": "error", "message": "URL is missing."}), 400

    print("\n--- New Fetch Request ---")
    print(f"Server received request to fetch: {base_url_from_frontend}")
    print(f"Server saving as: {save_format}")

    parsed_url = urlparse(base_url_from_frontend)
    query_params = parse_qs(parsed_url.query)

    # Check if $top or $skip are already present in the URL
    top_param_exists = "$top" in query_params
    skip_param_exists = "$skip" in query_params

    all_records = []
    total_count = -1  # -1 indicates count not determined or not applicable
    chunk_size = 1000  # Define a reasonable chunk size for pagination

    try:
        # If $top is already specified, or $skip is present, assume user wants specific range
        # and don't attempt full pagination. Just fetch the given URL.
        if top_param_exists or skip_param_exists:
            print(
                "'$top' or '$skip' found in URL. Fetching single request as specified."
            )
            response = requests.get(
                base_url_from_frontend,
                headers={"Accept": "application/json"},
                timeout=REQUEST_TIMEOUT,
            )
            response.raise_for_status()
            fetched_json_data = response.json()
            if isinstance(fetched_json_data, dict) and "value" in fetched_json_data:
                all_records = fetched_json_data["value"]
            else:
                all_records = (
                    fetched_json_data  # Assume it's already the data or a single object
                )
            print(f"Fetched {len(all_records)} records from single request.")

        else:  # No $top or $skip, attempt full pagination
            print("No '$top' or '$skip' found. Attempting full pagination.")
            # 1. Get total count first
            count_query_params = query_params.copy()
            count_query_params["$count"] = ["true"]
            count_query_params["$top"] = ["0"]  # Request 0 records, just the count

            count_url_parts = list(parsed_url)
            count_url_parts[4] = urlencode(
                count_query_params, doseq=True
            )  # Rebuild query string
            count_url = urlunparse(count_url_parts)

            print(f"Fetching total count from: {count_url}")
            count_response = requests.get(
                count_url,
                headers={"Accept": "application/json"},
                timeout=REQUEST_TIMEOUT,
            )
            count_response.raise_for_status()
            count_data = count_response.json()

            if isinstance(count_data, dict) and "@odata.count" in count_data:
                total_count = int(count_data["@odata.count"])
                print(f"Total records available: {total_count}")
            else:
                print(
                    "Could not determine total count from OData service. Falling back to fetching until no more data."
                )
                # If count not available, we'll just fetch until response is empty

            current_skip = 0
            while True:
                page_query_params = query_params.copy()
                page_query_params["$top"] = [str(chunk_size)]
                page_query_params["$skip"] = [str(current_skip)]

                page_url_parts = list(parsed_url)
                page_url_parts[4] = urlencode(page_query_params, doseq=True)
                page_url = urlunparse(page_url_parts)

                print(f"Fetching chunk from: {page_url}")
                page_response = requests.get(
                    page_url,
                    headers={"Accept": "application/json"},
                    timeout=REQUEST_TIMEOUT,
                )
                page_response.raise_for_status()
                page_data = page_response.json()

                if (
                    isinstance(page_data, dict)
                    and "value" in page_data
                    and isinstance(page_data["value"], list)
                ):
                    current_chunk_records = page_data["value"]
                elif isinstance(page_data, list):  # Direct list of records
                    current_chunk_records = page_data
                else:  # Single object or unexpected format, stop
                    current_chunk_records = []
                    if page_data:  # If it's not empty, it might be a single record
                        current_chunk_records = [page_data]

                if not current_chunk_records:
                    print("No more records in chunk. Stopping pagination.")
                    break  # No more data

                all_records.extend(current_chunk_records)
                print(
                    f"Fetched {len(current_chunk_records)} records in this chunk. Total fetched: {len(all_records)}"
                )

                if total_count != -1 and len(all_records) >= total_count:
                    print(f"Reached total count ({total_count}). Stopping pagination.")
                    break  # Fetched all expected records

                current_skip += chunk_size
                # Add a safeguard against infinite loops if total_count is wrong or not provided
                if len(current_chunk_records) < chunk_size and total_count == -1:
                    print(
                        "Last chunk was smaller than chunk size and total count unknown. Assuming end of data."
                    )
                    break

        json_content = json.dumps(all_records, indent=2, ensure_ascii=False)
        print(f"Aggregated {len(all_records)} records for saving.")

        messages = []

        if save_format in ["json", "both"] and json_content:
            json_filename = f"{filename_base}.json"
            save_path = os.path.join(app.root_path, json_filename)
            with open(save_path, "w", encoding="utf-8") as f:
                f.write(json_content)
            messages.append(f"JSON saved to {json_filename}")
            print(f"Saved {json_filename}")

        if (
            save_format in ["csv", "both"] and all_records
        ):  # Check all_records for CSV conversion
            csv_content = json_to_csv(all_records)  # Pass the aggregated list directly
            if csv_content is not None and csv_content != "":
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
                print("CSV not saved because content was empty or conversion failed.")

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

    except requests.exceptions.Timeout:
        error_message = f"Request timed out after {REQUEST_TIMEOUT} seconds. The OData service might be slow or unresponsive."
        print(error_message)
        return jsonify(
            {"status": "error", "message": error_message}
        ), 504  # 504 Gateway Timeout
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
