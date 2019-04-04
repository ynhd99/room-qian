import React from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';

const FormItem = Form.Item;
const RoomSearch = ({ mergeData, form: { getFieldDecorator }, room }) => {
  const formItemLayout1 = {
    wrapperCol: {
      offset: 15,
    },
  };
  const changeStatusList = () => {};
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem label="宿舍号">
              {getFieldDecorator('roomCode', {
                initialValue: room.roomCode,
              })(<Input placeholder="请输入宿舍号" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                initialValue: room.status || '',
              })(
                <Radio.Group
                  style={{ minWidth: 215 }}
                  onChange={value => changeStatusList(value.target.value)}
                >
                  <Radio.Button value="0">开启</Radio.Button>
                  <Radio.Button value="1">停用</Radio.Button>
                  <Radio.Button value="">全部</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row>
        <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
          添加宿舍
        </Button>
      </Row>
    </div>
  );
};
export default Form.create()(RoomSearch);
