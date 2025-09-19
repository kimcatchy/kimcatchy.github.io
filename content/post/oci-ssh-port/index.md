---
IDX: "10"
slug: "oci-ssh-port"
tags:
  - OCI
description: "VM 인스턴스 SSH 포트 변경"
categories:
  - linux
update: "2025-09-20 00:15:00+0900"
date: "2025-09-19 05:05:00+0900"
상태: "Ready"
title: "Oracle Cloud SSH 포트 변경"
---
## SSH 포트 추가

- 오라클 클라우드 VCN 설정에서 변경할 포트 추가

- 기존에 SSH 포트로 사용 중이던 22 포트는 바로 삭제해도 되지만, 문제가 생길 수 있으니 변경이 완료된 후에 삭제

```bash
# 포트 설정을 변경하기 전에 아래의 명령어로 현재 사용 중인 포트를 확인
cat /etc/ssh/sshd_config | egrep ^\#?Port

#Port 22
```

```bash
# 확인 후 ssh 설정 파일 열기
sudo nano /etc/ssh/sshd_config
```

```bash
# 기본값이 22 포트이기 때문에 port 설정에 주석 처리가 되어있는데, 아래와 같이 입력
#Port 22
Port 22
Port 21212
```

```bash
# 저장하고 다시 한번 사용 가능한 포트 확인
cat /etc/ssh/sshd_config | egrep ^\#?Port

#Port 22
Port 22
Port 21212
```

```bash
# 제대로 추가됐다면 ssh 재시작 후 확인
sudo systemctl restart ssh
sudo netstat -tnlp | grep sshd

tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      10785/sshd: /usr/sb
tcp        0      0 0.0.0.0:21212           0.0.0.0:*               LISTEN      10785/sshd: /usr/sb
tcp6       0      0 :::22                   :::*                    LISTEN      10785/sshd: /usr/sb
tcp6       0      0 :::21212                :::*                    LISTEN      10785/sshd: /usr/sb
```

## 기존 포트 제거

- 포트를 추가한 방법과 반대로 진행

- 완료 후 오라클 클라우드 VCN 설정에서도 포트 제거

```bash
sudo nano /etc/ssh/sshd_config
```

```bash
#Port 22 (주석 처리가 되지 않은 22 포트 제거)
Port 21212
```

```bash
# 저장 후 다시 포트 확인
cat /etc/ssh/sshd_config | egrep ^\#?Port

#Port 22
Port 21212
```

```bash
# SSH 재시작 후 확인
sudo systemctl restart ssh
sudo netstat -tnlp | grep sshd

tcp        0      0 0.0.0.0:21212           0.0.0.0:*               LISTEN      10785/sshd: /usr/sb
tcp6       0      0 :::21212                :::*                    LISTEN      10785/sshd: /usr/sb
```

