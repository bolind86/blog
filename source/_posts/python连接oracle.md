---
title: python3连接Oracle脚本
date: 2019/03/25 17:23:00
categories: [Python]
tags: [Oracle]
---

```python
# -*- coding:utf-8 -*-

import cx_Oracle as orcl


class DataBase:
    def __init__(self):
        self.db = orcl.connect('ime/ime@192.168.138.211:1521/ora11g')
        self.cur = self.db.cursor()

    def exec(self, sql):
        self.cur.execute(sql)
        data = self.cur.fetchall()
        self.__final__()
        return data

    def __final__(self):
        self.cur.close()
        self.db.close()


if __name__ == '__main__':
    conn = DataBase()
    objs = conn.exec("SELECT * FROM BM_FACTORY_WORK_STATION WHERE CREATE_BY='APITester' and IS_DELETE=0")
    for obj in objs:
        print(obj[0])

```

