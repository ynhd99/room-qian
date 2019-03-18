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
  const staffOptions =
    building.staffList &&
    building.staffList.map(staff => (
      <Select.Option
        value={staff.id}
        key={staff.id}
        queryString={`${staff.staffName} | ${staff.staffCode}`}
      >
        {staff.staffName} | {staff.staffCode}
      </Select.Option>
    ));
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
              })(
                <Select
                  style={{ minWidth: 215 }}
                  value={building.staffId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ staffId: value });
                  }}
                  placeholder="请选择角色"
                >
                  {staffOptions}
                </Select>,
              )}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(BuildingModal);
