---
category: Components
type: 图片处理
title: ImgPickerModal
subtitle: 图片选取对话框
cols: 1
---

提供弹窗式的图片预览、上传、选取功能。

## 何时使用

- 需要弹窗预览并选取图片时使用
- 在弹窗中上传并立即选取
- 多选图片

## API

### 选择及文案属性

| 属性        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------
| notice | 弹出框下方提示文字 | String | '' |
| fetch | 获取列表函数，传入callback，获取完数据后将数据塞入callback,s,数据格式为 Function(Function([{id, url, thumbUrl}...], {current, pageSize, total}?))) [示例](#components-img-picker-modal-demo-basic) | Function | () => {} |
| selected | 选中的图片idlist | Array | 1 |
| max | 最多支持选中多少图片 | Number | 1 |
| min | 最少支持选中多少图片 | Number | 1 |
| multiple | 是否支持多选 | Boolean | true |
| onPageChange | 分页变化时回调情况，注意，要在fetch的回调中塞入分页信息才会生效 | (current) => {} | null |
| onChange | 选中时发生变化，value为选中的图片list | Function | () => {} |
| limitInfo | 超出选中提示文字 | String | '超出选择限制' |
| onOk | 选中后回调，函数中有选中的id列表 | Function | () => {} |

### 上传部分属性

| 属性        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------
| uploadNotice | hover上传按钮时显示的提示 | Any | '' |
| uploadUrl | 上传url必填 | String | '' |
| uploadMulti | 是否支持一次上传多张图，antd1.7版本下有问题 | Boolean | false |
| uploadParams | 上传附带参数 [示例](#components-img-picker-modal-demo-upload) | Object | {} |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传。注意：该方法不支持老 IE。 [示例](#components-img-picker-modal-demo-upload) | (file) => boolean | Promise |
| uploadChange | 上传数据返回，可以在这里处理登录逻辑 [示例](#components-img-picker-modal-demo-upload)| Function({response}): {success: Boolean, data: {id: String, thumbUrl: String, url: String}, silence?: Boolean} | () => {} |
| chooseUpload | 自动勾选中上传了的图片 | Boolean | false |
