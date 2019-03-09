import React from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const StudentModal = ({
  student,
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
    title: student.oPty === 'edit' ? '编辑学生信息' : '添加学生信息',
    visible: student.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: student.loading,
    destroyOnClose: true,
  };
  console.log(student.modalVisible);
  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={22}>
            <FormItem {...formItemLayout} label="学号" hasFeedback>
              {getFieldDecorator('studentCode', {
                initialValue: student.staffCode,
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
            <FormItem {...formItemLayout} label="学生姓名" hasFeedback>
              {getFieldDecorator('studentName', {
                initialValue: student.studentName,
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
                initialValue: student.staffPhone,
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
              {getFieldDecorator('studentSex', {
                initialValue: student.studentSex,
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
                initialValue: student.roleId,
                rules: [{ required: true, message: '请选择角色' }],
              })(<Select placeholder="请选择角色">{''}</Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: student.collegeId,
                rules: [
                  {
                    required: true,
                    message: '请选择学院',
                  },
                ],
              })(<Select placeholder="请选择学院">{''}</Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="学院">
              {getFieldDecorator('classId', {
                initialValue: student.classId,
                rules: [
                  {
                    required: true,
                    message: '请选择班级',
                  },
                ],
              })(<Select placeholder="请选择班级">{''}</Select>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default Form.create()(StudentModal);
