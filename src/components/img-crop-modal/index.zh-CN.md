---
category: Components
type: 图片处理
title: ImgCropModal
subtitle: 裁剪视图
cols: 1
---

## 何时使用

具有裁剪，回填显示预览效果功能
> 原理是：通过裁剪框获得裁剪区域 `{X: Number, Y: Number, width: Number, height: Number}`，交由服务端进行裁剪。

### ImgCropModal

我们为 ```ImgCropModal``` 提供了以下两种展示方式：
1. 含弹窗（默认）
2. 不含弹窗

设置裁剪框时，可以根据需要设置以下部分参数：
1. [弹窗参数](#弹窗参数)
1. [图片初始化参数](#图片初始化参数)
1. [选框初始化参数](#选框初始化参数)
1. [拖拽参数](#拖拽参数)


### 预览区域
我们封装了预览区域效果，使用方式：
```
<ImgCropModal.Preview
  url={url}
  crop={{X: 30, Y: 80, width: 200, height: 300}}
  style={{width: 400, height: 200, background: '#888'}}
/>
```

## API

#### 弹窗参数
| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| isModal | 是否以弹窗方式显式，不以弹窗方式显示，以dom节点显示 | Boolean | true |
| visible | isModal为true时是否展示弹窗,用于对展示进行缓存处理 | Boolean | true |
| modalOption | isModal为true的情况，对modal定制的参数，可参考[antd-modal](https://ant.design/components/modal-cn/) | Object | {} |
| onOk(不推荐， 可写在modalOption中) | 点击确定后回调(isModal: true) | Function({X, Y, width, height, orgWidth, orgHeight}, url) | noop |
| onCancel(不推荐， 可写在modalOption中) | 点击取消后回调(isModal: true) | Function() | |


#### 图片初始化参数

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| style | (推荐)图片样式, 设置style可定死宽高必须为px， 此时[minPicH, minPicW, maxPicH, maxPicW]无效 | Object | {} |
| url | 需要截取的图片(必填) | String | '' |
| minPicH | 图片最小高度  | Number | 0 |
| minPicW | 图片最小宽度 | Number | 0 |
| maxPicH | 图片最大高度 优先级：document.clientHeight > 图片最大最小高 > frame最小高 > 图片高 | Number | 0 |
| maxPicW | 图片最大宽度 优先级：133 > 图片最小宽 > frame最小宽 > 图片宽 | Number | 0 |

#### 选框初始化参数

权重：initWidth + rate > initHeight + rate > initWidth + initHeight , 且只有initWidth和initHeight时没有百分比

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| init |  初始化回填值 | Object | {X: Number, Y: Number, width: Number, height: Number} |
| rate | 截图宽高比，若不传，默认为图片宽高比 | Number | 0 |
| initWidth | 初始化宽度, 可为百分比 | Number | 0 |
| initHeight | 初始化宽度 , 可为百分比| Number | 0 |
| over | 是否裁剪图片留白区域，如果为true则可裁剪图片以外的部分, 需后端支持负值 | Boolean | false |

#### 拖拽参数
| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| type | 获取base64或者图片位置['base64', 'position'],base64不支持Ie，且不支持位置回填 | String | 'position' |
| dragMin | {type: 'height', value: '300'}, 可为百分比 | Object | initWidth 或 initHeight |
| dragMax | {type: 'height', value: '300'}, 可为百分比 | Object | img.width 或 img.height |
| onChange | 拖动变化时的回调(isModal: false)，如果传了over，回调函数中valid代表图片有效区域 | Function({X, Y, width, height, valid: {X, Y, width, height}}) | noop |

## ImgCropModal.Preview 预览区域

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| url | 选择的图片，必填 | String | null |
| style | 预览框样式，必填 | Object | {} |
| picStyle | 内部截取图片样式 | Object | {} |
| crop | 裁剪信息同ImgCropModal中的onchange提供的信息，over时取回调中的valid，必填 | Object<{X, Y, width, height}> | null |
| fillType | 裁剪后以哪一边为基准填满预览框，另一边可选择居中(见center参数)，auto时自动选择最长边为基准填满，此时裁剪区域在预览区域全部可见 | enum{'height', 'width', 'auto', 'short'} | auto |
| center | 一边填满后(见fillType参数)，另一边是非居中显示 | Boolean | true |
