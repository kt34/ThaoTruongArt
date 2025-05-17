import os

# Change this to your directory path
directory = "/Users/kevinton/Desktop/Projects/ThaoTruongArt/frontend/public/images/fluid-art"

for filename in os.listdir(directory):
    old_path = os.path.join(directory, filename)
    # Only rename if it's a file
    if os.path.isfile(old_path):
        new_filename = filename.replace(' ', '-').lower()
        new_path = os.path.join(directory, new_filename)
        os.rename(old_path, new_path)
        print(f"Renamed: {filename} -> {new_filename}")