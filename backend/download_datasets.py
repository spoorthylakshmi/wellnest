# download_datasets.py

import os
import pandas as pd
from datasets import load_dataset

# 📁 Create local save folder
save_dir = r"D:\wellnest\dataset"
os.makedirs(save_dir, exist_ok=True)

# 📦 List of datasets to download (you can add more)
datasets_to_download = {
    "dair-ai/emotion": "emotion_dataset.csv",
    "zeroshot/twitter-emotion": "twitter_emotion.csv",
    "emotion": "emotion_text.csv",
}


# 🔽 Download and save each dataset
for name, filename in datasets_to_download.items():
    print(f"\n🔹 Downloading {name} ...")
    try:
        dataset = load_dataset(name)
        df = pd.concat([pd.DataFrame(dataset[s]) for s in dataset.keys()])
        file_path = os.path.join(save_dir, filename)
        df.to_csv(file_path, index=False)
        print(f"✅ Saved: {file_path}")
    except Exception as e:
        print(f"❌ Failed to download {name}: {e}")

print("\n🎉 All downloads complete!")
