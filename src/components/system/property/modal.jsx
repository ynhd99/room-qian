import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

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
  };
  const onCancel = () => {
    mergeData({ modalVisible: false, goodsCode: '', goodsName: '', oPty: '' });
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
              {getFieldDecorator('goodsCode', {
                initialValue: property.goodsCode,
                rules: [
                  {
                    required: true,
                    message: '请输入物品编码',
                  },
                  {
                    pattern: /^[0-9]{1,10}$/,
                    message: '请输入1到10位的数字！',
                  },
                ],
              })(
                <Input
                  type="text"
                  placeholder="请输入物品编码（1到10位的数字）"
                  disabled={property.oPty === 'edit'}
                />,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="物品名称" {...formItemLayout}>
              {getFieldDecorator('goodsName', {
                initialValue: property.goodsName,
                rules: [
                  {
                    required: true,
                    message: '请输入物品名称',
                  },
                  {
                    max: 20,
                    message: '最长为20个字符',
                  },
                ],
              })(<Input type="text" placeholder="请输入物品名称（最多20个字符）" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(PropertyModal);
