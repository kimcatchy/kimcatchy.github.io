---
IDX: "41"
slug: "ds-sort-algorithm"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 19:16:00+0900"
상태: "Ready"
title: "선택/삽입/버블 정렬"
---
## 정렬

- 데이터를 순서대로 재배열하는 것

- 가장 기본적이고 중요한 알고리즘

- 비교할 수 있는 모든 속성들은 정렬의 기준이 될 수 있음

- 오름차순(ascending)과 내림차순(descending)

### 정렬 알고리즘의 종류

- 정렬 장소에 따른 분류

    - 내부 정렬: 모든 데이터가 메인 메모리

    - 외부 정렬: 외부 기억 장치에 대부분의 레코드

- 단순하지만 비효율적인 방법

    - 삽입, 선택, 버블 정렬 등

- 복잡하지만 효율적인 방법

    - 퀵, 합, 병합, 기수정렬, 팀 등

## 선택 정렬

- Selection Sort

- 여러 데이터 중에서 가장 작은 값을 뽑는 작동을 반복하여 값을 정렬

### 최솟값을 찾는 방법

1. 첫 번째 값을 현재 가장 작은 값으로 지정

1. 지정한 값을 다음 차례의 값과 비교하여 더 작은 값을 현재 가장 작은 값으로 변경하거나 유지

1. 마지막 값까지 비교를 마친 후 현재 가장 작은 값으로 지정된 값을 가장 작은 값으로 결정

### 두 변수 값 교환

- 두 변수 값을 교환해야 하는 경우 임시 공간을 사용해야 함

- temp = A, A = B, B = temp

- A, B = B, A

### 선택 정렬 구현

- 오른쪽 리스트에서 가장 작은 숫자를 선택하여 왼쪽 리스트의 맨 뒤로 이동하는 작업을 반복

- 시간 복잡도: (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)

- 알고리즘이 간단, 자료 이동 횟수가 미리 결정

| 정렬 된 리스트 | 정렬 안 된 리스트 | 설명 |
| --- | --- | --- |
| [] | [5, 3, 8, 4, 9, 1, 6, 2, 7] | 초기 상태 |
| [1] | [5, 3, 8, 4, 9, 6, 2, 7] | 1 선택 및 이동 |
| [1, 2] | [5, 3, 8, 4, 9, 6, 7] | 2 선택 및 이동 |
| [1, 2, 3] | [5, 8, 4, 9, 6, 7] | 3 선택 및 이동 |
| ... | ... | 4~8 선택 및 이동 |
| [1, 2, 3, 4, 5, 6, 7, 8, 9] | [] | 9 선택 및 이동 |

```python
def selection_sort(A):
    n = len(A)
    for i in range(n-1):
        least = i;
        for j in range(i+1, n):
            if (A[j] < A[least]):
                least = j
        A[i], A[least] = A[least], A[i]
        printStep(A, i+1)

def printStep(arr, val):
    print(" Step %2d = " % val, end ='')
    print(arr)

data = [5, 3, 8, 4, 9, 1, 6, 2, 7]
print("Original :", data)
selection_sort(data)
print("Selection :", data)
```

```python
Original : [5, 3, 8, 4, 9, 1, 6, 2, 7]
 Step  1 = [1, 3, 8, 4, 9, 5, 6, 2, 7]
 Step  2 = [1, 2, 8, 4, 9, 5, 6, 3, 7]
 Step  3 = [1, 2, 3, 4, 9, 5, 6, 8, 7]
 Step  4 = [1, 2, 3, 4, 9, 5, 6, 8, 7]
 Step  5 = [1, 2, 3, 4, 5, 9, 6, 8, 7]
 Step  6 = [1, 2, 3, 4, 5, 6, 9, 8, 7]
 Step  7 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 Step  8 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Selection : [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 삽입 정렬

- Insertion Sort

- 정렬되어 있는 부분에 새로운 레코드를 올바른 위치에 삽입하는 과정 반복

### 삽입 위치를 찾는 방법

- 빈 배열일 때는 첫 번째 자리에 삽입함

- 현재 정렬된 데이터 그룹의 가장 큰 값과 위치를 정할 새 데이터의 값을 비교

- 새 데이터 값이 크면 맨 뒤에 삽입, 그렇지 않으면 정렬된 데이터 그룹에서 한 칸씩 앞으로 이동하며 새 데이터 값보다 작은 값을 만나면 작은 값 뒤에 삽입

### 삽입 정렬 구현

- 시간 복잡도(최선): O(n)

    - 이미 정렬되어 있는 경우

    - 비교 (n-1)

- 시간 복잡도(최악): O(n²)

    - 역순으로 정렬되어 있는 경우

    - 모든 단계에서 앞의 자료 전부 이동

    - 비교 (n(n-1))/2 = O(n²)

    - 이동 (n(n-1))/2 + 2(n-1) = O(n²)

- 많은 이동이 필요하면 레코드가 큰 경우 불리함

- 대부분 정렬되어 있으면 매우 효율적

```python
def insertion_sort(A):
    n = len(A)
    for i in range(1, n):
        key = A[i]
        j = i-1
        while j>=0 and A[j]>key:
            A[j+1] = A[j]
            j -= 1
        A[j+1] = key
        printStep(A, i)

def printStep(arr, val):
    print(" Step %2d = " % val, end ='')
    print(arr)

data = [5, 3, 8, 4, 9, 1, 6, 2, 7]
print("Original :", data)
insertion_sort(data)
print("Selection :", data)
```

```python
Original : [5, 3, 8, 4, 9, 1, 6, 2, 7] # 초기 상태
 Step  1 = [3, 5, 8, 4, 9, 1, 6, 2, 7] # 3을 삽입
 Step  2 = [3, 5, 8, 4, 9, 1, 6, 2, 7] # 8은 이미 제자리
 Step  3 = [3, 4, 5, 8, 9, 1, 6, 2, 7] # 4를 3과 5 사이에 삽입
 Step  4 = [3, 4, 5, 8, 9, 1, 6, 2, 7] # 9는 이미 제자리
 Step  5 = [1, 3, 4, 5, 8, 9, 6, 2, 7] # 1을 3 앞에 삽입
 Step  6 = [1, 3, 4, 5, 6, 8, 9, 2, 7] # 6을 5와 8 사이에 삽입
 Step  7 = [1, 2, 3, 4, 5, 6, 8, 9, 7] # 2를 1과 3 사이에 삽입
 Step  8 = [1, 2, 3, 4, 5, 6, 7, 8, 9] # 7을 6과 8 사이에 삽입
Selection : [1, 2, 3, 4, 5, 6, 7, 8, 9] # 최종 정렬 결과
```

## 버블 정렬

- Bubble Sort

- 인접한 2개의 레코드를 비교하여 순서대로 서로 교환

- 비교-교환 과정을 리스트의 전체에 수행(스캔)

- 한번의 스캔이 완료되면 리스트의 오른쪽 끝에 가장 큰 레코드

- 끝으로 이동한 레코드를 제외하고 다시 스캔 반복

### 버블 정렬 구현

- 시간 복잡도: O(n²)

- 비교 (n(n-1))/2 = O(n²)

- 이동(평균) = O(n²)

    - 역순으로 정렬된 경우(최악): n²

    - 이미 정렬된 경우(최선): 0

- 레코드의 이동 과다: 이동연산은 비교연산보다 더 많은 시간이 소요

```python
def bubble_sort(A):
    n = len(A)
    for i in range(n-1, 0, -1):
        bChanged = False
        for j in range(i):
            if (A[j]>A[j+1]):
                A[j], A[j+1] = A[j+1], A[j]
                bChanged = True

        if not bChanged: break
        printStep(A, n-i)

def printStep(arr, val):
    print(" Step %2d = " % val, end ='')
    print(arr)

data = [5, 3, 8, 4, 9, 1, 6, 2, 7]
print("Original :", data)
bubble_sort(data)
print("Selection :", data)
```

```python
Original : [5, 3, 8, 4, 9, 1, 6, 2, 7]
 Step  1 = [3, 5, 4, 8, 1, 6, 2, 7, 9]
 Step  2 = [3, 4, 5, 1, 6, 2, 7, 8, 9]
 Step  3 = [3, 4, 1, 5, 2, 6, 7, 8, 9]
 Step  4 = [3, 1, 4, 2, 5, 6, 7, 8, 9]
 Step  5 = [1, 3, 2, 4, 5, 6, 7, 8, 9]
 Step  6 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
Selection : [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## 집합의 연산

- 집합의 원소들을 항상 정렬된 순으로 저장

- 삽입 연산은 더 복잡해짐

- 집합의 비교나 합집합, 차집합, 교집합 → 효율적 구현 가능

### 삽입 연산

- 삽입할 위치를 먼저 찾아야 함

```python
# 정렬된 상태를 유지하면서 elem 삽입
def insert(self, elem):
    if elem in self. items: return      # 이미 있으면 return
    for idx in range(len(self.items)):  # loop n번
        if elem < self.items[idx]:      # 삽입할 위치 idx
            self.items.insert(idx, elem)
            return
    self.items.append(elem)             # 맨 뒤에 삽입
```

### 비교 연산

- 두 집합의 원소의 개수가 같아야 같은 집합이 됨

- 집합이 정렬되어 있으므로 순서대로 같은 원소를 가져야 함

- 시간 복잡도: O(n²) → O(n)으로 개선

```python
def __eq__(self, setB):
    if self.size() != setB.size():
        return False
    for idx in range(len(self.items)):
        if self.items[idx] != setB.items[idx]:
            return False
    return True
```

### 합집합 / 교집합 / 차집합

- 합집합 연산 방법

    - 가장 작은 원소들로부터 비교하여 더 작은 원소를 새로운 집합에 넣고 그 집합의 인덱스를 증가시킴

    - 만약 두 집합의 현재 원소가 같으면 하나만을 넣음 (인덱스는 모두 증가시킴)

    - 한쪽 집합이 모두 처리되면 나머지 집합의 남은 모든 원소를 순서대로 새 집합에 넣음

- 시간 복잡도: O(n²) → O(n)으로 개선

- 교집합과 차집합도 동일한 방법 적용 가능

### 개선된 합집합 알고리즘

```python
def union(self, setB):
    newSet = Set()
    a = 0
    b = 0
    while a < len(self.items) and b < len(SetB.items):
        valueA = self.items[a]
        valueB = SetB.items[b]
        if valueA < valueB:
            newSet.items.append(valueA)
            a+= 1
        elif valueA > valueB:
            newSet.items.append(valueA)
            b += 1
        else:
            newSet.items.append(valueA)
            a += 1
            b += 1
    while a < len(self.items):
        newSet.items.append(self.items[a])
        a += 1
    while b < len(SetB.items):
        newSet.items.append(SetB.items[b])
        b += 1
    return newSet
```

### 집합의 연산 복잡도 비교

| **집합의 연산** | **정렬되지 않은 리스트** | **정렬된 리스트** |
| --- | --- | --- |
| **insert(e)** | O(n) | O(n) |
| **__eq__(SetB)** | O(n²) | O(n) |
| **union(SetB)** | O(n²) | O(n) |
| **intersect(SetB)** | O(n²) | O(n) |
| **difference(SetB)** | O(n²) | O(n) |

