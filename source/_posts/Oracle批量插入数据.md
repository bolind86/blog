---
title: Oracle批量插入数据
date: 2018/12/03 11:45
categories: [数据库, Oracle]
tags: [Oracle]
---

安装`mysql`的写法会报错，`Oracle`的写法有点区别

<!-- more -->

```plsql
INSERT ALL
	INTO IME.BM_FACTORY_LINE
	VALUES ('abb8d13bddcc4927adf735b0b51297fe', 'APITest-DISCRETE', TO_TIMESTAMP('2018-11-05 10:24:56.000000', 'YYYY-MM-DD HH24:MI:SS.FF6'), 0)
	INTO IME.BM_FACTORY_LINE
	VALUES ('4ce2a207a13843279479f1507254ff2b', 'APITest-REPEAT', TO_TIMESTAMP('2018-11-05 10:24:40.000000', 'YYYY-MM-DD HH24:MI:SS.FF6'), 0)
SELECT 1
FROM dual;
```

