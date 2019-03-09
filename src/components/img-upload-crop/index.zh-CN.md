---
category: Components
type: 图片处理
title: ImgUploadCrop
subtitle: 上传裁剪图片
---

组合图片上传和裁剪功能的复合组件。

## 何时使用

需要上传图片并裁减上传图片

## API

是对 [Upload](http://1x.ant.design/components/upload)，[ImgCropModal](/components/img-crop-modal/) 组件的深度定制，支持`Upload，ImgCropModal`的所有参数，以下为常用参数的介绍


| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| exampleUrl | 示例图url地址，如果为空或者false则不展示示例图 | String | |
| exampleText | 示例图下方提示的文案，空则不显示 | String | “示例” |
| triggerText | 触发上传按钮的提示文案，可以为string类型的文案，也可以为div标签 | any | “上传照片” |
| name | 上传文件时的字段名称 | String | "file" |
| maxSize | 上传图片文件大小的最大限制 | Number（单位：KB） | 20 * 1024(20M) |
| fileExt | 上传图片文件后缀限制 | Array | ['image/jpeg', 'image/jpg', 'image/png'] |
| action | 图片上传地址 | String| 无|
| rate | 裁剪框的裁剪比例(使用rate时，必须同时使用initWidth/initHeight, 否则不生效)| Number | 0.5925 |
| style | 外层裁剪框所占区域的大小| object | { width: 500, height: 500 } |
| onUpload | 图片上传后，处理服务器返回的数据，返回已上传到服务器的filed的值 | func| null |
| onCropPic | 点击图片裁剪框时触发的函数，返回一个promise，resolev的参数为裁剪后的服务器返回的图片id，url为key值的对象 | func | |
| getPicInfo | 设置裁剪浮层中实时预览框的函数, 如不设置，则无右侧预览框 | func | 无 |
