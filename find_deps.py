import json
import os
import re

def get_dependencies_from_package_json(path_to_package_json):
    with open(path_to_package_json, 'r') as f:
        data = json.load(f)
        return set(data.get('dependencies', {}).keys()) | set(data.get('devDependencies', {}).keys())

def extract_dependencies_from_code(path_to_code_dir):
    import_statements = []
    
    for root, dirs, files in os.walk(path_to_code_dir):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                with open(os.path.join(root, file), 'r') as f:
                    content = f.read()
                    import_statements += re.findall(r'(?<=from\s[\'"])[^\'"]+(?=[\'"])', content)
                    import_statements += re.findall(r'(?<=require\([\'"])[^\'"]+(?=[\'"])', content)
    
    # Deduplicate and filter only npm package names (no relative paths or file extensions)
    return set([stmt.split('/')[0] for stmt in import_statements if not stmt.startswith('.') and not stmt.endswith(('.js', '.jsx', '.ts', '.tsx'))])

def find_missing_dependencies(path_to_package_json, path_to_code_dir):
    declared_dependencies = get_dependencies_from_package_json(path_to_package_json)
    used_dependencies = extract_dependencies_from_code(path_to_code_dir)
    
    return used_dependencies - declared_dependencies

if __name__ == "__main__":
    app_dir = input("Enter the app directory path: ").strip()
    missing_deps = find_missing_dependencies(os.path.join(app_dir, 'package.json'), os.path.join(app_dir, "app"))

    if missing_deps:
        print("Missing dependencies:")
        for dep in missing_deps:
            print("-", dep)
    else:
        print("No missing dependencies found!")

