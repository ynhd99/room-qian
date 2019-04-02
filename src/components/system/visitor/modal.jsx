import React from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const VisitorModal = ({
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
    mergeData({ modalVisible: false });
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
                    message: '请输入到访问员姓名',
                  },
                ],
              })(<Input type="text" placeholder="请输入访问者姓名" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="身份证号" {...formItemLayout}>
              {getFieldDecorator('identityCode', {
                initialValue: visitor.identityCode,
                rules: [
                  {
                    required: true,
                    message: '请输入身份证号',
                  },
                ],
              })(<Input type="text" placeholder="请输入身份证号" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('phoneNumber', {
                initialValue: visitor.phoneNumber,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                ],
              })(<Input type="text" placeholder="请输入手机号" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="接待人" {...formItemLayout}>
              {getFieldDecorator('receptName', {
                initialValue: visitor.receptName,
                rules: [
                  {
                    required: true,
                    message: '请输入接待人姓名',
                  },
                ],
              })(<Input type="text" placeholder="请输入接待人姓名" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="开始时间" {...formItemLayout}>
              {getFieldDecorator('startTime', {
                initialValue: visitor.receptName,
                rules: [
                  {
                    required: true,
                    message: '请输入开始时间',
                  },
                ],
              })(<Input type="text" placeholder="请输入开始时间" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="结束时间" {...formItemLayout}>
              {getFieldDecorator('endTime', {
                initialValue: visitor.endTime,
                rules: [
                  {
                    message: '请输入离开时间',
                  },
                ],
              })(<Input type="text" placeholder="请输入离开时间" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="访问事由" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: visitor.remark,
                rules: [
                  {
                    required: true,
                    message: '请输入访问原因',
                  },
                ],
              })(<TextArea type="text" placeholder="请输入访问原因" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(VisitorModal);
