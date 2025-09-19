---
IDX: "43"
slug: "ds-search"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 19:28:00+0900"
상태: "Ready"
title: "탐색"
---
## 탐색

- 탐색: 테이블에서 원하는 탐색키를 가진 레코드를 찾는 작업

- 맵, 딕셔너리: 탐색을 위한 자료구조, 엔트리 또는 키를 가진 레코드의 집합

- 엔트리

    - 키: 영어 단어와 같은 레코드를 구분할 수 있는 탐색키

    - 값: 단어의 의미와 같이 탐색키와 관련된 값

### 맵 ADT

- 데이터: 키를 가진 레코드(엔트리)의 집합

- 연산

    - `search(key)`: 탐색기 key를 가진 레코드를 찾아 반환

    - `insert(entry)`: 주어진 entry를 맵에 삽입

    - `delete(key)`: 탐색기 key를 가진 레코드를 찾아 삭제

- 맵을 구현하는 방법

    - 리스트 이용: 정렬 / 비정렬 (가장 간단한 구현 방법)

    - 이진 탐색 트리 이용: 탐색 성능을 향상 시키고자 하는 경우

    - 해싱 구조 이용: 맵을 구현하기 가장 좋은 방법

## 순차 탐색

- Sequential Search

- 정렬되지 않은 배열에 적용 가능

- 정렬되지 않은 배열을 처음부터 마지막까지 하나씩 검사

- 가장 간단하고 직접적인 탐색 방법

- 평균 비교 횟수: (n+1)/2번 비교 (최악의 경우: n번)

```python
def sequential_search(A, key, low, high):
    for i in range(low, high+1):
        if A[i].key == key:
            return i
    return None
```

- 탐색의 성능(비교횟수): 찾는 항목이 맨 앞에 있는 경우 1, 맨 뒤에 있는 경우 n

- 평균비교횟수: (n+1)/2

- 시간복잡도: O(n)

- 순차 탐색의 특징

    - 정렬되어 있지 않는 자료에 대한 검색

    - 구현이 간단

    - 효율적이지는 않음

## 이진 탐색

- Binary Search

- 자료가 키값을 기준으로 정렬되어 있다면 보다 개선된 탐색이 가능

- 정렬된 배열의 탐색에 적합

    - 배열의 중앙에 있는 값을 조사하여 찾고자 하는 항목이 왼쪽 또는 오른쪽 부분 배열에 있는지를 알아내어 탐색의 범위를 반으로 줄여가며 탐색 진행

    - e.g. 사전에서 단어 찾기

```python
def binary_search(A, key, low, high):
    if (low <= high):
        middle = (low + high) // 2	# 정수 나눗셈 //
        if key == A[middle].key:
            return middle
        elif (key < A[middle].key):
            return binary_search(A, key, low, middle-1)
        else:
            return binary_search(A, key, middle+1, high)
    return None
```

- 탐색의 성능(비교횟수): 각 단계에서 탐색 범위가 반으로 줄어듦

- 탐색 범위가 1이 될 때까지 횟수를 k라 하면 n/2ᵏ=1이 됨

- k = log 2n이므로 이진 탐색의 시간 복잡도 O(log n)

- 반복으로 구현 가능

## 보간 탐색

- Interpolation Search

- 탐색키가 존재할 위치를 예측하여 탐색

- 리스트를 불균등하게 분할하여 탐색

    - 탐색 값과 위치는 비례한다는 가정

    - 탐색위치 = low + (high - low) · (찾고자하는값 - A[low]) / (A[high] - A[low])

    - middle = int(low + (high - low) * (key - A[low].key) / A[high].key - A[low].key))

- 보간 탐색은 이진 탐색과 같은 시간 복잡도 O(log n)을 갖지만 많은 데이터가 비교적 균등하게 분포되어 있는 자료의 경우 훨씬 효율적인 방법

## 해싱

- 키 값에 대한 산술적 연산에 의해 테이블의 주소를 계산

- 해시 테이블: 키 값의 연산에 의해 직접 접근이 가능한 구조, 해시 함수에 의해 계산된 위치에 저장한 테이블

- 해시 함수: 탐색 키를 입력받아 해시 주소 생성

- 충돌: 서로 다른 키가 해시 함수에 의해 같은 주소로 계산되는 상황

- 오버플로우: 충돌이 슬롯 수보다 많이 발생하는 것

### 선형 조사

- 선형 조사에 의한 오버플로우 처리: 충돌이 일어나면 해시 테이블의 다음 위치에 저장

    - 다음 항목을 순서대로 조사: h(k), h(k)+1, h(k)+2, ...

    - 빈 곳이 있으면 저장

    - 해시함수 h(k) = k % M (M: 해시 테이블의 크기)

    - M의 값이 같으면(나머지가 같으면) 충돌이 발생하므로 13과 같은 소수를 사용하는 것이 좋음

#### 삽입 연산

- 키에 대한 해시 값을 계산하고 계산된 해시 값에 해당하는 버킷이 비어있는지 확인

- 비어있다면 해당 위치에 키-값 쌍을 저장, 비어있지 않다면(충돌 발생) 다음 버킷으로 이동

- 빈 버킷을 찾을 때까지 위 과정 반복

- 선형 조사법은 간단하지만 오버플로우가 자주 발생하여 군집화 현상에 따라 탐색 효율이 저하됨

#### 탐색 연산

- 삽입과 비슷한 과정

- 탐색키가 입력되면 해시 주소를 계산하고 해당 주소에 같은 키의 레코드가 탐색이 성공

- 해당 주소에 같은 키의 레코드가 없으면 삽입과 같은 방법으로 계속 다음 버킷 검사

- 이 과정은 해당 레코드를 찾거나, 레코드가 없는 버킷을 만나거나 모든 버킷을 다 검사할 때까지 진행

#### 삭제 연산

- 빈 버킷을 두 가지로 분류해야 함

    - 한 번도 사용하지 않는 것

    - 사용하였다가 삭제되어 현재 비어있는 버킷

- 탐색 과정은 한 번도 사용이 안 된 버킷을 만나야만 중단됨

#### 군집화 완화 방법

- 이차 조사법 (Quadratic Probing)

    - (h(k) + i²) % M, (i = 0, 1, ... , M-1)

    - 조사되는 위치는 h(k), h(k)+1, h(k)+4, ... , h(k)+(M-1)²

- 이중 해싱법 (Double Hashing)

    - 재해싱(rehashing)

    - 충돌이 발생하면, 다른 해시 함수를 이용해 다음 위치 계산

#### 체이닝에 의한 오버플로우 처리

- 하나의 버킷에 여러 개의 레코드를 저장할 수 있도록 하는 방법

- 해시 테이블의 각 버킷에 여러 개의 키-값 쌍을 저장

- 충돌이 발생하면 같은 해시 값을 가진 항목들을 연결 리스트 형태로 연결

### 해시 함수

- 좋은 해시 함수의 조건

    - 충돌이 적어야 함

    - 함수 값이 테이블의 주소 영역 내에서 고르게 분포되어야 함

    - 계산이 빨라야 함

- **제산 함수**: h(k) = k mod M (해시 테이블의 크기 M은 소수 선택)

- **폴딩 함수**: 키를 여러 부분으로 나누고, 이를 조합하는 방식으로 해시 주소 생성

- **중간 제곱 함수**: 탐색키를 제곱한 다음, 중간의 몇 비트를 취해서 해시 주소 생성

- **비트 추출 함수**: 키를 이진수로 간주, 임의의 위치에 k개의 비트를 사용

- **숫자 분석 방법**: 키에서 편중되지 않는 수들을 테이블의 크기에 적합하게 조합

- 탐색키가 문자열인 경우

```python
def hashFn(key):
    sum = 0
    # 문자열의 모든 문자에 대해 그 문자의 아스키 코드 값을 sum에 더함
    for c in key:
        sum = sum + ord(c)
    return sum % M
```

### 탐색 방법들의 성능 비교

- 해싱의 적재 밀도(적재 비율)

    - Loading Density

    - 저장되는 항목의 개수 n과 해시 테이블의 크기 M의 비율

    - α = (저장된 항목의 개수) / (해싱 테이블의 버킷의 개수) = n / M

| **탐색 방법** |  | **탐색** | **삽입** | **삭제** |
| --- | --- | --- | --- | --- |
| **순차 탐색** |  | O(n) | O(1) | O(n) |
| **이진 탐색** |  | O(log₂ n) | O(n) | O(n) |
| **이진탐색트리** | **균형트리** | O(log₂ n) | O(log₂ n) | O(log₂ n) |
| **경사트리** | O(n) | O(n) | O(n) |  |
| **해싱** | **최선의 경우** | O(1) | O(1) | O(1) |
| **최악의 경우** | O(n) | O(n) | O(n) |  |

## 맵 응용

### 맵 ADT 구현

- 리스트를 이용해 순차 탐색 맵을 구현하는 방법

- 리스트를 정렬해서 이진 탐색 맵을 구현하는 방법

- 선형조사법으로 해시 맵을 구현하는 방법

- 체이닝으로 해시 맵을 구현하는 방법

### 엔트리 클래스

```python
class Entry:
    def __init__(self, key, value):
        self.key = key
        self.value = value
    def _str_(self):
        return str("%s:%s"%(self.key, self.value))
```

### 리스트를 이용한 순차 탐색 맵

```python
class SequentialMap:
    def __init__(self):
        self.table = []
    def insert(self, key, value):
        self.table.append(Entry(key, value))
    def search(self, key):
        pos = sequential_search(self.table, key, 0, self.size()-1)
        if pos is not None: return self.table[pos]
        else: return None
    def delete(self, key):
        for i in range(self.size()):
            if self.table[i].key == key:
                self.table.pop(i)
                return
```

### 파이썬의 딕셔너리를 이용한 구현

```python
d = {}
d['data'] = '자료'
d['structure'] = '구조'
d['sequential_search'] = '선형 탐색'
d['game'] = '게임'
d['binary_search'] = '이진 탐색'
print("나의 단어장:")
print(d)

if d.get('game'): print("탐색:game --> ", d['game'])
if d.get('over'): print("탐색:over --> ", d['over'])
if d.get('data'): print("탐색:data --> ", d['data'])

d.pop('game')
print("나의 단어장:")
print(d)
```

```bash
나의 단어장:
{'data': '자료', 'structure': '구조', 'sequential_search': '선형 탐색', 'game': '게임', 'binary_search': '이진 탐색'}
탐색:game -->  게임
탐색:data -->  자료
나의 단어장:
{'data': '자료', 'structure': '구조', 'sequential_search': '선형 탐색', 'binary_search': '이진 탐색'}
```

