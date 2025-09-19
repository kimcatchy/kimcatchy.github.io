---
IDX: "49"
slug: "shortest-path-algorithm"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:14:00+0900"
date: "2025-09-19 23:43:00+0900"
상태: "Ready"
title: "Shortest Path Algorithm"
---
## 최단경로 알고리즘

- 정점 u와 정점 v를 연결하는 경로 중에서 간선들의 가중치 합이 최소가 되는 경로

- 간선의 가중치는 비용, 거리, 시간 등

- 최단 경로를 위한 그래프 표현: 간선이 없으면 가중치를 무한대로 처리

## Dijkstra의 최단 경로 알고리즘

- 시작 정점 v에서 모든 다른 정점까지의 최단 경로 찾음

    - 시작 정점 v: 최단 경로 탐색의 시작 정점

    - 집합 S: 시작 정점 v로부터의 최단경로가 이미 발견된 정점들의 집합

    - dist 배열: S에 있는 정점만을 거쳐서 다른 정점으로 가는 최단 거리를 기록하는 배열

- 매 단계에서 최소 distance인 정점을 S에 추가

    - S에 속하지 않은 정점들 중에서 dist가 가장 작은 정점을 S에 추가

    - 추가 후 남은 정점들의 dist를 갱신, 이 과정 반복

    - dist[w] = min(dist[w], dist[u] + weight[u][w])

### 파이썬 알고리즘

```python
def shortest_path_dijkstra(vtx, adj, start):
    vsize = len(vtx)					# 정점 수
    dist = list(adj[start])		# 배열 생성 및 초기화
    path = [start] * vsize
    found = [False] * vsize
    found[start] = True				# 시작 정점: 이미 찾아짐
    dist[start] = 0						# 시작 정점의 거리 0

    for i in range(vsize):
        print("Step%2d: "%(i+1), dist)						# 단계별 dist[] 출력용
        u = choose_vertex(dist, found)						# 최소 dist 정점 u 탐색
        found[u] = True														# u 찾음

        for w in range(vsize):										# 모든 정점에 대해
            if not found[w]:											# 아직 찾아지지 않았으면
                if dist[u] + adj[u][w] < dist[w]:	# 갱신 조건 검사
                    dist[w] = dist[u] + adj[u][w]	# dist 갱신
                    path[w] = u										# 이전 정점 갱신

    return path								# 찾아진 최단 경로 반환
```

### 테스트 프로그램

```python
print("Shortest Path by Dijkstra Algorithm")
start = 0
path = shortest_path_dijkstra(vertex, weight, start)

# 최종 경로를 출력하기 위한 코드
for end in range(len(vertex)):
    if end != start:
        print("[최단경로: %s -> %s] %s" % (vertex[start], vertex[end], vertex[end]), end='')
    while (path[end] != start):
        print("<- %s" % vertex[path[end]], end='')
        end = path[end]
    print("<- %s" % vertex[path[end]])
```

