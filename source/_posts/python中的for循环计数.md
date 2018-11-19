---
title: python中的for循环计数
date: 2018/11/15 13:46:25
categories: python
tags: [python, for计数]
---

python中需要得到当前的循环次数，往往会点定义一个`i = 0`，然后再`for`循环中`i += 1`，下面提供一种方法直接得到当前循环次数。

<!-- more -->

```python
fields = ['a', 'b', 'c']
for i, field in enumerate(fields):
    print('第', i, '次循环', fields[i])
```

