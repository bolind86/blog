---
title: nginx不同端口绑定不同域名
date: 2018/11/28 10:27:00
categories: [软件测试, nginx]
tags: [nginx]
---

```nginx
server{
	listen 80;
	server_name yun.xxxxxx.com;
	location~ *  ^  \  / (. * )${
		rewrite ^  \  / (. * )$ http: //yun.xxxxxx.com:8000;
	}
}

server{
	listen 80;
	server_name bt.xxxxxx.com;
	location~ *  ^  \  / (. * )${
		rewrite ^  \  / (. * )$ http: //bt.xxxxxx.com:8888;
	}
}

```

然后在域名解析中配置2条记录：

`yun.xxxxxx.com------ip`

`bt.xxxxxx.com------ip`



