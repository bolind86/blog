---
title: Django查询
date: 2019/02/15 09:18:00
categories: [软件测试, python, Django]
tags: [querySet]
---

# 查询

## 获取所有对象

```Django
Entry.objects.all()
```

## 使用过滤器

```django
Entry.objects.filter(**kwargs)	#包含满足查询参数的对象
Entry.objects.exclude(**kwargs)	#包含不满足查询参数的对象
```

## 获取单个对象

```django
Entry.objects.get(**kwargs)
```

## Limit

```
Entry.objects.all()[:5]	#返回前5个对象
Entry.objects.all()[5:10]	#返回第5-第10个对象
Entry.objects.all()[-1]	<font color='red'>#不支持负数索引</font>
Entry.objects.all()[:10:2]	#将在前10个对象中每隔2个对象返回
```

## 精确匹配

### exact

```
Entry.objects.get(title__exact="django查询")
```

### iexact

大小写不敏感

```
Entry.objects.get(title__iexact="Django")
```

### contains

大小写敏感的包含关系

```
Entry.objects.get(title__contains='Django')
```

### startswith和endswith

查找以目标字符串开头和结尾的记录

不区分大小写的方法：`istartswith`和`iendswith`

## 跨关联关系查询

使用双下划线：`__`

```
Entry.objects.filter(blog__title='Django')
```

若要引用一个“反向”的关系，使用该模型的小写的名称即可:

```
Blog.objects.filter(entry__categories__contains='python')
```

## 跨关联关系多值查询

```
Blog.objects.filter(entry__categories__contains='python', entry__pub_date__year=2018)
```

### Filters 引用模型字段

Django 提供了 `F 表达式`来完成将模型的一个字段与模型的另外一个字段进行比较：

```
from django.db.models import F
from datetime import timedelta

Entry.objects.filter(n_comments__gt=F('n_pingbacks'))
Entry.objects.filter(n_comments__gt=F('n_pingbacks') * 2)
Entry.objects.filter(rating__lt=F('n_comments') + F('n_pingbacks'))
Entry.objects.filter(authors__name=F('blog__name'))
Entry.objects.filter(mod_date__gt=F('pub_date') + timedelta(days=3))
```

## 复杂查询

使用`Q`进行查询

`Q` 对象可以使用 `&` 和 `|` 操作符组合,`Q` 对象可以使用 `~` 操作符取反

```
from django.db.models import Q

Q(question__startswith='Who') | Q(question__startswith='What')

Q(question__startswith='Who') | ~Q(pub_date__year=2018)

Poll.objects.get(
    Q(question__startswith='Who'),
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6))
)
```

如果出现 `Q` 对象，它必须位于所有关键字参数的前面:

```
# 错误写法
Poll.objects.get(
    question__startswith='Who',
    Q(pub_date=date(2005, 5, 2)) | Q(pub_date=date(2005, 5, 6))
)
```





参考资料：

https://django-chinese-doc.readthedocs.io/zh_CN/latest/topics/db/queries.html#retrieving-objects

