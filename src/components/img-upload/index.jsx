import React, { Component } from 'react';
import { Icon, Upload, message } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style/index';

class ImgUpload extends Component {
  static propTypes = {
    className: PropTypes.string,
    exampleUrl: PropTypes.any,
    exampleText: PropTypes.string,
    triggerText: PropTypes.string,
    fileExt: PropTypes.array,
    max: PropTypes.number,
    maxSize: PropTypes.number, // 单位KB
    onChange: PropTypes.func,
    value: PropTypes.any,
    onFilterList: PropTypes.func,
  };

  static defaultProps = {
    exampleUrl: '',
    exampleText: '示例',
    triggerText: '上传照片',
    fileExt: ['image/jpeg', 'image/jpg', 'image/png'],
    maxSize: 20 * 1024, // 20M
    max: 0, // 无限制
    value: [],
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  getSizeErrorMsg = (size) => {
    if (size < 1024) {
      return `图片已超过${size}KB`;
    } else if (size < 1024 * 1024) {
      const sizemb = parseInt(size / 1024, 10);
      return `图片已超过${sizemb}MB`;
    } else if (size < 1024 * 1024 * 1024) {
      const sizegb = parseInt(size / 1024 / 1024, 10);
      return `图片已超过${sizegb}GB`;
    }
    return '图片超过限制';
  };

  // 上传文件之前的钩子
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
  };

  normalizeUploadValue = (info) => {
    if (Array.isArray(info)) {
      return info;
    }
    if (!info) {
      return [];
    }

    const { max } = this.props;
    let fileList = info.fileList;
    fileList = fileList.slice(fileList.length >= max ? -max : 0);

    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (typeof file.response === 'string') {
        file.response = JSON.parse(file.response);
      }
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示,只有图片使用。
        if (file.type.indexOf('image') !== -1) {
          file.url = file.response.fileNameUrl;
        } else {
          // 上传文件时，不提供下载地址。
          file.tfsUrl = file.response.fileNameUrl;
        }
        file.id = file.response.result;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      if (file.response) {
        if (file.response.status === 'failed') {
          message.error(file.response.resultMsg);
          return false;
        }
      }
      return true;
    });

    this.props.onChange(fileList);
    this.setState({
      value: fileList,
    });
  };

  /* eslint-disable */
  render() {
    const { value } = this.state;

    const { triggerText, exampleUrl, exampleText, max, ...others } = this.props;
    const className = classNames({
      [this.props.className]: this.props.className,
      ['clearfix']: true,
    });

    const options = {
      listType: 'picture-card',
      withCredentials: true,
      beforeUpload: this.beforeUpload,
      ...others,
      onChange: this.normalizeUploadValue,
      fileList: value,
      onPreview: file => window.open(file.url),
    };

    return (
      <div className={className}>
        <Upload {...options}>
          {max === 0 || value.length < max ? (
            <div>
              <Icon type="plus" />
              <div className="ant-upload-text">{triggerText}</div>
            </div>
          ) : null}
        </Upload>

        {exampleUrl ? (
          <a href={exampleUrl} target="_blank" className="ant-upload-example">
            <img alt="" src={exampleUrl} />
            {exampleText ? <span>{exampleText}</span> : null}
          </a>
        ) : null}
      </div>
    );
  }
}

export default ImgUpload;
