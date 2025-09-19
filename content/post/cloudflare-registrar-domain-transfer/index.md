---
IDX: "50"
slug: "cloudflare-registrar-domain-transfer"
tags:
  - Nginx
description: "기존 PDM에서 사용하던 서버를 DRZG로"
categories:
  - Web
update: "2025-09-20 00:14:00+0900"
date: "2025-09-19 23:51:00+0900"
상태: "Ready"
title: "Cloudflare Registrar 도메인 이전"
---
## Cloudflare DNS 설정

- Cloudflare 대시보드의 DNS 탭에서 주소에 대해 A 레코드를 추가하고 서버 IP를 가리키도록 설정

- 네임서버가 Cloudflare로 이미 설정돼 있지 않다면, Cloudflare Registrar에서 Cloudflare 네임서버로 변경 후 5~10분 정도 기다리면 됨

## Origin Pulls 활성화

- SSL/TLS > 개요(Overview) 탭에서 암호화 모드를 Full (strict) 로 변경

    - Cloudflare가 Origin CA로 발급된 인증서를 신뢰하도록 강제

- SSL/TLS > Origin Server 탭에서 PEM/KEY 파일 발급 후 `/etc/nginx/key/` 디렉터리에 저장

- Authenticated Origin Pulls 활성화

## Nginx 설정

- `/etc/nginx/sites-available/` 디렉터리에서 기존에 사용하던 설정 파일 복사

- 이전할 주소로 파일명 변경 후 파일 내용의 기존 주소를 새 주소로 변경

- `/etc/nginx/sites-enabled/` 디렉터리에 심볼릭 링크로 연결

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
```

- 설정 파일 문법 검사 후 문제 없으면 nginx 리로드

```bash
sudo nginx -t
sudo systemctl reload nginx
```

