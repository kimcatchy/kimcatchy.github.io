---
IDX: "48"
slug: "weighted-graph-and-minimum-cost"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:14:00+0900"
date: "2025-09-19 23:37:00+0900"
상태: "Ready"
title: "가중치 그래프의 표현 & 최소비용"
---
## 가중치 그래프

- Weighted Graph

- 간선에 가중치가 할당된 그래프

- G =(V, E, w)

    - w: 비용, 가중치, 길이

- 경로 p의 길이: 경로상의 모든 간선의 합

### 인접 행렬을 이용한 표현

|  | A | B | C | D | E | F | G |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | 0 | 29 |  |  |  | 10 |  |
| B | 29 | 0 | 16 |  |  |  | 15 |
| C |  | 16 | 0 | 12 |  |  |  |
| F |  |  | 12 | 0 | 22 |  | 18 |
| E |  |  |  | 22 | 0 | 27 | 25 |
| F | 10 |  |  |  | 27 | 0 |  |
| G |  | 15 |  | 18 | 25 |  | 0 |

```python
# 2차원 배열 → 파이썬: 리스트의 리스트
vertex = 	['A', 'B', ... , 'G']
weight = 	[[None, 29, ... , None],
					[29, None, ... , 15],
        		...
        	[None, 15, ... , None]]
graph = (vertex, weight)						# 전체 그래프: 튜플 사용
```

```python
# 인접 행렬에서의 가중치의 합 계산
def weightSum(vlist, W):									# 매개변수: 정점 리스트, 인접 행렬
    sum = 0																# 가중치의 합 초기화
    for i in range(len(vlist)):						# 모든 정점에 대해
        for j in range(i+1, len(vlist)):	# 하나의 행에 대해 (삼각영역)
            if W[i][j] != None:						# 간선이 있으면
                sum += W[i][j]						# sum에 추가
    return sum														# 전체 가중치 합을 반환
```

```python
# 인접 행렬에서의 모든 간선 출력
def printAllEdges(vlist, W):
    for i in range(len(vlist)):
        for j in range(len(vlist)):
            if W[i][j] != None and W[i][j] != 0:
                print("(%s, %s, %d)"%(vlist[i], vlist[j], W[i][j]), end='')
    print()
```

### 인접 리스트를 이용한 표현

```python
graph = {	'A': set([('B', 29), ('F', 10)]),
					'B': set([('A', 29), ('C', 16), ('G', 16),
            		...
          'G': set([('B', 15), ('D', 18), ('E', 25)]) }
```

```python
# 인접 리스트에서의 가중치의 합 계산
def weightSum(graph):
    sum = 0
    for v in graph:
        for e in graph[v]:
            sum += e[1]
    return sum//2						# 하나의 간선이 두 번 더해지므로 2로 나눔
```

```python
# 인접 리스트에서의 모든 간선 출력
def printAllEdges(graph):
    for v in graph:
        for e in graph[v]:
            print("(%s, %s, %d)"%(v, e[0], e[1]), end='')
```

## 최소비용 신장트리

- Minimum Spanning Tree, MST

- 간선들의 가중치 합이 최소인 신장트리

    - 반드시 (n-1)개의 간선만 사용

    - 사이클이 포함되면 안됨

- MST의 응용

    - 도로, 통신, 배관 건설: 모두 연결하면서 길이/비용을 최소화

    - 전기 회로: 단자를 모두 연결하면서 전선의 길이를 최소화

### Kruskal의 MST 알고리즘

- 탐욕적인 방법(greedy method)

- ‘그 순간에 최적’이라고 생각되는 것을 선택

- 각 단계에서 최선의 답을 선택 → 최종적인 해답에 도달

- 항상 최적의 해답을 주는지 검증 필요함

#### 알고리즘

1. 그래프의 모든 간선을 가중치에 따라 오름차순으로 정렬

1. 가장 가중치가 작은 간선 e를 뽑음

1. e를 신장트리에 넣었을 때 사이클이 생기면 넣지 않고 2번으로 이동

1. 사이클이 생기지 않으면 최소 신장 트리에 삽입

1. n-1개의 간선이 삽입될 때까지 2번으로 이동

### Prim의 MST 알고리즘

- 하나의 정점에서부터 시작하여 트리를 단계적으로 확장

- 현재의 신장트리 집합에 인접한 정점 중 최저 간선으로 연결된 정점 선택하여 신장트리 집합에 추가

- 이 과정을 n-1개의 간선을 가질 때까지 반복

#### 알고리즘

1. 그래프에서 시작 정점을 선택하여 초기 트리를 만듦

1. 현재 트리의 정점들과 인접한 정점들 중에서 간선의 가중치가 가장 작은 정점 v를 선택

1. 이 정점 c와 이때의 간선을 트리에 추가

1. 모든 정점이 삽입될 때까지 2번으로 이동

### MST 알고리즘 시간 복잡도

- Kruskal 알고리즘: O(e log e)

    - 대부분 간선들을 정렬하는 시간에 좌우됨

    - 간선 e개를 정렬하는 시간

- Prim의 알고리즘: O(n²)

    - 주 반복문이 n번, 내부 반복문이 n번 반복

- 희박한 그래프: O(e log e)인 Kruskal이 유리

- 밀집한 그래프: O(n²)인 Prim이 유리

