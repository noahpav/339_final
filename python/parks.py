import json
import os
from jinja2 import Template

# File paths
json_file_path = "../data/parks_data.json"  # Path to the JSON file
template_file_path = "../python/template.html"  # Path to the HTML template
parks_directory = "../parks/"  # Root directory for parks

# Load JSON data
with open(json_file_path) as f:
    parks_data = json.load(f)

# Load the HTML template
with open(template_file_path) as f:
    template_content = f.read()

template = Template(template_content)

# Generate an HTML page for each park
for park in parks_data:
    # Normalize the park name to create a folder-friendly name
    folder_name = park["name"].lower().replace(" ", "_")
    park_folder_path = os.path.join(parks_directory, folder_name)

    # Ensure the park folder exists
    os.makedirs(park_folder_path, exist_ok=True)

    # Generate the HTML content
    html_content = template.render(park=park)

    # Define the output file path
    output_file_path = os.path.join(park_folder_path, f"{folder_name}.html")

    # Write the HTML content to the file
    with open(output_file_path, "w") as f:
        f.write(html_content)

    print(f"Generated HTML for {park['name']} at {output_file_path}")
