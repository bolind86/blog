---
title: python格式化输出json字符串
data: 2018/11/20 15:12:00
categories: [软件测试, python]
tags: [python, json]
---

```python
import json

dic = {'a': 1, 'b': 2, 'c': 3}
jstr = json.dumps(dic)
print(jstr)
```

打印信息：

```python
{'a': 1, 'c': 3, 'b': 2}
```

加入参数：

```python
import json

dic = {'a': 1, 'b': 2, 'c': 3}
jstr2 = json.dumps(dic, sort_keys=True, indent=4, separators=(',', ':'))
print(jstr2)
```

再次打印：

```python
{
    "a":1,
    "c":3,
    "b":2
}
```

