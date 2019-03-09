import React from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';

const FormItem = Form.Item;
// const Option = Form.Option;
const BuildingModal = ({
  building,
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
      span: 14,
    },
  };
  const modalOpts = {
    width: 600,
    title: building.oPty === 'edit' ? '编辑宿舍楼信息' : '添加宿舍楼信息',
    visible: building.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: building.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="宿舍楼编码" {...formItemLayout}>
              {getFieldDecorator('buildingCode', {
                initialValue: building.buildingCode,
                rules: [
                  {
                    required: true,
                    message: '请输入宿舍楼编码',
                  },
                ],
              })(<Input type="text" placeholder="请输入宿舍楼编码" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="宿舍楼名称" {...formItemLayout}>
              {getFieldDecorator('collegeName', {
                initialValue: building.collegeName,
                rules: [
                  {
                    required: true,
                    message: '请输入宿舍楼名称',
                  },
                ],
              })(<Input type="text" placeholder="请输入宿舍楼名称" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="宿管人员" {...formItemLayout}>
              {getFieldDecorator('staffId', {
                initialValue: building.staffId === '' ? '请选择宿管人员' : building.staffId,
                rules: [
                  {
                    required: true,
                    message: '请选择宿管人员',
                  },
                ],
              })(<Select placeholder="请选择宿管人员" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(BuildingModal);
