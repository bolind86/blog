---
title: 使用Cypress进行UI自动化测试
date: 2019/06/04 14:10:00
categories: [软件测试, 自动化测试, UI自动化]
tags: [cypress]
---

# Cypress介绍

官网地址：<https://www.cypress.io/>

## 安装

```powershell
cd /your/project/path
npm install cypress --save-dev
```

## 启动

```powershell
./node_modules/.bin/cypress open
```

或者

```powershell
npx cypress open
```

![启动界面](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20190604141507.png)

## 目录结构

```
UITEST
|--cypress
    |--fixtures				//测试数据配置文件，可以使用fixture方法读取
    |--integration			//测试脚本文件
    |--plugins				//插件文件
    |--screenshots			//截图文件
    |--support				//支持文件
    |--videos				//视频文件
|--node_modules
|--cypress.json				cypress全局配置文件
|--package-lock.json

```

## 元素定位插件

CSS Selector Helper for Chrome：[下载地址](<https://chrome.google.com/webstore/detail/css-selector-helper-for-c/gddgceinofapfodcekopkjjelkbjodin>)

打开chrome的DevTools，按下ctrl+shift+r选择元素，出现如下界面

![](http://img.qizhenjun.com/QQ%E6%88%AA%E5%9B%BE20190604142953.png)

选择红框中的元素，直到prev和next中只有1个元素，然后点击`selector to clipboard`按钮即可复制css selector定位的元素地址

## 测试脚本

test_workOrder.js

```javascript
/// <reference types="Cypress" />
/**
 * 工单测试
 */

import {
  baseDatas as bds
} from '../../../plugins/dataConfig';
import {
  login
} from '../../../plugins/scripts/public/s_login';


Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

context('IME', function () {
  context('工单', function () {
    it('登录', function () {
      login(bds.busiUnit_username)
    })
  })
})
```

s_login.js

```javascript
/// <reference types="Cypress" />
/**
 * 订单测试
 */


  import {
    login_elements as le
  } from '../../element/login/el_login'


export function login(username) {
    cy.visit('/neusoftEEP_web')
    cy.contains('登录')
    cy.get(le.input_username).type(username)
    cy.get(le.input_password).type('123456')
    cy.get(le.button_login).click()
}
```

el_login.js

```javascript
export const login_elements = {
    // Author: qizhenjun
    // USAGE:
    //      登录页面元素
    input_username: "input[id='userName']", // 用户名输入框
    input_password: "input[id='password']", // 密码输入框
    button_login: "button[class='ant-btn submit ant-btn-lg ant-btn-background-ghost']", // 登录按钮
}
```

