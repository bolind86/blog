---
title: python处理\\u编码串
date: 2018/10/11 13:46:25
categories: [软件测试, python]
tags: [python, \\u]
---

摘要：requests发送请求后，经常会碰到中文显示为`\u`的字符串，如何将他们变为汉字呢？

<!-- more -->

```python
import requests

headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

zrl = 'http://h5.fdsfsd.com/dfzj/inv/help.html?h5data=c9b71lNtfPnYk_RnpJs7xR_fdsTne8HkRJBfwLnXRRSU/q'

data = 'invite_code=fdsfdfsdfsffadfsaf'

req1 = requests.post(zrl, headers=headers, data=data).content
print(req1)

req2 = requests.post(zrl, headers=headers, data=data).content.decode('raw_unicode-escape')
print(req2)
```

运行后如下：

```shell
C:\Python\P36_64\python64.exe C:/Users/齐振鋆/PycharmProjects/AioCloud_API_Test_V3.0/TestCases/TmpTest/tmp.py
b'{"code":"6011","msg":"\\u4e0d\\u80fd\\u7ed9\\u81ea\\u5df1\\u52a9\\u529b","data":[]}'
{"code":"6011","msg":"不能给自己助力","data":[]}

进程完成，退出码 0
```

