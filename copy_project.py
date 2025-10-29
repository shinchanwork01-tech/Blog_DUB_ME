import os

# --- Configuration ---
# The directory to scan. '.' means the current directory where the script is located.
ROOT_DIRECTORY = '.'
# The name of the file to save all the text into.
OUTPUT_FILENAME = 'project_snapshot.txt'
# List of directories to completely ignore (very important).
EXCLUDED_DIRS = {'node_modules', '.git', '__pycache__', '.vscode'}
# List of binary file extensions to skip directly for efficiency.
BINARY_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.eot', '.ttf', '.otf'}


def create_project_snapshot():
    """
    Scans a directory recursively, reads the content of all readable files,
    and writes them into a single output file with formatting.
    """
    print(f"Starting to scan '{os.path.abspath(ROOT_DIRECTORY)}'...")
    files_processed = 0
    files_skipped = 0

    try:
        with open(OUTPUT_FILENAME, 'w', encoding='utf-8', errors='ignore') as output_file:
            # os.walk is perfect for recursively going through directories
            for dirpath, dirnames, filenames in os.walk(ROOT_DIRECTORY):
                
                # --- Exclusion Logic ---
                # This prevents os.walk from entering excluded folders.
                dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]
                
                for filename in filenames:
                    # Skip the output file itself
                    if filename == OUTPUT_FILENAME:
                        continue
                    
                    # Skip common binary file types
                    if any(filename.lower().endswith(ext) for ext in BINARY_EXTENSIONS):
                        files_skipped += 1
                        continue

                    file_path = os.path.join(dirpath, filename)
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8', errors='ignore') as current_file:
                            content = current_file.read()
                            
                            # --- Writing to the output file ---
                            output_file.write(f"File: {file_path}\n\n")
                            output_file.write(f"{content}\n\n")
                            output_file.write("____________________________________\n\n")
                            files_processed += 1
                            
                    except Exception as e:
                        # This handles any other unreadable files gracefully
                        files_skipped += 1
                        print(f"  - Could not read file (skipping): {file_path} | Reason: {e}")
                        
        print(f"\n✅ Success! All readable files have been combined into '{OUTPUT_FILENAME}'")
        print(f"   - Files processed: {files_processed}")
        print(f"   - Files skipped: {files_skipped}")

    except IOError as e:
        print(f"❌ Error: Could not write to the output file '{OUTPUT_FILENAME}'. | Reason: {e}")


# --- Run the script ---
if __name__ == '__main__':
    create_project_snapshot()