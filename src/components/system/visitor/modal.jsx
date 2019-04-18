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
    title: visitor.oPty === 'add' ? '新增访问信息' : '修改访问信息',
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
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="请输入访问者姓名（2到10位的中文或英文字符）" />)}
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
                  {
                    pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                    message: '身份证号格式不正确',
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
                  {
                    pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                    message: '手机号格式错误！',
                  },
                ],
              })(<Input type="text" placeholder="请输入11位手机号" />)}
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
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="请输入接待人姓名（2到10位的中文或英文字符）" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="开始时间" {...formItemLayout}>
              {getFieldDecorator('startTime', {
                initialValue: visitor.startTime,
                rules: [
                  {
                    required: true,
                    message: '请输入开始时间',
                  },
                  {
                    pattern: /^(\d{4})(-)(\d{2})(-)(\d{2}) (\d{2})(:)(\d{2})(:)(\d{2})$/,
                    message: '格式不符合要求',
                  },
                ],
              })(<Input type="text" placeholder="格式：2018-04-17 12:23:00" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="结束时间" {...formItemLayout}>
              {getFieldDecorator('endTime', {
                initialValue: visitor.endTime,
                rules:
                  visitor.oPty === 'edit'
                    ? [
                      {
                        required: true,
                        message: '请输入离开时间',
                      },
                      {
                        pattern: /^(\d{4})(-)(\d{2})(-)(\d{2}) (\d{2})(:)(\d{2})(:)(\d{2})$/,
                        message: '格式不符合要求',
                      },
                    ]
                    : '',
              })(
                <Input
                  type="text"
                  placeholder="格式：2018-04-17 12:23:00"
                  disabled={visitor.oPty === 'add'}
                />,
              )}
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
                  {
                    max: 200,
                    message: '最多200个字符',
                  },
                ],
              })(<TextArea type="text" placeholder="请输入访问原因（最多200个字符）" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(VisitorModal);
