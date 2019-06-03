import React from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';

const FormItem = Form.Item;

const ClassModal = ({
  classRoom,
  form: { getFieldDecorator, validateFields },
  modalHandleOk,
  mergeData,
  searchAction,
}) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      console.log(values);
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
      span: 14,
    },
  };
  const modalOpts = {
    width: 600,
    title: classRoom.oPty === 'edit' ? '编辑班级信息' : '添加班级信息',
    visible: classRoom.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
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
  const collegeOptions =
    classRoom.collegeList &&
    classRoom.collegeList.map(college => (
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
        <Col>
          <Row>
            <FormItem label="班级编码" {...formItemLayout}>
              {getFieldDecorator('classCode', {
                initialValue: classRoom.classCode,
                rules: [
                  {
                    required: true,
                    message: '请输入班级编码',
                  },
                  {
                    pattern: /^[0-9]{1,10}$/,
                    message: '请输入1到10位的数字！',
                  },
                ],
              })(
                <Input
                  type="text"
                  placeholder="请输入班级编码（1到10位的数字）"
                  disabled={classRoom.oPty === 'edit'}
                />,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="班级名称" {...formItemLayout}>
              {getFieldDecorator('className', {
                initialValue: classRoom.className,
                rules: [
                  {
                    required: true,
                    message: '请输入班级名称',
                  },
                  {
                    pattern: /^[A-Za-z\u4e00-\u9fa51-9]{2,10}$/,
                    message: '请输入2到10位的中文或英文字符！',
                  },
                ],
              })(<Input type="text" placeholder="请输入班级名称（2到10位的中文或英文字符）" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="所属学院" {...formItemLayout}>
              {getFieldDecorator('collegeId', {
                initialValue: classRoom.collegeId === '' ? '请选择所属学院' : classRoom.collegeId,
                rules: [
                  {
                    required: true,
                    message: '请输选择所属学院',
                  },
                ],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  //value={classRoom.collegeId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ collegeId: value });
                    searchAction();
                  }}
                  placeholder="请选择所属学院"
                >
                  {collegeOptions}
                </Select>,
              )}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(ClassModal);
