import React from 'react';
import { Modal, Form, Input, Row, Col, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RepairModal = ({
  repair,
  form: { getFieldDecorator, validateFields },
  modalHandleOk,
  mergeData,
}) => {
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
  const roomOperation =
    repair.roomList &&
    repair.roomList.map(room => (
      <Select.Option value={room.id} key={room.id} queryString={`${room.roomCode}`}>
        {room.roomCode}
      </Select.Option>
    ));
  const goodsOperation =
    repair.goodsList &&
    repair.goodsList.map(good => (
      <Select.Option value={good.id} key={good.id} queryString={`${good.goodsName}`}>
        {good.goodsName}
      </Select.Option>
    ));
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
    title: repair.oPty === 'add' ? '新增维修信息' : '修改维修信息',
    visible: repair.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: repair.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="宿舍" hasFeedback {...formItemLayout}>
              {getFieldDecorator('buildingId', {
                initialValue: repair.roomId === '' ? '请选择宿舍' : repair.roomId,
                rules: [{ required: true, message: '宿舍号未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ buildingId: value });
                  }}
                  placeholder="请选择宿舍"
                >
                  {roomOperation}
                </Select>,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="物品" hasFeedback {...formItemLayout}>
              {getFieldDecorator('goodsId', {
                initialValue: repair.goodsId === '' ? '请选择物品' : repair.goodsId,
                rules: [{ required: true, message: '物品未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ goodsId: value });
                  }}
                  placeholder="请选择物品"
                >
                  {goodsOperation}
                </Select>,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="维修日期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('repairDate', {
                initialValue: repair.repairDate,
                rules: [{ required: true, message: '维修日期未选择', whitespace: true }],
              })(
                <DatePicker
                  onChange={(value) => {
                    mergeData({ repairDate: value });
                  }}
                />,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="访问事由" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: repair.remark,
                rules: [
                  {
                    required: true,
                    message: '请输入访问原因',
                  },
                ],
              })(<TextArea type="text" placeholder="请输入访问原因" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(RepairModal);