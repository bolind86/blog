---
title: Python unicode显示中文
date: 2019/03/04 17:17:00
categories: [Python]
tags: [unicode]
---

```python
obj = '\u60a8\u5df2\u7b7e\u5230\u8fc7\uff0c\u660e\u5929\u7ee7\u7eed\u7b7e\u5230\u6709\u5927\u793c\uff01'

print(obj.decode("unicode-escape"))

```



