import React from 'react';
import { Modal, Form, Input, Row, Col, TreeSelect } from 'antd';

const FormItem = Form.Item;

const PropertyModal = ({
  property,
  form: { getFieldDecorator, validateFields },
  modalHandleOk,
  mergeData,
}) => {
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
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const modalOpts = {
    width: 600,
    title: property.oPty === 'edit' ? '编辑物品信息' : '添加物品信息',
    visible: property.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: property.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="物品编码" {...formItemLayout}>
              {getFieldDecorator('propertyCode', {
                initialValue: property.propertyCode,
                rules: [
                  {
                    required: true,
                    message: '请输入物品编码',
                  },
                ],
              })(<Input type="text" placeholder="请输入物品编码" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="物品名称" {...formItemLayout}>
              {getFieldDecorator('propertyName', {
                initialValue: property.propertyName,
                rules: [
                  {
                    required: true,
                    message: '请输入物品名称',
                  },
                ],
              })(<Input type="text" placeholder="请输入物品名称" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(PropertyModal);
