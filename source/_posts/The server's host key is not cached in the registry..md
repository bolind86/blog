---
title: The server's host key is not cached in the registry
date: 2018/10/21 13:46:25
categories: [软件测试, jenkins]
tags: [windows, pscp]
---


问题：Jenkins执行自动构建，在拷贝文件时报错。

<!-- more -->

```shell
The server's host key is not cached in the registry. You
have no guarantee that the server is the computer you
think it is.
The server's ssh-ed25519 key fingerprint is:
ssh-ed25519 256 b5:aa:a6:93:04:66:65:c0:c6:85:7a:57:0d:16:c4:47
If you trust this host, enter "y" to add the key to
PuTTY's cache and carry on connecting.
If you want to carry on connecting just once, without
adding the key to the cache, enter "n".
If you do not trust this host, press Return to abandon the
connection.
Store key in cache? (y/n) Connection abandoned.
```

解决办法：

```shell
echo y | pscp命令
```

