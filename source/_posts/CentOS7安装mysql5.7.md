---
title: CentOS7安装mysql5.7
date: 2018/10/03 13:46:25
categories: [数据库, mysql]
tags: [mysql]

---
**摘要：**如果有其他版本的mysql，建议先做好数据备份，然后卸载完成后进行新版本的安装

<!-- more -->

### 卸载自带MaraiaDB

```shell
rpm -qa|grep mariadb
rpm -e --nodeps mariadb-libs-*
```

### yum安装

```shell
wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql57-community-release-el7-10.noarch.rpm
yum -y install mysql-community-server
```

### 启动服务

```shell
systemctl status mysqld
systemctl start mysqld
systemctl enable mysqld
```

### 生成root初始密码

`grep "password" /var/log/mysqld.log`

### 修改root密码

```mysql
mysql -uroot -p
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```

### 新增远程登录用户

```mysql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

### 授权数据库权限

```mysql
GRANT all privileges ON 数据库.表 TO '用户'@'主机' identified by '用户密码';
# 所有数据库、所有表可以用 * 表示
# 所有主机可以用 % 表示

flush privileges;	# 刷新权限
```



