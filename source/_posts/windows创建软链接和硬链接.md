---
title: windows创建软链接、硬链接
date: 2018/12/13 10:43:00
categories: windows
tags: [mklink]
---

`python`项目上传到局域网`gitlab`进行管理，同时还想将项目保存到`coding.net`进行备份，我想只维护一份文件，另一份文件自动同步，只需`push`就可以，需要注意的是不能直接在根目录创建符号链接，毕竟`.git`文件内容不一样。

<!-- more -->

`mklink`命令用法：

必须以管理员方式运行`CMD`才能够使用，`powershell`没有改命令。

`mklink [/D]|[/J]|[/H] TARGET SOURCE`

`/D`-目录符号链接，使用相对路径

`/J`-目录符号链接，使用绝对路径

`/H`-文件硬链接

`TARGET`-备份位置（该目录不应存在，否则会失败）

`SOURCE`-要备份的源目录

例子：

```powershell
mklink /J D:\TestProgram\GitProjects\APITest\APIManage D:\TestProgram\PycharmProjects\APITest\APIManage

mklink /H D:\TestProgram\GitProjects\APITest\ReadMe.md D:\TestProgram\PycharmProjects\APITest\ReadMe.md
```

