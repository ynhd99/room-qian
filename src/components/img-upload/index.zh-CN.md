---
category: Components
type: 图片处理
title: ImgUpload
subtitle: 上传图片
---

卡片样式的图片上传组件。

## 何时使用

上传需要示例规范图片的时候，例如证件照、企业营业执照等。

是对 `Upload` 组件的深度定制。

## API

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| exampleUrl | 示例图url地址，如果为空或者false则不展示示例图 | String | |
| exampleText | 示例图下方提示的文案，空则不显示 | String | “示例” |
| triggerText | 触发上传按钮的提示文案 | String | “上传照片” |
| max | 上传图片数量的最大限制 | Number | 0 // 无限制 |
| maxSize | 上传图片文件大小的最大限制 | Number（单位：KB） | 20 * 1024 // 20M |
| fileExt | 上传图片文件后缀限制 | Array | ['image/jpeg', 'image/jpg', 'image/png'] |
