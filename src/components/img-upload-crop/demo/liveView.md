---
order: 1
title:
  zh-CN: 实时预览裁剪效果
  en-US: basic
---

## zh-CN
可以实时预览裁剪效果的用法
1. `getPicInfo` 返回需要实时预览裁剪效果的标签
2. `Preview`参数设置请参考ImgCropModal

## en-US

simple demo.

````jsx

import { ImgUploadCrop, ImgCropModal} from 'hermes-react';
const Preview = ImgCropModal.Preview;

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
    if (width < 400 || height < 300) {
      // 自定义最小裁剪大小
      message.error('请上传400*300以上的照片');
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
      action: '/upload.do',
      name: 'file',
      onUpload: this.onUpload,
      onCropPic: this.onCropPic,
      getPicInfo: (positionInfo) => {
          const {width, height, url} = positionInfo;
          // 裁剪后的照片，按照长的一边作为基准展示，短的一边则裁剪或两边留白
          const fillType = width > height ? 'width' : 'height';
          return (<div style={{display: 'inline-block', marginLeft: 30, verticalAlign: 'middle'}}>
          <div>预览图(1:1比例)</div>
          <Preview
            url={url}
            fillType={fillType}
            style={{width: 200, height: 200, background: '#fff',marginBottom: 20, border: '1px solid #ccc'}}
            crop={positionInfo}
          />
          <div>预览图(16:9比例)</div>
          <Preview
            url={url}
            fillType={fillType}
            style={{width: 320, height: 180, background: '#fff', marginBottom: 20, border: '1px solid #ccc'}}
            crop={positionInfo}
        />
      </div>);
      },
      rate: 4/3,
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
