import React from 'react';
import { Modal, Form, Input, Row, Col, Radio, Select } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const StudentModal = ({
  student,
  form: { getFieldDecorator, validateFields },
  modalHandleOk,
  mergeData,
  getClassList,
}) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        modalHandleOk(values);
      }
    });
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
  const filterOption = (inputValue, option) => {
    const props = option.props;
    const qs = props.queryString;
    const reg = new RegExp(inputValue, 'i');
    if (typeof props.children === 'string') {
      return false;
    }
    if (qs && reg.test(qs)) {
      return true;
    }
    return false;
  };
  const roleOptions =
    student.roleList &&
    student.roleList.map(role => (
      <Select.Option
        value={role.id}
        key={role.id}
        queryString={`${role.roleName} | ${role.roleCode}`}
      >
        {role.roleName} | {role.roleCode}
      </Select.Option>
    ));
  const classOptions =
    student.classList &&
    student.classList.map(c => (
      <Select.Option value={c.id} key={c.id} queryString={`${c.className} | ${c.classCode}`}>
        {c.className} | {c.classCode}
      </Select.Option>
    ));
  const collegeOptions =
    student.collegeList &&
    student.collegeList.map(college => (
      <Select.Option
        value={college.id}
        key={college.id}
        queryString={`${college.collegeName} | ${college.collegeCode}`}
      >
        {college.collegeName} | {college.collegeCode}
      </Select.Option>
    ));
  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <Col span={22}>
            <FormItem label="学号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('studentCode', {
                initialValue: student.studentCode,
                rules: [
                  {
                    required: true,
                    message: '请输入编号！',
                    whitespace: true,
                  },
                  {
                    pattern: /^[0-9]{2,10}$/,
                    message: '请输入2到10位的数字！',
                  },
                ],
              })(<Input disabled={student.oPty === 'edit'} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="学生姓名" hasFeedback>
              {getFieldDecorator('studentName', {
                initialValue: student.studentName,
                rules: [
                  {
                    required: true,
                    message: '请输入姓名！',
                    whitespace: true,
                  },
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa5]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="2到10位的中文或英文字符" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号">
              {getFieldDecorator('studentPhone', {
                initialValue: student.studentPhone,
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: '请输入手机号！',
                    whitespace: true,
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
                    whitespace: true,
                  },
                ],
              })(
                <RadioGroup name="gender">
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              {getFieldDecorator('roleId', {
                initialValue: student.roleId === '' ? '请选择角色' : student.roleId,
                rules: [{ required: true, message: '请选择角色', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={student.roleId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ roleId: value });
                  }}
                  placeholder="请选择角色"
                >
                  {roleOptions}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: student.collegeId === '' ? '请选择学院' : student.collegeId,
                rules: [
                  {
                    required: true,
                    message: '请选择学院',
                    whitespace: true,
                  },
                ],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={student.collegeId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    console.log('我改变学院了');
                    mergeData({ collegeId: value, classId: '' });
                    getClassList();
                  }}
                  placeholder="请选择学院"
                >
                  {collegeOptions}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="班级">
              {getFieldDecorator('classId', {
                initialValue: student.classId === '' ? '请选择班级' : student.classId,
                rules: [
                  {
                    required: true,
                    message: '请选择班级',
                  },
                ],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={student.classId === '' ? '请选择班级' : student.classId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ classId: value });
                  }}
                  placeholder="请选择班级"
                  disabled={student.collegeId === ''}
                  defaultActiveFirstOption
                >
                  {classOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default Form.create()(StudentModal);
