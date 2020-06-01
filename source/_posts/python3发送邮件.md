---
title: python3发送邮件
date: 2018/11/12 13:46:25
categories: [Python]
tags: [邮件]

---

**摘要:**在做接口自动化的过程中,使用unittest框架执行完测试后会输出一个报告,实际项目需要一个自动把该报告发送给项目组成员的功能,话不多说,直接上代码:

<!-- more -->

params.py

```python
# 邮件信息
smtp_host = 'smtp.sina.cn'  #smtp服务器域名/地址
sender = '邮箱账号'
password = '邮箱密码',
receivers = ['***@***.com',
             '***@***.com',
             '***@***.com',
             '***@***.com''
             ]  #收件人列表
```

send_mail.py

```python
# -*- coding: UTF-8 -*-

# !/usr/bin/python3

import smtplib
from pathlib import Path

from public import params as p
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header


def send_email(content, rfile):

    # 创建一个带附件的实例
    message = MIMEMultipart()
    message['From'] = Header(p.sender)
    message['To'] = ",".join(p.receivers)
    subject = "(" + p.BaseUrl + ")" + content
    message['Subject'] = Header(subject)

    # 邮件正文内容
    message.attach(MIMEText('详细内容见附件。', 'plain', 'utf-8'))

    # 构造附件1，传送当前目录下的 test.txt 文件
    att1 = MIMEText(Path.open(rfile, 'rb').read(), 'base64', 'utf-8')
    att1["Content-Type"] = 'application/octet-stream'
    # 这里的filename可以任意写，写什么名字，邮件中显示什么名字
    att1["Content-Disposition"] = 'attachment; filename=report.html'
    message.attach(att1)

    # 构造附件2，传送当前目录下的 runoob.txt 文件
    # att2 = MIMEText(open('runoob.txt', 'rb').read(), 'base64', 'utf-8')
    # att2["Content-Type"] = 'application/octet-stream'
    # att2["Content-Disposition"] = 'attachment; filename="runoob.txt"'
    # message.attach(att2)

    try:
        smtpObj = smtplib.SMTP()
        smtpObj.connect(p.smtp_host, 25)  # 25 为 SMTP 端口号
        # smtpObj.ehlo()
        smtpObj.starttls()
        smtpObj.login(p.sender, p.password)
        smtpObj.sendmail(p.sender, p.receivers, message.as_string())
        print("邮件发送成功")
        smtpObj.quit()
    except smtplib.SMTPException as e:
        print(e)


if __name__ == '__main__':
    rfile = Path('C:/Users/齐振鋆\PycharmProjects/NeuSoftEEP_API_Test/report/IME接口测试报告_2018-08-06 15-35-39.html')
    content = 'IME接口测试报告_2018-08-06 15-35-39'
    send_email(content, rfile)

```

