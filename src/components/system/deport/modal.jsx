import React from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;
const DeportModal = ({
  deport,
  mergeData,
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
    mergeData({ modalVisible: false });
  };
  const onCancel = () => {
    mergeData({ modalVisible: false, deportCode: '', deportName: '', oPty: '' });
  };
  const modalOpts = {
    title: deport.oPty === 'edit' ? '编辑仓库' : '添加仓库',
    visible: deport.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: deport.loading,
    destroyOnClose: true,
  };
  console.log(deport.deportCode === '');
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem label="仓库编码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('deportCode', {
            initialValue: deport.oPty === 'edit' ? deport.deportCode : '',
            rules: [
              { required: true, message: '仓库编码未填写', whitespace: true },
              { max: 20, message: '最大长度不超过20' },
            ],
          })(
            <Input
              placeholder="请输入仓库编码"
              type="text"
              maxLength="20"
              disabled={deport.oPty === 'edit'}
            />,
          )}
        </FormItem>
        <FormItem label="仓库名称：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('deportName', {
            initialValue: deport.deportName,
            rules: [
              { required: true, message: '仓库名称未填写', whitespace: true },
              { max: 20, message: '最大长度不超过20' },
            ],
          })(<Input placeholder="请输入仓库名称" maxLength="20" type="text" />)}
        </FormItem>
      </Form>
    </Modal>
  );
};
export default Form.create()(DeportModal);
