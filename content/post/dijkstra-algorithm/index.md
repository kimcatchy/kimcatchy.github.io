---
IDX: "39"
slug: "dijkstra-algorithm"
tags:
  - DataStructure
  - Python
description: "자료구조"
categories:
  - Study
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 19:08:00+0900"
상태: "Ready"
title: "Dijkstra's Algorithm"
---
[object Promise]## 알고리즘의 기본 원리

1. 시작 정점을 선택하고 해당 정점까지의 거리를 0으로 초기화

1. 나머지 모든 정점까지의 거리를 무한대로 초기화

1. 방문하지 않은 정점 중 최단 거리인 정점을 선택

1. 선택한 정점의 인접 정점들에 대해, 현재까지의 최단 거리를 갱신

1. 모든 정점을 방문할 때까지 3-4 단계를 반복

## 알고리즘의 동작 과정

1. 초기화: 시작 정점의 거리를 0으로, 나머지 정점들의 거리를 무한대로 설정

1. 정점 선택: 방문하지 않은 정점 중 최단 거리인 정점을 선택

1. 거리 갱신: 선택한 정점의 인접 정점들에 대해, 현재 알려진 거리와 선택한 정점을 경유하는 거리를 비교하여 더 짧은 거리로 갱신

1. 반복: 모든 정점을 방문할 때까지 2-3 단계를 반복

## 구현 방법

- 배열을 이용한 구현

    - 시간 복잡도: O(V²), V는 정점의 수

    - 간단하지만 큰 그래프에서는 비효율적

- 우선순위 큐를 이용한 구현

    - 시간 복잡도: O((V+E)logV), E는 간선의 수

    - 더 효율적이며, 대규모 그래프에 적합

## 코드 예시

- heapq 모듈을 사용하여 우선순위 큐 관리

```python
import heapq

def dijkstra(graph, start):
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    priority_queue = [(0, start)]

    while priority_queue:
        current_distance, current_vertex = heapq.heappop(priority_queue)

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances

# 사용 예시
graph = {
    'A': {'B': 1, 'C': 4},
    'B': {'A': 1, 'C': 2, 'D': 5},
    'C': {'A': 4, 'B': 2, 'D': 1},
    'D': {'B': 5, 'C': 1}
}

result = dijkstra(graph, 'A')
print(result)
```

## 알고리즘의 특징

- 양의 가중치: 다익스트라 알고리즘은 음의 가중치를 가진 간선이 없는 그래프에서만 정확히 작동

- 그리디 접근: 매 단계에서 가장 가까운 정점을 선택하는 그리디(greedy) 방식을 사용

- 최적 부분 구조: 최단 경로의 부분 경로 역시 최단 경로

## 응용 분야

- 네트워크 라우팅: 데이터 패킷의 최적 경로 결정

- GPS 내비게이션: 최단 경로 찾기

- 로봇 경로 계획: 장애물을 피해 목적지까지의 최적 경로 계산

- 소셜 네트워크 분석: 사용자 간 최단 연결 경로 찾기

## 한계점

- 음의 가중치를 가진 간선이 있는 그래프에서는 사용할 수 없음

- 모든 정점 쌍 간의 최단 경로를 구하는 데는 비효율적일 수 있음

