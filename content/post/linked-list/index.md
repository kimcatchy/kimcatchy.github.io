---
IDX: "38"
slug: "linked-list"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 19:02:00+0900"
상태: "Ready"
title: "Linked List"
---
## 연결된 구조

- 흩어진 데이터를 링크로 연결해서 관리

| **배열 구조의 리스트** | **연결된 구조의 리스트** |
| --- | --- |
| 모든 노드들을 연속된 메모리 공간에 저장 | 노드들이 물리적으로 떨어진 곳에 위치 |
| 확보된 공간을 넘어서 새로운 노드를 저장할 수 없음 | 각 노드의 번지도 순차적이지 않음 |
|  | 화살표로 표시된 연결을 따라가면 선형 리스트 순서와 같음 |

- 용량이 고정되지 않음

| **배열 구조의 리스트** | **연결된 구조의 리스트** |
| --- | --- |
| 할당된 메모리 공간을 사용하지 않으면 메모리 낭비 | 필요한 만큼 메모리 할당, 크기의 제한도 없음 - 효율성 |
| 할당된 메모리 공간을 넘어서는 새로운 항목 삽입 불가 |  |

- 중간에 자료를 삽입하거나 삭제하는 것이 용이

| **배열 구조의 리스트** | **연결된 구조의 리스트** |
| --- | --- |
| 항목 삽입/삭제 시 뒤의 모든 항목들을 이동 | 항목 삽입/삭제 시 연결(Link)만 수정 |

## 연결 리스트의 구조

### 노드(Node)

- 데이터 필드: 저장하고 싶은 데이터 (정수, 실수, 문자열, 클래스, 다른 리스트 등)

- 하나 이상의 링크 필드: 다른 노드의 주소를 저장하는 변수

### 헤드 포인터(Head Pointer)

- 연결 리스트는 첫 번째 노드만 알면 링크로 연결된 모든 노드에 순차적 접근 가능

    - 시작 노드의 주소를 반드시 저장해야 함

- 첫 번째 노드의 주소를 저장하는 변수를 헤드 포인터라고 함

- 마지막 노드는 더 이상 연결할 노드가 없음

    - 링크의 값을 None으로 설정하여 이 노드가 마지막임을 표시

## 연결 리스트의 종류

### 단순 연결 리스트

- Singly Linked List

- 하나의 방향으로 연결되어 있는 구조이므로 링크는 하나

- 링크에는 다음 노드의 주소를 기억

- 마지막 노드는 아무것도 연결되어 있지 않다는 의미로 None 값을 가짐

- 스택과 리스트를 단순 연결 리스트로 구현 가능

### 원형 연결 리스트

- Circular Linked List

- 단순 연결 리스트와 동일한 노드 구조를 사용하지만 맨 마지막 노드의 링크 값이 None이 아니라 다시 첫 번째 노드를 가리킴

- 노드를 순서대로 방문할 때 종료 조건에 유의해야 함

### 이중 연결 리스트

- Doubly Linked List

- 하나의 노드가 이전 노드와 다음 노드를 모두 알 수 있도록 설계

- 두 개의 링크를 갖는데, 하나는 선행 노드를, 다른 하나는 후속 노드를 가리킴

## 단순 연결 리스트로 구현한 리스트

### 스택: 노드 클래스

```python
class Node:
    def __init__(self, elem, link=None):
        self.data = elem
        self.link = link
```

### 스택: 연결된 스택 클래스

```python
class LinkedStack:
    def __init__(self):
        self.top = None

    def isEmpty(self): return self.top == None
    def clear(self): self.top = None
```

### 스택: 삽입

1. 입력 데이터 E를 이용해 새로운 노드 n을 생성 (n = Node(E))

1. n의 링크가 시작 노드를 가리키도록 함 (n.link = top)

1. top이 n을 가리키도록 함 (top = n)

```python
def push(self, item):
    n = Node(item, self.top)
    self.top = n
```

### 스택: 삭제

1. 변수 n이 시작 노드를 가리키도록 함 (n = top)

1. top이 다음 노드를 가리키도록 함 (top = n.link)

1. n이 가리키는 노드의 데이터를 반환 (return n.data)

```python
def pop(self):
    if not self.isEmpty():
        n = self.top
        self.top = self.n.link
        return n.data
```

### 스택: 전체 노드의 방문

```python
def size(self):
    node = self.top
    count = 0
    while not node == None:
        node = node.link
        count +=1
    return count
```

### 연결 리스트

- 노드 클래스: 연결된 스택에서와 동일

- 스택에서의 self.top을 self.head로 수정

- 연결 리스트 클래스

```python
class LinkedList:
    def __init__(self):
        self.head = None

    def isEmpty(self): return self.head == None
    def clear(self): self.head = None
    def size(self):
        node = self.head
        count = 0
        while not node == None:
            node = node.link
            count +=1
        return count
    def display(self, msg): ...
```

- pos번째 노드 반환: getNode(pos)

```python
def getNode(self, pos):
    if pos < 0: return None
    node = self.head
    while pos > 0 and node != None:
        node = node.link
        pos -= 1
    return node
```

- getEntry(pos), replace(pos, elem), find(val)

```python
def getEntry(self, pos):
    node = self. getNode(pos)
    if node == None: return None
    else: return node.data

def replace(self, pos, elem):
    node = self.getNode(pos)
    if node is not None: node.data = elem
```

- 삽입 연산: insert(pos, elem)

    - 삽입할 노드가 삽입할 위치 다음의 노드를 향하게 함 (node.link = before.link)

    - 삽입할 위치 전의 노드가 삽입할 노드를 향하게 함 (before.link = node)

```python
def insert(self, pos, elem):
    before = self.getNode(pos-1)
    if before == None:
        self.head = Node(elem, self.head)
    else:
        node = Node(elem, before.link)
        before.link = node
```

- 삭제: before의 link가 삭제할 노드의 다음 노드를 가리키도록 함 (before.link = before.link.link)

```plain text
def delete(self, pos):
    before = self.getNode(pos-1)
    if before == None:
        self.head = self.head.link
    elif before.link != None:
        before.link = before.link.link
```

#### 테스트 코드

```python
class Node:
    def __init__(self, elem, link=None):
        self.data = elem
        self.link = link

class LinkedList:
    def __init__(self): self.head = None
    def isEmpty(self): return self.head == None
    def clear(self): self.head = None

    def size(self):
        node = self.head
        count = 0
        while node is not None:
            node = node.link
            count += 1
        return count

    def display(self, msg):
        print(msg)
        node = self.head
        while node is not None:
            print(node.data, end=' ')
            node = node.link
        print()  # 줄바꿈

    def getNode(self, pos):
        if pos < 0: return None
        node = self.head
        while pos > 0 and node is not None:
            node = node.link
            pos -= 1
        return node

    def getEntry(self, pos):
        node = self.getNode(pos)
        if node is None: return None
        return node.data

    def insert(self, pos, elem):
        if pos < 0: return  # 잘못된 위치 처리
        before = self.getNode(pos - 1)
        if before is None:  # head에 삽입
            self.head = Node(elem, self.head)
        else:  # Insert after the node
            node = Node(elem, before.link)
            before.link = node

    def delete(self, pos):
        if pos < 0: return  # 잘못된 위치 처리
        before = self.getNode(pos - 1)
        if before is None: self.head = self.head.link
        elif before.link is not None: before.link = before.link.link

    def replace(self, pos, elem):
        node = self.getNode(pos)
        if node is not None: node.data = elem

s = LinkedList()
s.display('단순연결리스트로 구현한 리스트(초기상태):')
s.insert(0, 10); s.insert(0, 20); s.insert(1, 30); s.insert(s.size(), 40); s.insert(2, 50)
s.display('단순연결리스트로 구현한 리스트(삽입*5):')
s.replace(2, 90)
s.display('단순연결리스트로 구현한 리스트(교체*1):')
s.delete(2); s.delete(s.size()-1); s.delete(0)
s.display('단순연결리스트로 구현한 리스트(삭제*3):')
s.clear()
s.display('단순연결리스트로 구현한 리스트(초기화):')
```

## 원형 연결 리스트로 구현한 큐

```python
class Node:
    def __init__(self, elem, link=None):
        self.data = elem
        self.link = link

class CircularLinkedQueue:
    def __init__(self):     # 생성자 함수
        self.tail = None    # tail: 유일한 데이터

    def isEmpty(self): return self.tail == None # 공백 상태 검사
    def clear(self): self.tail = None           # 큐 초기화
    def peek(self):                         # peek 연산
        if not self.isEmpty():              # 공백이 아니면
            return self.tail.link.data      # front의 data 반환

    # 삽입 연산: 큐가 공백상태인 경우 삽입
    def enqueue(self, item):
        node = Node(item, None)
        if self.isEmpty():
            node.link = node
            self.tail = node
        # 공백상태가 아닌 경우
        else:
            node.link = self.tail.link
            self.tail.link = node
            self.tail = node

    # 삭제 연산: 큐가 하나의 항목을 갖는 경우
    def dequeue(self):
        if not self.isEmpty():
            data = self.tail.link.data
            if self.tail.link == self.tail:
                self.tail = None
            # 큐가 여러 개의 항목을 갖는 경우
            else:
                self.tail.link = self.tail.link.link
            return data

    #전체 노드의 방문
    def size(self):
        if self.isEmpty(): return 0     # 공백이면 0 반환
        else:
            count = 1                   # 카운트 최소 1
            node = self.tail.link       # node는 front부터 출발
            while not node == self.tail:
                node = node.link        # node가 rear가 아닌 동안
                count += 1              # 이동 후 count 증가
            return count                # 최종 count 반환

    def display(self, msg='CircularLinkedQueue'):
        print(msg, end='')
        print()
        if not self.isEmpty():
            node = self.tail.link
            while not node == self.tail:
                print(node.data, end=' ')
                node = node.link
            print(node.data, end=' ')
        print()

# 테스트 프로그램
q = CircularLinkedQueue()
for i in range(8): q.enqueue(i)
q.display()
for i in range(5): q.dequeue()
q.display()
for i in range(8,14): q.enqueue(i)
q.display()
```

## 이중 연결 리스트로 구현한 덱

- 단순 연결 리스트로 구현 시 문제점

    - 전단과 후단을 각각 front와 rear가 가리키고 양쪽에서 모두 삽입과 삭제가 가능한 구조

    - deleteRear 연산에서 후단을 삭제하고 나면 rear가 한칸 앞으로 움직여야 함

    - 단순 연결 리스트의 노드에는 선행 노드의 정보가 없으므로 front부터 시작해서 선행 노드를 탐색해야 함

- 이중 연결 리스트로 구현 시 모든 노드가 선행과 후속 노드를 알고 있으므로 deleteRear도 O(1)

- 덱이나 리스트와 같은 선형 자료 구조의 연산들을 가장 효율적으로 구현할 수 있음

```python
# 이중 연결 리스트의 노드는 각각 prev, next
class DNode:
    def __init__(self, elem, prev=None, next=None):
        self.data = elem
        self.prev = prev
        self.next = next

class DoublyLinkedDeque:
    def __init__(self):
        self.front = None
        self.rear = None

    def isEmpty(self): return self.front == None    # 공백 상태 검사
    def clear(self): self.front = self.front = None # 초기화

    # self.top을 self.front로 변경경
    def size(self):
        node = self.front
        count = 0
        while not node == None:
            node = node.next
            count += 1
        return count
    def display(self, msg='LinkedDeque'):
        print(msg, end='')
        print()
        node = self.front
        while not node == None:
            print(node.data, end=' ')
            node = node.next
        print()

    # 전단 삽입
    # 1. 노드 생성 및 prev, next 초기화
    # 2. front가 선행노드 n을 가리킴
    # 3. 그 뒤 front가 n을 가리킴
    def addFront(self, item):
        node = DNode(item, None, self.front)
        if (self.isEmpty()):
            self.front = self.rear = node
        else:
            self.front.prev = node
            self.front = node

    # 후단 삽입
    # 1. n의 next가 None, prev는 현재의 후단인 rear
    # 2. 다음으로 rear가 새로운 노드를 가리킴
    # 3. 전후단 삽입의 시간 복잡도는 모두 O(1)
    def addRear(self, item):
        node = DNode(item, self.rear, None)
        if (self.isEmpty()):
            self.front = self.rear = node
        else:
            self.rear.next = node
            self.rear = node

    # 전후단 삭제
    # 1. 삭제할 노드(front)의 데이터 복사
    # 2. front를 다음으로 옮김
    # 3. front의 이전 노드는 None
    def deleteFront(self):
        if not self.isEmpty():
            data = self.front.data
            self.front = self.front.next
            # 노드가 하나뿐이면 rear도 None으로 설정해야 됨
            if self.front == None: self.rear = None
            else: self.front.prev = None
            return data
    # 후단 삭제 deleteRear도 비슷하게 처리
    def deleteRear(self):
        if not self.isEmpty():
            data = self.rear.data
            self.rear = self.rear.prev
            if self.rear == None: self.front = None
            else: self.rear.next = None
            return data

# 테스트 프로그램
dq = DoublyLinkedDeque()
for i in range(9):
    if i%2 == 0: dq.addRear(i)
    else: dq.addFront(i)
dq.display()
for i in range(2): dq.deleteFront()
dq.display()
for i in range(3): dq.deleteRear()
dq.display()
for i in range(9,14): dq.addFront(i)
dq.display()
```

