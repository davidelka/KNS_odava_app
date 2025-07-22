## Knesset OData URL Builder: Setup and Usage Guide

This guide will walk you through setting up and running the Knesset OData URL Builder application. This tool allows you to construct OData URLs for the Knesset ParliamentInfo service, fetch data using a Python backend (to bypass browser security restrictions), and save that data as JSON, CSV, or both.

### Prerequisites

Before you begin, ensure you have the following installed on your computer:

* **Python 3.x:** You can download it from [python.org](https://www.python.org/downloads/).

* **pip:** This is Python's package installer and usually comes bundled with Python.

### Step-by-Step Setup

1.  **Create a Project Folder:**
    Create a new, empty folder on your computer (e.g., `KnessetOdataApp`). This folder will contain all the application files.

2.  **Save the Application Files:**
    Save the following four files directly into the `KnessetOdataApp` folder:

    * **`app.py`**: This is the Python Flask server that hosts the web UI and handles data fetching.

    * **`KNS.html`**: This is the main web interface (the HTML file).

    * **`odataConfig.js`**: This JavaScript file contains the data (table names and field metadata).

    * **`style.css`**: This file contains the styling for the web interface.

    *(You should have received these files from your friend. Ensure the filenames are exactly as listed, including capitalization. **Note for Ubuntu/Linux users:** Filenames are case-sensitive. `KNS.html` is different from `kns.html`.)*

3.  **Install Python Dependencies:**
    The project uses a few Python libraries. You'll install them using `pip` and the `requirements.txt` file.

    * Open your **Terminal** (macOS/Linux/Ubuntu) or **Command Prompt** (Windows).

        * **Windows:** Search for "cmd" or "PowerShell" in your Start menu.

        * **Ubuntu/Linux/macOS:** Look for "Terminal" in your applications.

    * Navigate to your `KnessetOdataApp` folder using the `cd` command. For example:

        * **Windows:**

            ```
            cd C:\Users\YourUser\Desktop\KnessetOdataApp
            ```

        * **Ubuntu/Linux/macOS:**

            ```
            cd /home/youruser/Desktop/KnessetOdataApp
            # or simply drag and drop the folder into the terminal after typing 'cd '
            ```

        (Replace the example path with the actual path to your folder.)

    * Once inside the folder, run the following command to install the required libraries:

        ```
        pip install Flask requests
        ```

        *(Alternatively, if you received a `requirements.txt` file, you can use `pip install -r requirements.txt`)*

4.  **Start the Python Flask Server:**

    * In the same Terminal/Command Prompt window (still inside the `KnessetOdataApp` folder), run the Flask server:

        ```
        python app.py
        # On some Ubuntu/Linux systems, you might need to use 'python3' instead:
        # python3 app.py
        ```

    * You should see output similar to this:

        ```
         * Serving Flask app 'app'
         * Debug mode: on
        WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
         * Running on [http://127.0.0.1:5000](http://127.0.0.1:5000)
        Press CTRL+C to quit
        ```

    * Keep this terminal window open and running while you are using the application.

5.  **Access the Web Interface:**

    * Open your web browser (Chrome, Firefox, Edge, etc.).

    * Go to the following address:

        ```
        [http://127.0.0.1:5000/](http://127.0.0.1:5000/)
        ```

        or

        ```
        [http://127.0.0.1:5000/KNS.html](http://127.0.0.1:5000/KNS.html)
        ```

    * The Knesset OData URL Builder should now load in your browser.

### How to Use the Application

1.  **Select Table:** Choose the OData table you want to query from the "Select Table" dropdown.

2.  **Build Filters:**

    * Click "Add Filter Clause" to add a new row.

    * For each row, select a **Field** (the available fields will update based on your selected table), an **Operator** (e.g., `eq` for equals, `contains` for partial string match), and enter a **Value**.

    * If you add multiple clauses, you can choose between `AND` or `OR` to combine them.

3.  **Order By (Optional):**

    * Select a field from the "Order By" dropdown to sort your results.

    * Choose "Ascending" or "Descending" for the sort order.

4.  **Generate URL:**

    * Click the "Generate URL" button. The complete OData URL will appear in the "Generated URL" box. You can copy this URL to your clipboard using the "Copy URL" button if you want to use it directly in another tool or browser tab.

5.  **Fetch & Save Data:**

    * In the "Filename Base" input, you can specify a name for your data file (e.g., `my_bill_data`). The appropriate extension (`.json` or `.csv`) will be added automatically.

    * Select your desired "Save Format":

        * **JSON (.json):** Saves the raw OData response as a pretty-printed JSON file.

        * **CSV (.csv):** Converts the data into a Comma Separated Values file.

        * **Both (JSON & CSV):** Saves the data in both formats.

    * Click the "Fetch & Save Data (on server)" button.

### Where is the Data Saved?

When you click "Fetch & Save Data (on server)", the data files (`.json`, `.csv`, or `.txt` if the response isn't JSON) will be saved in the **same directory where your `app.py` file is located**. Check that folder after a successful fetch.

### Troubleshooting

* **"Error: Network error: Could not connect to the Python server."**: Make sure your Flask server is running in the terminal (`python app.py`) and that you're accessing `http://127.0.0.1:5000/` in your browser.

* **"Error: HTTP error! Status: 404"**: Double-check that all your files (`app.py`, `KNS.html`, `odataConfig.js`, `style.css`) are in the same folder, and that you've typed `http://127.0.0.1:5000/KNS.html` (or just `http://127.0.0.1:5000/`) correctly in your browser. Also, ensure the filename `KNS.html` is exactly correct, including capitalization. **Remember for Ubuntu/Linux users:** Filenames are case-sensitive!

* **CSV file is empty or incorrect**: This can happen if the OData response structure is unexpected. The Python server's terminal window will often show `Warning: Unexpected JSON data format for CSV conversion` if it encounters an issue.

* **"Error fetching data from OData service: ..."**: This indicates a problem with the OData service itself or the URL you constructed. Check the generated URL by pasting it directly into a new browser tab to see if it works there.

If you encounter any other issues, please describe them in detail, including any error messages you see in the browser's developer console (F12) or in the terminal where the Flask server is running.
