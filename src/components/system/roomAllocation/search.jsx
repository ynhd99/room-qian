import React from 'react';
import { Form, Row, Col, Button, Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const RoomAllocationSearch = ({
  mergeData,
  routerGo,
  form: { getFieldDecorator },
  roomAllocation,
}) => {
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
              })(
                <Select style={{ minWidth: 215 }} placeholder="请选择楼号">
                  <Select.Option key="" value="">
                    请选择楼号
                  </Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="宿舍号">
              {getFieldDecorator('roomId', {
                initialValue: roomAllocation.roomId,
              })(
                <Select style={{ minWidth: 215 }} placeholder="请选择宿舍号">
                  <Select.Option key="" value="">
                    请选择宿舍号
                  </Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={4} />
          <Col span={4}>
            <FormItem className="search-input" {...formItemLayout1}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Button
            type="primary"
            onClick={() => {
              routerGo('/system/room/allocationDetail', 'add');
            }}
          >
            添加
          </Button>
        </Row>
      </Form>
    </div>
  );
};
export default Form.create()(RoomAllocationSearch);
