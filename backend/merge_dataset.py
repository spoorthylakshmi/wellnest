import os
import pandas as pd

# Path to datasets folder
data_dir = os.path.join(os.path.dirname(__file__), '../dataset')
output_file = os.path.join(data_dir, 'merged_dataset.csv')

# List all CSV files
csv_files = [f for f in os.listdir(data_dir) if f.endswith('.csv')]

if not csv_files:
    print("❌ No CSV files found to merge!")
else:
    print(f"🔹 Found {len(csv_files)} CSV files to merge: {csv_files}")

    dfs = []
    for file in csv_files:
        file_path = os.path.join(data_dir, file)
        print(f"➡️ Reading {file_path} ...")
        df = pd.read_csv(file_path)
        dfs.append(df)

    # Merge all
    merged_df = pd.concat(dfs, ignore_index=True)

    # Drop duplicates
    merged_df.drop_duplicates(inplace=True)

    # Save merged file
    merged_df.to_csv(output_file, index=False)
    print(f"✅ Merged dataset saved as: {output_file}")
    print(f"📊 Total rows: {len(merged_df)}")
