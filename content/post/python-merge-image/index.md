---
IDX: "11"
slug: "python-merge-image"
tags:
  - Python
description: "파이썬을 통해 이미지 병합"
categories:
  - Code
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 05:46:00+0900"
상태: "Ready"
title: "Merge Image"
---
```python
from PIL import Image
import os
import re

def merge_images(folder_path):
    # 이미지 파일 불러오기 및 정렬
    image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
    image_data = []
    for file in image_files:
        match = re.search(r'map_cell_x(-?\d+)_y(-?\d+)_bigtile\.png', file)
        if match:
            x, y = int(match.group(1)), int(match.group(2))
            image_data.append((x, y, Image.open(os.path.join(folder_path, file))))
    image_data.sort()  # 좌표 기준 정렬

    # 이미지 크기 계산
    min_x = min(x for x, _, _ in image_data)
    max_x = max(x for x, _, _ in image_data)
    min_y = min(y for _, y, _ in image_data)
    max_y = max(y for _, y, _ in image_data)
    width = (max_x - min_x + 1) * image_data[0][2].width
    height = (max_y - min_y + 1) * image_data[0][2].height

    # 합쳐진 이미지 생성
    merged_image = Image.new('RGB', (width, height))
    for x, y, img in image_data:
        merged_image.paste(img, ((x - min_x) * img.width, (max_y - y) * img.height))

    return merged_image
    
# 현재 스크립트 파일 경로 가져오기
script_dir = os.path.dirname(os.path.abspath(__file__))
folder_path = script_dir  # 폴더 경로를 스크립트 경로로 설정

merged_image = merge_images(folder_path)
merged_image.save('merged_image.png')
```

```bash
python merge_images.py
```

- 좌표 기준은 x가 낮을수록 왼쪽, y가 낮을수록 아래

