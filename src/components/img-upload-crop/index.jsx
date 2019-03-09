import React, { Component } from 'react';
import { Upload, Icon, message, Modal } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ImgCropModal from '../img-crop-modal/index';

import './style/index';

/**
  @ Description: 将裁剪的空白部分的-X, -Y值转换为0， 并计算真正的裁剪的图片的高宽
 */

class MyUpload extends Component {

  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.any, // 初始化图片的值
    onChange: PropTypes.func, // 裁剪完后触发改函数
    fileExt: PropTypes.array, // 可以上传的图片类型
    maxSize: PropTypes.number, // 可以上传的图片的最大值
    action: PropTypes.string, // 图片上传地址
    onUpload: PropTypes.func, // 图片上传后处理函数，返回值为上传后图片的完整url
    onCropPic: PropTypes.func, // 图片裁剪后处理函数，改函数输入参数为裁剪的图片信息，输出为一个promise
    exampleUrl: PropTypes.any,
    exampleText: PropTypes.string,
    triggerText: PropTypes.any,
    style: PropTypes.object, //  弹出的浮层看的样式
    getPicInfo: PropTypes.func,
  }

  static defaultProps = {
    exampleUrl: '',
    exampleText: '示例',
    triggerText: '上传照片',
    fileExt: ['image/jpeg', 'image/jpg', 'image/png'],
    maxSize: 20 * 1024, // 20M
    style: { width: 500, height: 500 },
    onChange: () => {},
    onUpload: (result) => {
      if (result && result.status === 'failed') {
        message.warning(result.errorMessage || '网络繁忙，请稍后重试');
        return null;
      }
      return result.url;
    },
    onCropPic: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      showCropView: false,
      logoFileId: '',
      showUploadList: this.props.value || [],
      fileList: this.props.value || [],
      priviewImage: '',
      cropInfo: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        fileList: nextProps.value,
      });
    }
  }

  // 获取图片大小
  getSizeErrorMsg = (size) => {
    if (size < 1024) {
      return `图片已超过${size}KB`;
    } else if (size < 1024 * 1024) {
      const a = size / 1024;
      return `图片已超过${a}MB`;
    } else if (size < 1024 * 1024 * 1024) {
      const a = size / 1024 / 1024;
      return `图片已超过${a}GB`;
    }
    return '图片超过限制';
  }

  // 上传之前校图片格式尺寸
  beforeUpload = (file) => {
    const { fileExt, maxSize } = this.props;
    if (fileExt.indexOf(file.type) < 0) {
      message.error('图片格式错误');
      return false;
    }
    // 单个文件限制大小
    if (file.size > maxSize * 1024) {
      message.error(this.getSizeErrorMsg(maxSize));
      return false;
    }
    return true;
  }

  // 图片上传处理
  handleChange = (info) => {
    if (Array.isArray(info)) {
      return info;
    }
    if (!info) {
      return [];
    }

    let fileList = info.fileList;
    fileList = fileList.slice(fileList.length >= 1 ? -1 : 0);

    if (fileList && fileList.length > 0 && fileList[0].status !== 'done') { // 受控函数,需要回填值
      this.setState({
        fileList,
      });
    } else if (fileList && fileList.length > 0) {
      const result = fileList && fileList[0].response;
      const url = this.props.onUpload(result);
      if (!url) {
        this.setState({
          fileList: [],
        });
      } else {
        this.setState({
          showCropView: true,
          logoFileId: url,
        });
      }
    } else {
      this.setState({
        fileList: [],
      });
    }
    this.props.onChange(fileList);
  }

  // 取消裁剪浮层
  cancelShowCropView = () => {
    this.props.onChange([]);
    this.setState({
      fileList: [],
      showCropView: false,
    });
  }

  // 裁剪图片函数
  cropPic = () => {
    const { crop, logoFileId } = this.state;
    if (this.props.onCropPic) {
      this.props.onCropPic({ ...crop, url: logoFileId }).then((res) => {
        const fileList = [{
          uid: res.id,
          id: res.id,
          url: res.url,
          status: 'done',
        }];
        this.props.onChange(fileList);
        this.setState({
          showCropView: false,
          showUploadList: true,
          fileList,
        });
      }).catch((res) => {
        message.warning(res || '网络繁忙，请稍后重试');
      });
    }
  }

  onPreview = (file) => {
    this.setState({
      priviewImage: file.url,
    });
  }

  render() {
    const { showCropView, logoFileId, fileList, showUploadList, crop } = this.state;
    const { exampleUrl, exampleText, triggerText } = this.props;

    const className = classNames({
      [this.props.className]: this.props.className,
    });

    const props = {
      listType: 'picture-card',
      action: this.props.action,
      withCredentials: true,
      onPreview: this.onPreview,
      name: 'file',
      ...this.props,
      style: { width: 'auto', height: 'auto' },
      onChange: this.handleChange,
      showUploadList,
      fileList,
      value: fileList,
      beforeUpload: this.beforeUpload,
    };

    const cropOption = {
      url: logoFileId,
      isModal: false,
      over: true,
      onChange: ({ valid, imgWidth, imgHeight }) => {
        this.setState({
          crop: { ...valid, orgWidth: imgWidth, orgHeight: imgHeight },
        });
      },
    };
    const cropStyleWidth = this.props.style.width;
    const modalWidth = (crop && this.props.getPicInfo) ? (cropStyleWidth * 2) + 32 : cropStyleWidth + 32;
    let modalTop = 100;
    if (window.top !== window) {
      modalTop = window.top.scrollY - 100;
    }
    return (<div className={className}>
      <Upload {...props} >
        {
           fileList.length < 1 ?
             <div>
               <Icon type="plus" />
               <div className="ant-upload-text">{triggerText}</div>
             </div> : null
         }
      </Upload>
      {
        exampleUrl ? (
          <a href={exampleUrl} target="_blank" rel="noopener noreferrer" className="ant-upload-example">
            <img alt="" src={exampleUrl} />
            { exampleText ? <span>{exampleText}</span> : null }
          </a>
          ) : null
      }
      {showCropView ?
        <Modal
          maskClosable={false}
          width={modalWidth}
          visible={showCropView}
          onOk={this.cropPic}
          onCancel={this.cancelShowCropView}
          style={{ top: modalTop }}
          >
          <div style={{ display: 'inline-block', marginTop: 20, width: cropStyleWidth }}>
            <ImgCropModal
              {...this.props}
              {...cropOption}
              />
          </div>
          { (crop && this.props.getPicInfo) ? this.props.getPicInfo({ ...crop, url: logoFileId }) : null }
        </Modal> : null
      }
      {
        this.state.priviewImage ?
          <Modal
            width={cropStyleWidth}
            visible
            footer={null}
            onCancel={() => {
              this.setState({ priviewImage: '' });
            }} >
            <div style={{ overflow: 'auto' }}>
              <img style={{ width: '100%', height: '100%' }} src={this.state.priviewImage} role="presentation" />
            </div>
          </Modal> : null
      }
    </div>);
  }
}

export default MyUpload;
