---
IDX: "24"
slug: "list-and-set"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 15:58:00+0900"
상태: "Ready"
title: "List & Set"
---
## 리스트

- 항목들이 순서대로 나열되어 있고, 각 항목들은 위치를 가짐

- L = [item₀, item₁, item₂, ... , itemₙ₋₁]

- 항목의 중복 가능

- 임의의 위치에서도 항목의 삽입과 삭제가 가능

- Stack, Queue, Deque를 모두 리스트로 구현 가능 (자료의 접근 위치 차이)

### 리스트 ADT

- `List()`: 비어있는 새로운 리스트를 만듦

- `insert(pos, e)`: pos 위치에 새로운 요소 e 삽입

- `delete(pos)`: pos 위치에 있는 요소를 꺼내고(삭제) 반환

- `isEmpty(pos)`: 리스트가 비어있는지를 검사

- `getEntry(pos)`: pos 위치에 있는 요소 반환

- `size()`: 리스트 안의 요소의 개수 반환

- `clear()`: 리스트 초기화

- `find(item)`: 리스트에서 item이 있는지 찾아 인덱스 반환

- `replace(pos, item)`: pos에 있는 항목을 item으로 바꿈

- `sort()`: 리스트의 항목들을 어떤 기준으로 정렬함

- `merge(1st)`: 다른 리스트 1st를 리스트에 추가

- `display()`: 리스트를 화면에 출력

- `append(e)`: 리스트의 맨 뒤에 새로운 항목을 추가함

### 리스트의 구현

#### 배열 구조

- 구현이 간단

- 항목 접근이 0(1)

- 삽입, 삭제 시 오버헤드

- 항목의 개수 제한

#### 연결된 구조

- 구현이 복잡

- 항목 접근이 0(n)

- 삽입, 삭제가 효율적

- 크기가 제한되지 않음

#### 리스트 용어 정리

- **파이썬 리스트**

    - C언어에서의 배열이 진화된 형태의 스마트한 배열

    - 배열 또는 배열 구조의 의미로 사용

    - 어떤 자료구조를 구현하기 위한 하나의 방법으로 사용

- **연결 리스트**

    - 자료들이 일렬로 나열할 수 있는 연결된 구조

    - 배열 구조(파이썬의 리스트)에 대응되는 의미로 사용

- **자료구조 리스트**

    - 추상적인 의미의 자료구조 리스트를 의미

    - 위에서 정의한 리스트의 ADT를 구현하기 위해 배열 구조나 연결된 구조를 사용할 것

## 파이썬 리스트

- C언어의 배열: 선언과 동시에 크기 확정

- 파이썬 리스트는 클래스로 구현하여 멤버 함수 `append()`, `insert()`를 통해 크기를 늘릴 수 있음

- 동적 배열이기 때문에 추가적인 공간이 필요하면 기존의 메모리를 모두 버리고 더 큰 메모리를 할당해 사용

- **시간 복잡도**

    - `append(e)` 연산: 대부분의 경우 0(1)

    - `insert(pos, e)` 연산: 0(n)

    - `pop(pos)` 연산: 0(n)

## 배열로 구현한 리스트

- 자료구조 리스트의 ADT 구현에 파이썬 리스트 이용

- **함수 버전**: 전역변수와 함수로 구현

```python
items=[]											# 리스트 항목 작성을 위한 파이썬 리스트
def insert(pos, elem):				# pos 위치에 새로운 요소 item 삽입
    items.insert(pos, elem)		# 파이썬 리스트 클래스의 insert 연산
def delete(pos):							# pos 위치에 있는 요소를 꺼내고 반환
    return items.pop(pos)			# 파이썬 리스트 클래스의 pop 연산
def getEntry(pos): return items[pos]		# pos번째 항목 반환
def isEmpty(): return len(items)=0			# 크기가 0이면 True, 아니면 False
def size(): return len(items)						# 리스트의 크기 반환, len() 함수 이용
def clear(): items=[]										# items를 초기화 → 오류
def find(item): return items.index(item)# 탐색 후 인덱스 반환
def replace(pos, elem): items[pos]=elem	# pos번째 항목 변경
def sort(): items.sort()								# 정렬(sort)메소드 이용
def merge(1st): items.extend(1st)				# 병합(확장)
def display(msg='ArrayList'):						# 출력: 디폴트 인수 사용
    print(msg, size(), items)						# 메시지크기+배열내용 출력
```

- **클래스 버전**

```python
class ArrayList:
    def __init__(self):
        self.items = []
    def insert(self, pos, elem):
        self.items.insert(pos, elem)
    def delete(self, pos):
        return self.items.pop(pos)
    def isEmpty(self):
        return self.size() == 0
    def getEntry(self, pos):
        return self.items[pos]
    def size(self):
        return len(self.items)
    def clear(self):
        self.items = []
    def find(self, item):
        return self.items.index(item)
    def replace(self, pos, elem):
        self.items[pos] = elem
    def sort(self):
        self.items.sort()
    def merge(self, lst):
        self.items.extend(1st)
    def display(self, msg='ArrayList'):
        print(msg, '항목수=', self.size(), self.items)
```

<hr style="border: none; height: 1px; background-color: #e0e0e0; margin: 16px 0;" />
## 집합

- 원소의 중복을 허용하지 않음

- 원소들 사이에 순서가 없음 = 선형 자료구조가 아님

- S = {item₀, item₁, item₂, ... , itemₙ₋₁}

### 집합 ADT

- 데이터: 같은 유형의 유일한 요소들의 모임, 원소들의 순서는 없지만 서로 비교할 수 있어야 함

- `set()`: 비어 있는 새로운 집합 생성

- `size()`: 집합의 원소의 개수 반환

- `contains(e)`: 집합이 원소 e를 포함하는지를 검사하고 반환

- `insert(e)`: 새로운 원소 e를 삽입(이미 있다면 삽입하지 않음)

- `delete(e)`: 원소 e를 집합에서 꺼내고(삭제) 반환

- `equals(setB)`: setB와 같은 집합인지 검사

- `union(setB)`: setB와의 합집합을 만들어 반환

- `intersect(setB)`: setB와의 교집합을 만들어 반환

- `difference(setB)`: setB와의 차집합을 만들어 반환

- `display()`: 집합을 화면에 출력

## 리스트로 구현한 집합

```python
class Set:
    def __init__(self):
        self.items = []

    def size(self):
        return len(self.items)
    def display(self, msg):
        print(msg, self.items)

    def contains(self, item):	# 1번
        return item in self.items
    def contains(self, item):	# 2번
        for i in range(len(self.items)):
            if self.items[i] == item:
                return True
        return False

    def insert(self, elem):
        if elem not in self.items:
            self.items.append(elem)
    def delete(self, elem):
        if elem in self.items:
            self.items.remove(elem)

    def union(self, setB):
        setC = Set()
        setC.items = list(self.items)
        for elem in setB.items:
            if elem not in self.items:
                setC.items.append(elem)
        return setC
    def intersect(self, setB):
        setC = Set()
        for elem in setB.items:
            if elem in self.items:
                setC.items.append(elem)
        return setC
    def difference(self, setB):
        setC = Set()
        for elem in self.items:
            if elem not in setB.items:
                setC.items.append(elem)
        return setC
```

