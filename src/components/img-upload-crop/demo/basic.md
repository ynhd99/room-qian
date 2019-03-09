---
order: 0
title:
  zh-CN: 基本
  en-US: basic
---

## zh-CN
1. `action`定义文件上传地址
2. `name`定义后端需要的表单名
3. `rate`定义图片裁剪比例
4. `initWidth`定义裁剪框初始化大小
5. `style`定义外层图片外层容器大小

## en-US

simple demo.

#### 如何使用

````jsx

import { ImgUploadCrop, ImgCropModal} from 'hermes-react';
import { message } from 'antd';

const ImgUpload = React.createClass({

  onUpload(result) {
    if (result && result.status === 'failed') {
      message.warning(result.errorMessage || '网络繁忙，请稍后重试');
      return null;
    }
    // mock返回图片地址，实际使用中不需使用改代码
    return 'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg';
    // 实际使用中，请直接返回图片的url地址
    // return result.url;
  },

  onCropPic(positionInfo) {
    const {width, height, orgWidth, orgHeight} = positionInfo;
    if (width < 500 || height < 500) {
      message.error('请上传500*500以上的照片');
      return false;
    }
    const cutParams = {
      xx: positionInfo.X,
      yy: positionInfo.Y,
      width,
      height,
      orgWidth,
      orgHeight,
      avatarImage: positionInfo.url,
      fileType: 'jpg',
    };
    return new Promise((resolve, reject) => {
      // mock一个resolve，实际使用中不需使用改代码
      resolve({
        id: -1,
        url: 'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
      });
      // 实际使用时，请使用以下正确的ajax请求返回resolve
      /*
      ajax({
        url: './cutPic.json',
        method: 'post',
        type: 'json',
        data: cutParams,
        success: (res) => {
          if (res.fileId) {
            resolve({
              id: res.fileId,
              url: res.result,
              });
            } else {
              reject(res.resultMsg || '裁剪失败');
            }
          },
        error: (res) => {
          reject(res.resultMsg || '裁剪失败');
        },
      });
      */
    });
  },

  render() {
    const props = {
      exampleUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      action: '/upload.do',
      name: 'file',
      onUpload: this.onUpload,
      onCropPic: this.onCropPic,
      rate: 1,
      initWidth: 0.8,
      style: {width: 500, height: 500},
    };

    return (<ImgUploadCrop {...props} />);
  }

});

ReactDOM.render(
  <ImgUpload />
, mountNode);
````
