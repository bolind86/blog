---
title: CentOS7安装Tomcat8
categories: linux
tags: [tomcat]

---
**摘要：**系统自带的openJDK必须删除，否则后续无法启动tomcat

<!-- more -->


## 卸载系统自带OpenJDK ##
```linux
rpm -qa | grep Java #命令来查询出系统自带的jdk
rpm -e --nodeps java-1.8.0-openjdk-1.8.0.102-4.b14.el7.x86_64
rpm -e --nodeps java-1.8.0-openjdk-headless-1.8.0.102-4.b14.el7.x86_64
rpm -e --nodeps java-1.7.0-openjdk-headless-1.7.0.111-2.6.7.8.el7.x86_64
rpm -e --nodeps java-1.7.0-openjdk-1.7.0.111-2.6.7.8.el7.x86_64
```

## 安装JDK ##
```linux
mkdir/usr/java
cd /usr/java
tar -zxvf /tmp/jdk-8u161-linux-x64.tar.gz -C .
vi /etc/profile
```
    在文件末尾添加：
```linux
JAVA_HOME=/usr/java/jdk1.8.0_161
JRE_HOME=/usr/java/jdk1.8.0_161/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
export JAVA_HOME JRE_HOME PATH CLASSPATH
```
    配置生效：
```linux
ource /etc/profile
```

## 安装Tomcat ##
```linux
tar -zxvf tar -zxvf apache-tomcat-8.5.23.tar.gz -C /usr/local/
mv tar -zxvf apache-tomcat-8.5.23 tomcat
```

## 防火墙设置 ##
```linux
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload
```
## 启动Tomcat ##
    执行：
```linux
cd /usr/local/tomcat/bin
./startup.sh
```
    浏览器访问：
    localhost:8080
![iJP0c6.md.png](http://img.qizhenjun.com/NRbqqi.png)

