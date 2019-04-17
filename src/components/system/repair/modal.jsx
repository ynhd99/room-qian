import React from 'react';
import moment from 'moment';
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
            <FormItem label="宿舍" {...formItemLayout}>
              {getFieldDecorator('roomId', {
                initialValue: repair.roomId === '' ? '请选择宿舍' : repair.roomId,
                rules: [{ required: true, message: '宿舍号未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  value={repair.roomId}
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ roomId: value });
                  }}
                  placeholder="请选择宿舍"
                  disabled={repair.oPty === 'edit'}
                >
                  {roomOperation}
                </Select>,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="物品" {...formItemLayout}>
              {getFieldDecorator('goodsId', {
                initialValue: repair.goodsId === '' ? '请选择物品' : repair.goodsId,
                rules: [{ required: true, message: '物品未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  value={repair.goodsId}
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ goodsId: value });
                  }}
                  placeholder="请选择物品"
                  disabled={repair.oPty === 'edit'}
                >
                  {goodsOperation}
                </Select>,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem
              label={
                <span>
                  <span style={{ color: 'red' }}>* </span>维修日期
                </span>
              }
              {...formItemLayout}
            >
              {getFieldDecorator('repairDate', {
                initialValue: moment(repair.repairDate),
              })(
                <DatePicker
                  format="YYYY-MM-DD"
                  onChange={value => mergeData({ repairDate: value })}
                />,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="申请人" {...formItemLayout}>
              {getFieldDecorator('repairPerson', {
                initialValue: repair.repairPerson,
                rules: [
                  {
                    required: true,
                    message: '请输入申请人',
                  },
                ],
              })(<Input type="text" placeholder="请输入申请人" />)}
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
