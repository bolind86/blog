---
title: Python小知识汇总
date: 2019/06/13 14:41:00
categories: [Python]
tags: [Python]
---

# 字符串

## 首字母大写

```python
.capitalize()
```



## 格式化输出json字符串

```python
json.dumps(dic, sort_keys=True, indent=4, separators=(',', ':'))
```



## \\u编码转中文

```python
.decode('raw_unicode-escape')
```





# 列表

## for循环计数

```python
for i, field in enumerate(fields):
```

