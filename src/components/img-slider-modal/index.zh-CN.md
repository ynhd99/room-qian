---
category: Components
type: 图片处理
title: ImgSliderModal
subtitle: 图片滑动轮播展示弹层
---

## API
### ImgSliderModal props

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| list | 图片list | Array[String<图片src>] / Array[Object<详见list对象>] | [] |
| children | 触发弹层按钮的元素 | React.element ||
| width | 图片内容区域宽度 | Number | 688 |
| height | 图片内容区域高度 | Number | 500 |
| initialSlide | 初始展示的索引值 | Number | 0 |
| arrows | 是否显示左右轮播箭头 | Boolean | true |
| dots | 是否显示面板指示点 | Boolean | true |
| infinite | 无限循环轮播 | Boolean | true |

### list对象

| 参数        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| src | 图片链接 | String ||
| alt | 图片alt | String ||
| desc | 文案说明 | String ||

更多参数可参考：https://github.com/akiran/react-slick
