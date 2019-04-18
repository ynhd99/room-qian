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
    teacher.roleList &&
    teacher.roleList.map(role => (
      <Select.Option
        value={role.id}
        key={role.id}
        queryString={`${role.roleName} | ${role.roleCode}`}
      >
        {role.roleName} | {role.roleCode}
      </Select.Option>
    ));
  const collegeOptions =
    teacher.collegeList &&
    teacher.collegeList.map(college => (
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
            <FormItem {...formItemLayout} label="辅导员编号" hasFeedback>
              {getFieldDecorator('teacherCode', {
                initialValue: teacher.teacherCode,
                rules: [
                  {
                    required: true,
                    message: '请输入编号！',
                  },
                  {
                    pattern: /^[0-9]{1,10}$/,
                    message: '请输入1到10位的数字！',
                  },
                ],
              })(
                <Input
                  type="text"
                  placeholder="请输入编号（1到10位的数字）"
                  disabled={teacher.oPty === 'edit'}
                />,
              )}
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
              })(<Input type="text" placeholder="请输入姓名（2到10位的中文或英文字符）" />)}
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
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="角色">
              {getFieldDecorator('roleId', {
                initialValue: teacher.roleId === '' ? '请选择角色' : teacher.roleId,
                rules: [{ required: true, message: '请选择角色' }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={teacher.roleId}
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
                initialValue: teacher.collegeId === '' ? '请选择学院' : teacher.collegeId,
                rules: [
                  {
                    required: true,
                    message: '请选择学院',
                  },
                ],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={teacher.collegeId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ collegeId: value });
                  }}
                  placeholder="请选择学院"
                >
                  {collegeOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default Form.create()(TeacherModal);
