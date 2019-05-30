import React from 'react';
import moment from 'moment';
import { Modal, Form, Input, Row, Col, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const HealthModal = ({
  health,
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
    health.roomList &&
    health.roomList.map(room => (
      <Select.Option value={room.id} key={room.id} queryString={`${room.roomCode}`}>
        {room.roomCode}
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
    title: health.oPty === 'add' ? '新增检查信息' : '修改检查信息',
    visible: health.modalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: health.loading,
    destroyOnClose: true,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Col>
          <Row>
            <FormItem label="宿舍" {...formItemLayout}>
              {getFieldDecorator('roomId', {
                initialValue: health.roomId === '' ? '请选择宿舍' : health.roomId,
                rules: [{ required: true, message: '宿舍号未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  value={health.roomId}
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ roomId: value });
                  }}
                  placeholder="请选择宿舍"
                  disabled={health.oPty === 'edit'}
                >
                  {roomOperation}
                </Select>,
              )}
            </FormItem>
          </Row>
          <Row>
            <FormItem
              label={
                <span>
                  <span style={{ color: 'red' }}>* </span>检查日期
                </span>
              }
              {...formItemLayout}
            >
              {getFieldDecorator('checkDate', {
                initialValue: moment(health.checkDate),
              })(<DatePicker allowClear={false} format="YYYY-MM-DD" style={{ minWidth: 215 }} />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="检查分数" {...formItemLayout}>
              {getFieldDecorator('checkPoint', {
                initialValue: health.checkPoint,
                rules: [
                  {
                    required: true,
                    message: '请输入检查分数',
                  },
                  {
                    pattern: /^100$|^(\d|[1-9]\d)(\.\d{1,4})*$/,
                    message: '只能输入数字，最多四位小数！',
                  },
                ],
              })(<Input type="text" placeholder="请输入检查分数（数字，最多四位小数）" />)}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="检查备注" {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: health.remark,
                rules: [
                  {
                    max: 200,
                    message: '最多200个字符',
                  },
                ],
              })(<TextArea type="text" placeholder="请输入检查备注（最多200个字符）" />)}
            </FormItem>
          </Row>
        </Col>
      </Form>
    </Modal>
  );
};
export default Form.create()(HealthModal);
