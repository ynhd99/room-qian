import React from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TeacherModal = ({
  teacher,
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
    title: teacher.oPty === 'edit' ? '编辑辅导员信息' : '添加辅导员信息',
    visible: teacher.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: teacher.loading,
    destroyOnClose: true,
  };
  console.log(teacher.modalVisible);
  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={22}>
            <FormItem {...formItemLayout} label="辅导员编号" hasFeedback>
              {getFieldDecorator('teacherCode', {
                initialValue: teacher.teacherCode,
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
            <FormItem {...formItemLayout} label="辅导员姓名" hasFeedback>
              {getFieldDecorator('teacherName', {
                initialValue: teacher.teacherName,
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
              {getFieldDecorator('teacherPhone', {
                initialValue: teacher.teacherPhone,
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
              {getFieldDecorator('teacherSex', {
                initialValue: teacher.teacherSex,
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
                initialValue: teacher.roleId,
                rules: [{ required: true, message: '请选择角色' }],
              })(<Select placeholder="请选择角色">{''}</Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: teacher.collegeId,
                rules: [
                  {
                    required: true,
                    message: '请选择学院',
                  },
                ],
              })(<Select placeholder="请选择学院">{''}</Select>)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default Form.create()(TeacherModal);
