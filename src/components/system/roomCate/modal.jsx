import React from 'react';
import { Modal, Form, Input, Select } from 'antd';

const { TextArea } = Input;
const Option = Select.Option;
const FormItem = Form.Item;
const CateModal = ({
  roomCate,
  mergeData,
  modalChange,
  modalHandleOk,
  form: { getFieldDecorator, validateFields },
}) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        modalHandleOk(values);
      }
    });
  };
  const onCancel = () => {
    mergeData({ modalVisible: false, parentId: '-1', cateCode: '', cateName: '', cateDesc: '' });
  };
  let title = '新增分类';
  if (roomCate.type === 'edit') {
    title = '编辑分类';
  }
  const modalOpts = {
    title,
    visible: roomCate.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: roomCate.loading,
    destroyOnClose: true,
  };
  const classifyProps = {
    style: { minWidth: 300 },
    placeholder: '请选择图书分类',
    onChange(value) {
      modalChange(value);
    },
    disabled: roomCate.oPty === 'edit',
    showSearch: true,
    filterOption(inputValue, options) {
      const qs = options.props.children;
      const req = new RegExp(inputValue, 'i');
      if (qs && req.test(qs)) return true;
      return false;
    },
  };
  const codeProps = {
    style: { minWidth: 300 },
    disabled: roomCate.oPty === 'edit',
  };
  const nameProps = {
    style: { minWidth: 300 },
  };
  const explainProps = {
    style: { minWidth: 300 },
    rows: 4,
  };
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="上级分类：" {...formItemLayout}>
          {getFieldDecorator('parentId', {
            initialValue: roomCate.parentId,
          })(
            <Select {...classifyProps}>
              <Option value="-1" key="-1">
                宿舍分类
              </Option>
              {roomCate.cateList &&
                roomCate.cateList.length &&
                roomCate.cateList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.cateName}
                  </Option>
                ))}
            </Select>,
          )}
        </FormItem>
        <FormItem label="分类编码：" {...formItemLayout}>
          {getFieldDecorator('cateCode', {
            initialValue: roomCate.cateCode,
            rules: [
              { required: true, message: '分类编码未填写', whitespace: true },
              {
                pattern: /^[0-9]{1,10}$/,
                message: '请输入1到10位的数字！',
              },
            ],
          })(<Input {...codeProps} placeholder="请输入编码（1到10位的数字）" />)}
        </FormItem>
        <FormItem label="分类名称：" {...formItemLayout}>
          {getFieldDecorator('cateName', {
            initialValue: roomCate.cateName,
            rules: [
              { required: true, message: '分类名称未填写', whitespace: true },
              {
                pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                message: '请输入2到10位的中文或英文字符！',
              },
            ],
          })(<Input {...nameProps} placeholder="请输入名称（2到10位的中文或英文字符）" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分类描述">
          {getFieldDecorator('cateDesc', {
            validateFirst: true,
            rules: [
              { required: true, message: '请输入分类描述' },
              { max: 100, message: '分类描述长度最长为100位' },
            ],
            initialValue: roomCate.cateDesc,
          })(<TextArea {...explainProps} placeholder="请输入分类描述（最多100个字符）" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};
export default Form.create()(CateModal);
