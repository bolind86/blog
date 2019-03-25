---
title: python修改字典key值的方法
date: 2018/12/04 11:31:00
categories: [软件测试, python]
tags: [key]
---

### 方法一

```python
mydict1 = {'a': 1, 'b': 2}
mydict1['c'] = mydict1.pop('b')
print('方法一：', mydict1)
```

```shell
方法一： {'a': 1, 'c': 2}
```



### 方法二

```python
# 方法二
mydict2 = {'a': 1, 'b': 2}
mydict2.update({'c': mydict2.pop('b')})
print('方法三：', mydict2)
```

```shell
方法二： {'a': 1, 'c': 2}
```



### 方法三

```python
# 方法三
mydict3 = {'a': 1, 'b': 2}
mydict3['c'] = mydict3['b']
del mydict3['b']
print('方法三：', mydict3)
```

```shell
方法三： {'a': 1, 'c': 2}
```

