import React from 'react';
import { Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;
const RoomAllocationSearch = ({ form: { getFieldDecorator }, roomAllocation }) => {
  const formItemLayout1 = {
    wrapperCol: {
      offset: 8,
    },
  };
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem label="楼号">
              {getFieldDecorator('buildingId', {
                initialValue: roomAllocation.buildingId,
              })(<Input style={{ minWidth: 215 }} placeholder="请输入宿舍楼号/名称" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="宿舍号">
              {getFieldDecorator('roomId', {
                initialValue: roomAllocation.roomId,
              })(<Input style={{ minWidth: 215 }} placeholder="请输入宿舍号" />)}
            </FormItem>
          </Col>
          <Col span={4} />
        </Row>
      </Form>
    </div>
  );
};
export default Form.create()(RoomAllocationSearch);
