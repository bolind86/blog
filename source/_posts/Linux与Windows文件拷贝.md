---
title: Linux与Windows文件拷贝
categories: linux
tags: [文件拷贝]

---

**摘要：**一般Linux与Windows大都使用FTP或者wget之类的工具来传输文件，Linux与Linux之间互传文件则使用scp工具。

<!-- more -->

## Linux -> Linux

本地上传文件至服务器:

> scp 本地文件名 远程用户名@远程IP地址:路径/新文件名;
>
> ```
> 例:scp AA.zip test@200.100.0.1:www/AA_new.zip;
> ```

从远程服务器下载文件至本地:

> scp 远程用户名@远程IP地址:路径/新文件名 本地文件名;
>
> ```shell
> 例:scp test@200.100.0.1:www/AA.zip AA_new.zip;
> ```

## Windows -> Linux

PSCP和SCP功能相同，是putty的一个附加程序，一般在putty的目录下可以找到。pscp.exe只有一个文件，(将pscp.exe放到C:WINDOWSsystem32下就能直接在命令行下使用pscp命令了）。语法与scp相同，下面是几个有用的options。

> pscp [options] source [source...] [user@]host:target
>
> ```
> -p 拷贝文件的时候保留源文件建立的时间。  
> -q 执行文件拷贝时，不显示任何提示消息。  
> -r 拷贝整个目录  
> -v 拷贝文件时，显示提示信息。
> ```

例如我要将windows上的一个zip包通过SSH服务传输到Linux服务器上可以这样做：

```bash
    D:\PROGRA~1\Putty>pscp -pw mypasswd "E:\TDDOWNLOAD\Discuz!_6.0.0_SC_GBK.zip"
    Holmesian@192.168.128.128:.  
    Discuz!_6.0.0_SC_GBK.zip | 3711 kB | 1855.6 kB/s | ETA: 00:00:00 | 100%  
```

相应的从Linux服务器上下载文件只需要将目标和源反过来即可。

## Linux -> Windows

需要用到[winsshd](https://download.csdn.net/download/fmsbai5/3067355)，该工具能够在windows创建ssh server，这样就可以在linux使用scp命令拷贝文件到windows。

> scp 文件 远程用户名@远程IP地址:路径;
>
> ```shell
> 例:scp a.txt sshuser@182.207.3.210:/C:/key
> ```

## 