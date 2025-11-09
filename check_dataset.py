import os
import pandas as pd

# 📂 Path where your datasets are saved
data_dir = r"D:\wellnest\dataset"

# 📜 List all CSV files in that folder
csv_files = [f for f in os.listdir(data_dir) if f.endswith(".csv")]

# 🔍 Check each dataset
for file in csv_files:
    file_path = os.path.join(data_dir, file)
    print(f"\n📄 File: {file}")
    
    # Load first few rows
    try:
        df = pd.read_csv(file_path)
        print(f"✅ Loaded successfully! Shape: {df.shape}")
        print("📋 Columns:", list(df.columns))
        print("\n🧩 First 3 rows:")
        print(df.head(3))
    except Exception as e:
        print(f"❌ Could not load {file}: {e}")

print("\n🎉 All dataset summaries printed successfully!")
