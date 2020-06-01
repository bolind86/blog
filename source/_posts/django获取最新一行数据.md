---
title: django获取最新一行数据
date: 2019/02/22 14:57:00
categories: [Python, Django]
tags: [Django]
---

```python
entry = Model.objects.latest('字段名称')
```

