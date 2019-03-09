import React from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const StaffModal = ({
  staff,
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
    mergeData({ modalVisible: false, oPty: '' });
  };
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const modalOpts = {
    width: 700,
    title: staff.oPty === 'edit' ? '编辑宿管员' : '添加宿管员',
    visible: staff.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: staff.loading,
    destroyOnClose: true,
  };
  console.log(staff.modalVisible);
  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={22}>
            <FormItem {...formItemLayout} label="宿管员编号" hasFeedback>
              {getFieldDecorator('staffCode', {
                initialValue: staff.staffCode,
                rules: [
                  {
                    required: true,
                    message: '请输入编号！',
                  },
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="2到10位的中文或英文字符" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名" hasFeedback>
              {getFieldDecorator('staffName', {
                initialValue: staff.staffName,
                rules: [
                  {
                    required: true,
                    message: '请输入姓名！',
                  },
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="2到10位的中文或英文字符" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号">
              {getFieldDecorator('staffPhone', {
                initialValue: staff.staffPhone,
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入手机号！',
                  },
                  {
                    pattern: /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                    message: '手机号格式错误！',
                  },
                ],
              })(<Input type="text" placeholder="请输入11位手机号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('staffSex', {
                initialValue: staff.staffSex,
                rules: [
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ],
              })(
                <RadioGroup name="gender">
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              {getFieldDecorator('roleId', {
                initialValue: staff.roleId,
                rules: [{ required: true, message: '请选择角色' }],
              })(<Select placeholder="请选择角色">{''}</Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="管理楼号">
              {getFieldDecorator('buildingId', {
                initialValue: staff.buildingId || [],
                rules: [
                  {
                    required: true,
                    message: '请选择楼号',
                  },
                ],
              })(<Select placeholder="请选择楼号">{''}</Select>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default Form.create()(StaffModal);
