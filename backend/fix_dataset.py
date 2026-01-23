import pandas as pd
import os

data_dir = os.path.join(os.path.dirname(__file__), '../dataset')
file_path = os.path.join(data_dir, 'sentiment_analysis.csv')

df = pd.read_csv(file_path)

# Rename sentiment -> label
df.rename(columns={'sentiment': 'label'}, inplace=True)

# Keep only required columns
df = df[['text', 'label']]

# Save fixed dataset
fixed_path = os.path.join(data_dir, 'sentiment_analysis_fixed.csv')
df.to_csv(fixed_path, index=False)

print("✅ Fixed dataset saved as:", fixed_path)
