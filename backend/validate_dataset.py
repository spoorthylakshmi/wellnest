import os
import pandas as pd
from collections import Counter

# Path to dataset directory
data_dir = os.path.join(os.path.dirname(__file__), '../dataset')

required_columns = {"text", "label"}

print("\n🔍 Starting dataset validation...\n")

summary = []  # To store summary of each dataset

for file in os.listdir(data_dir):
    if file.endswith(".csv"):
        file_path = os.path.join(data_dir, file)
        print(f"📁 Checking: {file}")

        try:
            df = pd.read_csv(file_path)
        except Exception as e:
            print(f"❌ ERROR loading {file}: {e}")
            continue

        # Check required columns
        if not required_columns.issubset(df.columns):
            print(f"❌ Missing required columns in {file}. Found: {list(df.columns)}")
            continue

        # Basic info
        rows = len(df)
        missing_text = df['text'].isna().sum()
        missing_label = df['label'].isna().sum()
        duplicates = df.duplicated().sum()

        # Label distribution
        label_counts = Counter(df['label'])
        total = sum(label_counts.values())

        print(f"   📌 Rows: {rows}")
        print(f"   ⚠️ Missing text: {missing_text}")
        print(f"   ⚠️ Missing labels: {missing_label}")
        print(f"   🔁 Duplicates: {duplicates}")
        print(f"   🏷️ Label distribution: {dict(label_counts)}")

        # Imbalance check
        if len(label_counts) > 1:
            max_label = max(label_counts.values())
            imbalance_ratio = max_label / total

            if imbalance_ratio > 0.70:
                print("   🚨 WARNING: Data is highly imbalanced!")
            else:
                print("   ✅ Good label balance.")
        else:
            print("   ⚠️ Only one label found — cannot train classification.")

        print("-" * 60)

        # Add to summary list
        summary.append({
            "file": file,
            "rows": rows,
            "missing_text": missing_text,
            "missing_label": missing_label,
            "duplicates": duplicates,
            "labels": dict(label_counts)
        })

# Print summary
print("\n================== SUMMARY REPORT ==================\n")
for item in summary:
    print(f"📄 {item['file']}")
    print(f"   Rows: {item['rows']}")
    print(f"   Missing text: {item['missing_text']}")
    print(f"   Missing label: {item['missing_label']}")
    print(f"   Duplicates: {item['duplicates']}")
    print(f"   Labels: {item['labels']}")
    print("--------------------------------------------------")

print("\n✅ Validation completed.\n")
