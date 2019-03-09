---
category: Components
type: 其它
title: InfoModal
subtitle: 消息提示框
---

简单封装的提示框组件

## 何时使用

用于信息展示，浮层不需要确认

- 简单的查看图片浮层
- 简单的查看信息浮层

## API

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| style  | 定义消息提示按钮所在容器的样式 | Object | null |
| className | 定义消息提示按钮所在容器的css类   | String | '' |
| onOk | 关闭对话框时的回调函数 | Function | |
| children  | 对话框容器中显示的内容 | ReactNode | null |
| trigger | 触发对话框按钮的提示文字  | String \| ReactNode | '查看' |
| okText | 对话框页脚按钮的提示文字| String | '确 定' |
