import json
import os

def flatten_dict(d, parent_key='', sep='.'):
    """Flatten a nested dictionary into dot notation"""
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

def flatten_json_file(input_file):
    """Flatten a JSON file and save it"""
    # Load nested JSON
    with open(input_file, 'r', encoding='utf-8-sig') as f:
        nested_data = json.load(f)

    # Flatten the dictionary
    flat_data = flatten_dict(nested_data)

    # Save flattened data
    with open(input_file, 'w', encoding='utf-8') as f:
        json.dump(flat_data, f, ensure_ascii=False, indent=2)

    return len(flat_data)

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Flatten English translations
    en_file = os.path.join(base_dir, 'en.json')
    en_count = flatten_json_file(en_file)
    print(f"Flattened {en_count} English keys -> en.json")

    # Flatten Russian translations
    ru_file = os.path.join(base_dir, 'ru.json')
    ru_count = flatten_json_file(ru_file)
    print(f"Flattened {ru_count} Russian keys -> ru.json")

    print("\nTranslation files flattened successfully!")
    print("Don't forget to hot restart your app (press 'R' in Flutter console)")

if __name__ == '__main__':
    main()
