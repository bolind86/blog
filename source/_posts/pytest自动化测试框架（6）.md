---
title: pytest自动化测试框架（6）-pytest+Allure+jenkins集成
date: 2018/10/24 13:46:25
categories: [Python]
tags: [pytest]

---

**摘要：**介绍如何将pytest+allure合并到jenkins实现持续集成

<!-- more -->

- 实验环境：

> jenkins：127.0.0.1
>
> github：192.168.138.177
>
> 脚本运行服务器：192.168.138.131



- 生产环境：

> jenkins：192.168.138.53
>
> github：192.168.138.177
>
> 脚本运行服务器：192.168.138.131

<font color=#FF0000>**先说遇到的深坑：**由于脚本运行服务器和jenkins服务器不是同一台机器，导致生成的报告`xml`在指定位置找不到，如果是同一台机器，需要将报告文件生成到jenkins工程的`workspace`下，否则虽然构建成功，但是看报告时内容为空</font>（mmp，弄了一天），知道了原因就有解决办法：

实验环境：需要在windows机器安装`putty`工具，然后构建增加执行windows批处理命令：`pscp`；

生产环境：使用`scp`拷贝文件。

进入正题：

# jenkins

## 工具下载：

1. 下载[jenkins](https://jenkins.io/)
2. 下载[tomcat](http://tomcat.apache.org/)
3. 安装jenkins插件`allure jenkins plugin`

## 搭建jenkins

将jenkins的`war`包放到tomcat的`webapps`目录下，启动tomcat，日志中会出现初始密码，接着访问：`http://127.0.0.1:8080/jenkins`

> 建议：修改jenkins安装目录
>
> 方法：环境变量中添加JENKINS_HOME，然后将JENKINS_HOME添加到path里，启动tomcat时会将jenkins安装到指定位置

![jenkins_home](http://img.qizhenjun.com/TIM截图20181010112033.png)

![dir](http://img.qizhenjun.com/TIM截图20181010111951.png)

# Configure

## 创建job

输入名字，选择**构建一个自由风格的软件项目**

![job](http://img.qizhenjun.com/TIM截图20181010113324.png)

## Source Code Management

源码管理我使用的是gitlab，所以这里选择git，使用其他管理工具的可以下载相应的jenkins插件，

![scm](http://img.qizhenjun.com/TIM截图20181010113854.png)

## Build

构建此处需要两步，否则会掉进文章开头提到的坑里，

1. 构建项目并执行pytest命令生成xml报告文件；
2. 拷贝文件到jenkins工作目录中

![build](http://img.qizhenjun.com/TIM截图20181010114100.png)

[文件拷贝]: https://qizhenjun.com/bolg/Linux%E4%B8%8EWindows%E6%96%87%E4%BB%B6%E6%8B%B7%E8%B4%9D.html	"文件拷贝参考文章"

> <font color=#FF0000>坑二：pscp从linux拷贝到windows时，windows目录后需要加`/.`，否则有可能出现不能创建文件夹的错误。</font>

## Post-build Actions

添加构建后操作

![add post-build](http://img.qizhenjun.com/TIM截图20181010115220.png)

设置：需要注意，Results为相对jenkins工作目录的路径，所以上一步拷贝的`xml`报告文件需要在jenkins工作目录下面，其他默认即可

![post-build](http://img.qizhenjun.com/TIM截图20181010114810.png)

# 执行Job

执行完后任务会有`Allure Report`的图标

![al](http://img.qizhenjun.com/TIM截图20181010115905.png)

点击即可看到和我们本机一样的报告：

![report](http://img.qizhenjun.com/TIM截图20181010120208.png)

