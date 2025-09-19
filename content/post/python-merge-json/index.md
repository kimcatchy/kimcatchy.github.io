---
IDX: "12"
slug: "python-merge-json"
tags:
  - Python
description: "하위 폴더의 JSON 파일 병합"
categories:
  - Code
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 05:49:00+0900"
상태: "Ready"
title: "Merge JSON in subDir"
---
```python
import json
import os

def merge_json_files(folder_path):
    merged_data = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            file_path = os.path.join(folder_path, filename)
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                merged_data.extend(data)
    return merged_data

def main():
    base_folder = os.path.dirname(os.path.abspath(__file__))
    merged_folder = os.path.join(base_folder, "0merged")

    if not os.path.exists(merged_folder):
        os.makedirs(merged_folder)

    for item in os.listdir(base_folder):
        item_path = os.path.join(base_folder, item)
        if os.path.isdir(item_path) and item != "0merged":
            merged_data = merge_json_files(item_path)

            output_file = os.path.join(merged_folder, f"{item}.json")
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(merged_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
```

- 0merged 폴더 생성 후 폴더 안에 병합된 json 작성

- 이후 다시 사용할 수도 있으니 0merged 폴더는 병합 과정에서 제외

