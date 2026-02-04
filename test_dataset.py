import os
import pandas as pd

# Path to your datasets folder
dataset_folder = r'D:\wellnest\datasets'  # change this to your folder path

# Dictionary to store all datasets
all_data = {}

# Loop through all files in the folder
for file in os.listdir(dataset_folder):
    file_path = os.path.join(dataset_folder, file)
    
    # Check file extension
    if file.endswith('.csv'):
        df = pd.read_csv(file_path)
        all_data[file] = df
        print(f"Loaded CSV: {file}, shape: {df.shape}")
        
    elif file.endswith('.xlsx') or file.endswith('.xls'):
        df = pd.read_excel(file_path)
        all_data[file] = df
        print(f"Loaded Excel: {file}, shape: {df.shape}")

print("\nAll datasets loaded successfully!")
