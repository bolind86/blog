---
title: django获取最新一行数据
date: 2019/02/22 14:57:00
categories: [python, django]
tags: [querySet]
---

```python
entry = Model.objects.latest('字段名称')
```

