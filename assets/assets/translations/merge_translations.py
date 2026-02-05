import json
import os
import glob

def merge_json_files(main_file, subdirectory):
    """Merge all JSON files from subdirectory into main file"""

    # Start with empty dict (don't load main file - it will be overwritten)
    merged_data = {}

    # Get all JSON files from subdirectory
    sub_files = glob.glob(os.path.join(subdirectory, '*.json'))

    for sub_file in sub_files:
        with open(sub_file, 'r', encoding='utf-8-sig') as f:
            sub_data = json.load(f)

        # Get module name from filename (without .json extension)
        module_name = os.path.splitext(os.path.basename(sub_file))[0]

        # Merge dictionaries (sub_data should be a dict)
        if isinstance(sub_data, dict):
            merged_data[module_name] = sub_data

    # Write merged data to main file (in root translations directory)
    with open(main_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)

    print(f"Merged {len(sub_files)} sub-files -> {main_file}")

# Merge English translations
merge_json_files('en.json', 'en')

# Merge Russian translations
merge_json_files('ru.json', 'ru')

print("Translation files merged successfully!")
