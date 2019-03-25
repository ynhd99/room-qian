import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;

const PropertyModal = ({
  visitor,
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
    title: '新增访问信息',
    visible: visitor.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: visitor.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="人员姓名" {...formItemLayout}>
              {getFieldDecorator('visitorName', {
                initialValue: visitor.visitorName,
                rules: [
                  {
                    required: true,
                    message: '请输入到访人员姓名',
                  },
                ],
              })(
                <Input
                  type="text"
                  placeholder="请输入物品编码"
                  disabled={visitor.oPty === 'edit'}
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
