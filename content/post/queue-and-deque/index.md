---
IDX: "31"
slug: "queue-and-deque"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 18:11:00+0900"
상태: "Ready"
title: "Queue & Deque"
---
## 큐

- 삽입과 삭제가 양 끝에서 각각 수행되는 자료구조

- 일상생활의 은행, 병원 등에서 번호표를 이용한 줄서기가 대표적인 큐

- 선입 선출(FIFO) 원칙 하에 item의 삽입과 삭제 수행

- 삭제는 전단, 삽입은 후단

### 큐 ADT

- **데이터**: FIFO의 접근 방법을 유지하는 항목들의 모음

- `Queue()`: 비어 있는 새로운 큐 생성

- `isEmpty()`: 큐가 비어있으면 True, 아니면 False

- `enqueue(x)`: 항목 x를 큐의 맨 뒤에 추가

- `dequeue()`: 큐의 맨 앞에 있는 항목을 꺼내 반환

- `peek()`: 큐의 맨 앞에 있는 항목을 삭제하지 않고 반환

- `size()`: 큐의 모든 항목들의 개수를 반환

- `clear()`: 큐를 공백상태로 만듦

### 큐의 응용

- CPU의 태스크 스케줄링

- 네트워크 프린터

- 실시간 시스템의 인터럽트 처리

- 다양한 이벤트 구동 방식 컴퓨터 시뮬레이션

- 콜 센터의 전화 서비스 처리 등

- 이진트리의 레벨 순회(Level-order Traversal)

- 그래프에서 너비우선탐색(Breath-First Search) 등

### 선형 큐의 문제점

- 비효율적

    - `enqueue(item)`: 삽입 연산 → O(1)

    - `dequeue()`: 삭제 연산 → O(n)

    - 리스트의 맨 앞에서 항목을 삭제하면 그 항목 이후의 모든 항목을 한 칸씩 앞으로 이동해야 하므로 매우 비효율적

- 수행시간

    - 선형 큐 삽입 `enqueue(item)`의 수행시간: O(1) 시간 소요

    - 선형 큐 삭제 `dequeue()`의 수행시간: O(n) 시간 소요 (큐의 모든 항목들을 새 리스트로 복사)

### 원형 큐

- 배열을 원형으로 사용

- 전단과 후단을 위한 2개의 변수

    - front: 첫 번째 요소 하나 앞의 인덱스

    - rear: 마지막 요소의 인덱스

- 회전(시계방향) 방법

    - front ← (front + 1) % MAX\_QSIZE

    - rear ← (rear + 1) % MAX\_QSIZE

- 원형 큐의 삽입과 삭제 연산의 수행시간은 각각 O(1) 시간

    - 삽입 또는 삭제 연산이 rear와 front로 인해 연결리스트의 다른 노드들을 일일이 방문할 필요 없이 각 연산이 수행되기 때문

- 저장된 항목의 개수 = (rear - front + MAX\_QSIZE) % MAX\_QSIZE

- **공백상태**: front == rear

- **포화상태**: front % MAX\_QSIZE == (rear + 1) % MAX\_QSIZE

## 원형 큐의 구현

- 파이썬 리스트 사용

- 리스트의 크기가 미리 결정되어야 함 → 포화상태 있음

```python
MAX_QSIZE = 10
class CircularQueue:
    def __init__(self):
        self.front = 0
        self.rear = 0
        self.items = [None] * MAX_QSIZE
    def isEmpty(self): return self.front == self.rear
    def isFull(self): return self.front == (self.rear + 1) % MAX_QSIZE
    def clear(self): self.front = self.rear
    def enqueue(self, item):
        if not self.isFull():
            self.rear = (self.rear + 1) % MAX_QSIZE
            self.items[self.rear] = item
    def dequeue(self):
        if not self.isEmpty():
            self.front = (self.front + 1) % MAX_QSIZE
            return self.items[self.front]
    def peek(self):
        if not self.isEmpty():
            return self.items[(self.front + 1) % MAX_QSIZE]
    def size(self):
        return (self.rear - self.front + MAX_QSIZE) % MAX_QSIZE
    def display(self):
        out = []
        if self.front < self.rear:
            out = self.items[self.front + 1 : self.rear + 1]
        else:
            out = self.items[self.front + 1 : MAX_QSIZE] + self.items[0 : self.rear + 1]
        print("[f=%s, r=%d] ==> "%(self.front, self.rear), out)

q = CircularQueue()
for i in range(8): q.enqueue(i)
q.display()
for i in range(5): q.dequeue();
q.display()
for i in range(8,14): q.enqueue(i)
q.display()
```

```bash
[f=0, r=8] ==>  [0, 1, 2, 3, 4, 5, 6, 7]
[f=5, r=8] ==>  [5, 6, 7]
[f=5, r=4] ==>  [5, 6, 7, 8, 9, 10, 11, 12, 13]
```

#### 파이썬의 queue 모듈

- 큐(Queue)와 스택(LifoQueue) 클래스 제공

- 사용하기 위해 queue 모듈을 import 해야 함

```python
import queue
```

- 큐 객체 생성

```python
Q = queue.Queue(maxsize=20)
```

- 함수 이름 변경: 삽입은 put(), 삭제는 get()

```python
for v in range(1, 10):
    Q.put(v)
print("큐의 내용:", end = '')
for _ in range(1, 10):
    print(Q.get(), end = ' ')
print()
```

- queue 모듈을 사용한 원형 큐 구현

```python
import queue

class CircularQueue:
    def __init__(self):
        self.q = queue.Queue(maxsize=10)
        self.front = 0
        self.rear = 0

    def isEmpty(self):
        return self.q.empty()

    def isFull(self):
        return self.q.full()

    def clear(self):
        self.q = queue.Queue(maxsize=10)
        self.front = 0
        self.rear = 0

    def enqueue(self, item):
        if not self.isFull():
            self.q.put(item)
            self.rear = (self.rear + 1) % 10

    def dequeue(self):
        if not self.isEmpty():
            item = self.q.get()
            self.front = (self.front + 1) % 10
            return item

    def peek(self):
        if not self.isEmpty():
            return list(self.q.queue)[0]

    def size(self):
        return self.q.qsize()

    def display(self):
        items = list(self.q.queue)
        print(f'[f={self.front}, r={self.rear}] ==> ', items)

q = CircularQueue()
for i in range(8): q.enqueue(i)
q.display()
for i in range(5): q.dequeue()
q.display()
for i in range(8,14): q.enqueue(i)
q.display()
```

## 덱

- Deque, Double-Ended QUEue

- 스택이나 큐보다는 입출력이 자유로운,양쪽 끝에서 삽입과 삭제를 허용하는 자료구조

    - 여전히 중간에서 삽입과 삭제는 불가능

- 스택과 큐 자료구조를 혼합한 자료구조, 덱을 스택이나 큐로 사용할 수 있음

### 덱 ADT

- **데이터**: 전단과 후단을 통한 접근을 허용하는 항목들의 모음

- `Deque()`: 비어 있는 새로운 덱 생성

- `isEmpty()`: 덱이 비어있으면 True, 아니면 False

- `addFront(x)`: 항목 x를 덱의 맨 앞에 추가

- `deleteFront()`: 맨 앞의 항목을 꺼내서 반환

- `getFront()`: 맨 앞의 항목을 꺼내지 않고 반환

- `addRear(x)`: 항목 x를 덱의 맨 뒤에 추가

- `deleteRear()`: 맨 뒤의 항목을 꺼내서 반환

- `getRear()`: 맨 뒤의 항목을 꺼내지 않고 반환

- `isFull()`: 덱이 가득 차 있으면 True, 아니면 False

- `size()`: 덱의 모든 항목들의 개수를 반환

- `clear()`: 덱을 공백상태로 만듦

### 원형 덱의 연산

- 큐와 데이터는 동일

- `addRear()`, `deleteFront()`, `getFront()` 연산은 각각 큐의 `enqueue`, `dequeue`, `peek` 연산과 동일

- 덱의 후단(rear)을 스택의 상단(top)으로 사용하면 `addRear()`, `deleteFront()`, `getFront()` 연산은 각각 스택의 `push`, `pop`, `peek` 연산과 정확히 동일

- 원형 큐에서 추가된 연산: `deleteRear()`, `addFront()`, `getRear()`

    - 반시계방향 회전 필요(front, rear를 감소시킴)

    - front ← (front - 1 + MAX\_QSIZE) % MAX\_QSIZE

    - rear ← (rear - 1 + MAX\_QSIZE) % MAX\_QSIZE

## 덱의 구현

- 원형 큐를 상속하여 원형 덱 클래스를 구현

```python
class CircularDeque(CircularQueue):
```

- 덱의 생성자 (상속되지 않으므로 자식이 부모의 생성자를 호출해야 함)

    - front, rear, items와 같은 멤버 변수는 추가로 선언하지 않음

    - 자식클래스에서 부모를 부르는 함수가 `super()`

```python
def __init__(self):
    Super().__init__()
```

- 재사용 멤버들: `isEmpty`, `isFull`, `size`, `clear`

- 인터페이스 변경 멤버들

```python
def addRear(self, item): self.enqueue(item)
def deleteFront(self): return self.dequeue()	# 반환에 주의
def getFront(self): return self.peek()		# 반환에 주의
```

- 추가로 구현할 메소드

```python
def addFront(self, item):
    if not self.isFull():
        self.items[self.front] = item
        self.front = self.front - 1
        if self.front < 0: self.front = MAX_QSIZE - 1
def deleteRear(self):
    if not self.isEmpty():
        item = self.items[self.rear]
        self.rear = self.rear - 1
        if self.rear < 0: self.rear = MAX_QSIZE - 1
        return item
def getRear(self):
    return self.items[self.rear]
```

## 우선순위 큐

- 우선순위의 개념을 큐에 도입한 자료구조

- 모든 데이터가 우선순위를 가짐

- 입력 순서와 상관없이 우선순위가 높은 데이터가 먼저 출력

- 가장 일반적인 큐로 볼 수 있음

- 어떤 요소가 먼저 삭제되는가에 따라 최대우선순위 큐와 최소우선순위 큐로 나뉨

    - 최대우선순위 큐: 가장 높은 값 먼저 삭제

    - 최소우선순위 큐: 가장 낮은 값 먼저 삭제

- 우선순위를 어떻게 정하느냐에 따라 스택이나 큐로도 사용

- 시뮬레이션, 네트워크 트래픽 제어, OS 작업 스케줄링 등

### 우선순위 큐 ADT

- 데이터: 우선순위를 가진 요소들의 모음

- `Queue()`: 비어 있는 새로운 우선순위 큐 생성

- `isEmpty()`: 우선순위 큐가 비어있으면 True, 아니면 False

- `enqueue(e)`: 우선순위를 가진 항목 e를 추가

- `dequeue()`: 가장 우선순위가 높은 항목을 꺼내서 반환

- `peek()`: 가장 우선순위가 높은 항목을 삭제하지 않고 반환

- `size()`: 우선순위 큐의 모든 항목들의 개수를 반환

- `clear()`: 우선순위 큐를 공백상태로 만듦

## 우선순위 큐의 구현

- 정렬되지 않은 배열을 이용한 구현

```python
class PriorityQueue:
    def __init__(self):
        self.items = []

    def isEmpty(self):
        return len(self.items) == 0
    def size(self): return len(self.items)
    def clear(self): self.items = []

    def enqueue(self, item):
        self.items.append(item)

    def findMaxIndex(self):
        if self.isEmpty(): return None
        else:
            highest = 0
            for i in range(1, self.size()):
                if self.items[i] > self.items[highest]:
                    highest = i
            return highest

    def dequeue(self):
        highest = self.findMaxIndex()
        if highest is not None:
            return self.items.pop(highest)

    def peek(self):
        highest = findMaxIndex()
        if highest is not None:
            return self.items[highest]

q = PriorityQueue()
q.enqueue(34)
q.enqueue(18)
q.enqueue(27)
q.enqueue(45)
q.enqueue(15)
print("PQueue:", q.items)
while not q.isEmpty():
    print("Max Priority = ", q.dequeue())
```

