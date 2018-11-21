---
title: python3实现SSH上传下载
date: 2018/10/11 13:46:25
categories: [软件测试, python]
tags: [python, ssh, 上传下载]
---

**摘要:**直接上代码

<!-- more -->

```python
# -*- coding:utf-8 -*-
import paramiko

sip = '远程主机IP'
port = 22  # 端口
user = '远程主机user'
password = '远程主机passwd'


def ssh_scp_put(local_file, remote_file):
    """
    上传文件
    :param local_file:
    :param remote_file:
    :return:
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(sip, port, user, password)
    sftp = paramiko.SFTPClient.from_transport(ssh.get_transport())
    sftp = ssh.open_sftp()
    sftp.put(local_file, remote_file)


def ssh_scp_get(remote_file, local_file):
    """
    下载文件
    :param remote_file:
    :param local_file:
    :return:
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(sip, port, user, password)
    sftp = paramiko.SFTPClient.from_transport(ssh.get_transport())
    sftp = ssh.open_sftp()
    sftp.get(remote_file, local_file)


if __name__ == '__main__':
    ssh_scp_put('/opt/settings.py', '/root/seting.py')

```

