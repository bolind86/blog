---
title: CentOS7安装mysql5.7
categories: linux
tags: [mysql]

---
**摘要：**如果有其他版本的mysql，建议先做好数据备份，然后卸载完成后进行新版本的安装

<!-- more -->

 1. yum源安装包下载
[下载地址](https://dev.mysql.com/downloads/repo/yum/)

 2. 安装源
```linux
yum localinstall yum源安装包
```

 3. 检查mysql源是否安装成功
```linux
yum repolist enabled | grep "mysql.*-community.*"
```

 4. 安装mysql
```linux
yum install mysql-community-server
```

 5. 启动mysql并设置开机启动
```linux
systemctl start mysqld
systemctl enable mysqld
```

 6. 给root用户生产一个默认密码
```linux
grep 'temporary password' /var/log/mysqld.log
```

 7. 登录mysql修改密码
```linux
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```

 8. 添加远程登录用户
```linux
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'User123qwe!@#' WITH GRANT OPTION;
```

 9. 修改mysql配置
```linux
vi /etc/my.cnf
character_set_server=utf8
init_connect='SET NAMES utf8'
```

 10. 重启mysql
```linux
systemctl restart mysqld
```