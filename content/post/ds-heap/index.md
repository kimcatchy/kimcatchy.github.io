---
IDX: "45"
slug: "ds-heap"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:14:00+0900"
date: "2025-09-19 23:10:00+0900"
상태: "Ready"
title: "Heap"
---
## 힙

- Heap

- '더미'와 모습이 비슷한 완전 이진트리 기반의 자료 구조

- 가장 큰(또는 작은) 값을 빠르게 찾아내도록 만들어진 자료 구조

- 최대 힙: 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진트리

- 최소 힙: 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진트리

### 힙의 연산

#### 삽입 연산 - upheap

- 회사에서 신입 사원이 들어오면 일단 말단 위치에 앉히고 능력을 봐서 위로 승진시킴

- 부모 노드와 비교해서 더 클 경우 교환(sift-up)

- 시간 복잡도: O(log n)

#### 삭제 연산 - downheap

- 회사에서 사장 자리가 비면 일단 사장 자리에 앉히고 순차적으로 강등시킴

- 자식 노드 중 더 큰 자식 노드와 비교해서 더 작을 경우 교환(sift-down)

## 힙의 구현

- 보통 배열을 이용하여 구현

    - 완전 이진트리 → 각 노드에 번호를 붙임 → 배열의 인덱스

- 부모 노드와 자식 노드의 관계

    - 왼쪽 자식의 인덱스 = (부모의 인덱스)\*2

    - 오른쪽 자식의 인덱스 = (부모의 인덱스)\*2 + 1

    - 부모의 인덱스 = (자식의 인덱스)/2

### 최대 힙

#### 클래스

```python
class MaxHeap:
    def __init__(self):
        self.heap = []		# 리스트(배열)을 이용한 힙
        self.heap.append(0)	# 0번 항목은 사용하지 않음

    def size(self): return len(self.heap) - 1
    def isEmpty(self): return self.size() == 0
    def Parent(self, i): return self.heap[i//2]
    def Left(self, i): return self.heap[i*2]
    def Right(self, i): return self.heap[i*2+1]
    def display(self, msg='힙 트리: '): print(msg, self.heap[1:])
```

#### 삽입 연산

```python
def insert(self, n):
    self.heap.append(n)
    i = self.size()
    # 부모보다 큰 동안 계속 업힙
    while (i != 1 and n > self.Parent(i)):
        self.heap[i] = self.Parent(i)
        i = i//2
    self.heap[i] = n
```

#### 삭제 연산

```python
def delete(self):
    parent = 1
    child = 2
    if not self.isEmpty():
        hroot = self.heap[1]
        last = self.heap[self.size()]
        while (child <= self.size()):
            # 만약 오른쪽 노드가 더 크면 child를 1 증가 (기본은 왼쪽 노드)
            if child < self.size() and self.Left(parent) < self.Right(parent):child += 1
            if last > = self.heap[child]: break
            self.heap[parent] = self.heap[child]
            parent = child
            child *= 2
        self.heap[parent] = last
        self.heap.pop(-1)
        return hroot
```

#### 테스트 프로그램

```python
class MaxHeap:
    def __init__(self):
        self.heap = []
        self.heap.append(0)

    def size(self): return len(self.heap) - 1
    def isEmpty(self): return self.size() == 0
    def Parent(self, i): return self.heap[i//2]
    def Left(self, i): return self.heap[i*2]
    def Right(self, i): return self.heap[i*2+1]
    def display(self, msg='힙 트리: '): print(msg, self.heap[1:])

    def insert(self, n):
        self.heap.append(n)
        i = self.size()
        while (i != 1 and n > self.Parent(i)):
            self.heap[i] = self.Parent(i)
            i = i//2
        self.heap[i] = n

    def delete(self):
        parent = 1
        child = 2
        if not self.isEmpty():
            hroot = self.heap[1]
            last = self.heap[self.size()]
            while (child <= self.size()):
                if child < self.size() and self.Left(parent) < self.Right(parent):child += 1
                if last >= self.heap[child]: break
                self.heap[parent] = self.heap[child]
                parent = child
                child *= 2
            self.heap[parent] = last
            self.heap.pop(-1)
            return hroot

heap = MaxHeap()
data = [2, 5, 4, 8, 9, 3, 7, 3]
print("[삽입 연산]: " + str(data))
for elem in data: heap.insert(elem)
heap.display('[삽입 후]: ')
heap.delete()
heap.display('[삭제 후]: ')
heap.delete()
heap.display('[삭제 후]: ')
```

```bash
[삽입 연산]: [2, 5, 4, 8, 9, 3, 7, 3]
[삽입 후]:  [9, 8, 7, 3, 5, 3, 4, 2]
[삭제 후]:  [8, 5, 7, 3, 2, 3, 4]
[삭제 후]:  [7, 5, 4, 3, 2, 3]
```

### 힙의 복잡도 분석

- 삽입 연산에서 최악의 경우

    - 루트 노드에서 올라가야 하므로 트리의 높이 해당하는 비교 연산 및 이동 연산 필요

    - O(log n)

- 삭제 연산에서 최악의 경우

    - 가장 아래 레벨까지 내려가야 하므로 역스 트리의 높이 만큼의 시간이 걸림

    - O(log n)

## 힙의 응용

- 허프만 코드

    - 이진트리는 각 글자의 빈도가 알려져 있는 메시지의 내용을 압축하는데 사용될 수 있음

    - 이런 종류의 이진트리를 허프만 코딩 트리라고 함

- 허프만 코딩 트리 생성 프로그램

```python
def make_tree(freq):
    heap = MinHeap()
    for n in freq: heap.insert(n)
    for i in range (0, n):
        e1 = heap.delete()
        e2 = heap.delete()
        heap.insert(e1 + e2)
        print(" (%d+%d)" % (e1, e2))

label = ['E', 'T', 'N', 'I', 'S']
freq = [15, 12, 8, 6, 4]
make_tree(freq)
```

