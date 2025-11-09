import os
import pandas as pd

data_dir = os.path.join(os.path.dirname(__file__), '../dataset')
merged_file = os.path.join(data_dir, 'merged_dataset.csv')

if os.path.exists(merged_file):
    df = pd.read_csv(merged_file)
    print("✅ Merged dataset loaded successfully!\n")
    print("📄 Columns:", list(df.columns))
    print("\n🔹 First 5 rows:")
    print(df.head())
    print(f"\n📊 Total rows: {len(df)}")
else:
    print("❌ merged_dataset.csv not found! Check your datasets folder.")
