import os
import pandas as pd

# Ask the user for the folder containing datasets
dataset_folder = input("Enter the full path to your dataset folder: ").strip()

if not os.path.exists(dataset_folder):
    print("Folder does not exist! Check the path and try again.")
    exit()

# Dictionary to store all datasets
all_data = {}

# Loop through files in the folder
for file in os.listdir(dataset_folder):
    file_path = os.path.join(dataset_folder, file)
    
    try:
        if file.endswith('.csv'):
            df = pd.read_csv(file_path)
            all_data[file] = df
            print(f"Loaded CSV: {file}, shape: {df.shape}")
        elif file.endswith('.xlsx') or file.endswith('.xls'):
            df = pd.read_excel(file_path)
            all_data[file] = df
            print(f"Loaded Excel: {file}, shape: {df.shape}")
    except Exception as e:
        print(f"Failed to load {file}: {e}")

print("\nAll datasets loaded successfully!")
