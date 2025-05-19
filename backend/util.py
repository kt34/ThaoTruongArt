import os

# Set the directory containing your images
directory = '/Users/kevinton/Desktop/Projects/ThaoTruongArt/frontend/public/images/women-figures'  # or replace with the path to your folder

for filename in os.listdir(directory):
    if filename.startswith('#'):
        new_name = filename.replace('#', '')
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_name)
        os.rename(old_path, new_path)
        print(f'Renamed: {filename} -> {new_name}')
