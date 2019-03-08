---
title: oracle in超过999报错
date: 2019/03/08
categories: [经典BUG]
tags: [oracle]
---

工单分单，（1000计划数量/单）拆分成1000个（1计划数量/单）

```sql
select * from A where id in(...)
```

如果`in`里面的内容数量大于999，则会报错。

解决办法：

```sql
select * from A where id in(...) or id in (...)
```

