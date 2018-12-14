---
title: python使用itchat监控微信消息
date: 2018/11/23 15:19:00
categories: [软件测试, python]
tags: [python, 微信, itchat]
---


使用itchat监控微信消息，备份消息数据到数据库，如有撤回消息，则降撤回的消息发送到微信文件助手。
<!-- more -->

```python
# coding:utf-8
import itchat
from itchat.content import *
import time
import re
import os
import pymysql

msg_information = {}
face_bug = None  # 针对表情包的内容


@itchat.msg_register([TEXT, PICTURE, FRIENDS, CARD, MAP, SHARING, RECORDING, ATTACHMENT, VIDEO],
                     isFriendChat=True, isGroupChat=True, isMpChat=True)
def handle_receive_msg(msg):
    # print('msg：', msg)

    global face_bug
    msg_time_rec = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())   # 接受消息的时间

    # 查找消息来源
    user = msg.get('User')
    msg_from = user.get('NickName')
    msg_by = msg.get('ActualNickName')

    msg_time = msg['CreateTime']    # 信息发送的时间
    msg_id = msg['MsgId']    # 每条信息的id
    msg_content = None      # 储存信息的内容
    msg_share_url = None    # 储存分享的链接，比如分享的文章和音乐
    if msg['Type'] == 'Text' or msg['Type'] == 'Friends':     # 如果发送的消息是文本或者好友推荐
        msg_content = msg['Text']

    # 如果发送的消息是附件、视屏、图片、语音
    elif msg['Type'] == "Attachment" or msg['Type'] == "Video" \
            or msg['Type'] == 'Picture' \
            or msg['Type'] == 'Recording':
        msg_content = msg['FileName']    # 内容就是他们的文件名
        msg['Text'](str(msg_content))    # 下载文件

    elif msg['Type'] == 'Card':    # 如果消息是推荐的名片
        msg_content = msg['RecommendInfo']['NickName'] + '的名片'    # 内容就是推荐人的昵称和性别
        if msg['RecommendInfo']['Sex'] == 1:
            msg_content += '性别为男'
        else:
            msg_content += '性别为女'

    elif msg['Type'] == 'Map':    # 如果消息为分享的位置信息
        x, y, location = re.search(
            "<location x=\"(.*?)\" y=\"(.*?)\".*label=\"(.*?)\".*", msg['OriContent']).group(1, 2, 3)
        if location is None:
            msg_content = r"纬度->" + x.__str__() + " 经度->" + y.__str__()     # 内容为详细的地址
        else:
            msg_content = r"" + location

    elif msg['Type'] == 'Sharing':     # 如果消息为分享的音乐或者文章，详细的内容为文章的标题或者是分享的名字
        msg_content = msg['Text']
        msg_share_url = msg['Url']       # 记录分享的url

    print('来源：', msg_from)
    print('作者：', msg_by)
    print('消息类型：', msg['Type'])
    print('消息内容：', msg_content)
    print('分享消息：', msg_share_url)
    msg_json = {}
    msg_json.setdefault('msg_from', msg_from)
    msg_json.setdefault('msg_by', msg_by)
    msg_json.setdefault('msg_type', msg['Type'])
    msg_json.setdefault('msg_content', msg_content)
    msg_json.setdefault('msg_share_url', msg_share_url)
    msg_json.setdefault('msg_time', msg_time_rec)
    save_msg(msg_json)

    face_bug = msg_content

    # 将信息存储在字典中，每一个msg_id对应一条信息
    msg_information.update(
        {
            msg_id: {
                "msg_from": msg_from,
                "msg_time": msg_time,
                "msg_time_rec": msg_time_rec,
                "msg_by": msg_by,
                "msg_type": msg["Type"],
                "msg_content": msg_content,
                "msg_share_url": msg_share_url
            }
        }
    )
    # print('msg_information', msg_information)


# 这个是用于监听是否有消息撤回
@itchat.msg_register(NOTE, isFriendChat=True, isGroupChat=True, isMpChat=True)
def information(msg):
    # 这里如果这里的msg['Content']中包含消息撤回和id，就执行下面的语句
    if '撤回了一条消息' in msg['Content']:
        old_msg_id = re.search("\<msgid\>(.*?)\<\/msgid\>", msg['Content']).group(1)   # 在返回的content查找撤回的消息的id
        old_msg = msg_information.get(old_msg_id)    # 得到消息
        print(old_msg)
        # 如果发送的是表情包
        if len(old_msg_id) < 11:
            itchat.send_file(face_bug, toUserName='filehelper')
        # 发送撤回的提示给文件助手
        else:
            msg_body = "【" + old_msg.get('msg_by') + '】在【' \
                       + old_msg.get('msg_from') + "】消息撤回提醒\n"\
                       + " 撤回了 " + old_msg.get("msg_type") + " 消息：" + "\n" \
                       + old_msg.get('msg_time_rec') + "\n" \
                       + "" + old_msg.get('msg_content')
            # 如果是分享的文件被撤回了，那么就将分享的url加在msg_body中发送给文件助手
            if old_msg['msg_type'] == "Sharing":
                msg_body += "\n就是这个链接➣ " + old_msg.get('msg_share_url')

            # 将撤回消息发送到文件助手
            itchat.send_msg(msg_body, toUserName='filehelper')
            # 有文件的话也要将文件发送回去
            if old_msg["msg_type"] == "Picture" \
                    or old_msg["msg_type"] == "Recording" \
                    or old_msg["msg_type"] == "Video" \
                    or old_msg["msg_type"] == "Attachment":
                file = '@fil@%s' % (old_msg['msg_content'])
                itchat.send(msg=file, toUserName='filehelper')
                os.remove(old_msg['msg_content'])
            # 删除字典旧消息
            msg_information.pop(old_msg_id)


def save_msg(msg_json):
    conn = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='123456',
        db='weichat',
        charset='utf8mb4',
    )
    cur = conn.cursor()
    sql = "INSERT INTO msg(id, msg_from, msg_by, msg_type, msg_content, msg_share_url, msg_time) " \
          "VALUES(NULL, %s, %s, %s, %s, %s, %s);"
    values = (msg_json.get('msg_from'), msg_json.get('msg_by'), msg_json.get('msg_type'), msg_json.get('msg_content'),
              msg_json.get('msg_share_url'), msg_json.get('msg_time'))
    # print(values)
    cur.execute(sql, values)
    conn.commit()
    cur.close()
    conn.close()

# Main
itchat.auto_login(enableCmdQR=False, hotReload=True)
itchat.run()

```

