import React from 'react';
import { Modal, Form, Select, Table, Row, Col } from 'antd';

const FormItem = Form.Item;
const DetailModal = ({
  allocationDetail,
  mergeData,
  modalHandleOk,
  form: { getFieldDecorator, validateFields },
}) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        modalHandleOk(values);
      }
    });
    mergeData({ modalVisible: false });
  };
  const onCancel = () => {
    mergeData({ modalVisible: false, deportCode: '', deportName: '', oPty: '' });
  };
  const modalOpts = {
    width: '800',
    title: '新增学生',
    visible: allocationDetail.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: allocationDetail.loading,
    destroyOnClose: true,
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns = [
    {
      title: '学生编码',
      dataIndex: 'studentCode',
      width: '30%',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
    },
    {
      title: '班级',
      dataIndex: 'className',
    },
    {
      title: '性别',
      dataIndex: 'studentSex',
    },
  ];
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <Row>
          <Col span={12}>
            <FormItem label="学院：" hasFeedback {...formItemLayout}>
              {getFieldDecorator('collegeId', {
                initialValue: allocationDetail.collegeId,
              })(
                <Select>
                  <Select.Option key="" value="">
                    请选择学院
                  </Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="班级：" hasFeedback {...formItemLayout}>
              {getFieldDecorator('classId', {
                initialValue: allocationDetail.classId,
              })(
                <Select>
                  <Select.Option key="" value="">
                    请选择班级
                  </Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table columns={columns} rowSelection={rowSelection} />
    </Modal>
  );
};
export default Form.create()(DetailModal);
