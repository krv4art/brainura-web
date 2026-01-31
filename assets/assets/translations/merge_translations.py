import json
import os
import glob

def merge_json_files(main_file, subdirectory):
    """Merge main JSON file with all JSON files from subdirectory"""
    
    # Load main JSON file (use utf-8-sig to handle BOM)
    with open(main_file, 'r', encoding='utf-8-sig') as f:
        merged_data = json.load(f)
    
    # Get all JSON files from subdirectory
    sub_files = glob.glob(os.path.join(subdirectory, '*.json'))
    
    for sub_file in sub_files:
        with open(sub_file, 'r', encoding='utf-8-sig') as f:
            sub_data = json.load(f)
        
        # Merge dictionaries (sub_data should be a dict)
        if isinstance(sub_data, dict):
            merged_data.update(sub_data)
    
    # Write merged data to output file
    output_file = os.path.join(subdirectory, os.path.basename(main_file))
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=2)
    
    print(f"Merged {main_file} + {len(sub_files)} sub-files -> {output_file}")

# Merge English translations
merge_json_files('en.json', 'en')

# Merge Russian translations
merge_json_files('ru.json', 'ru')

print("Translation files merged successfully!")
