import React from 'react';
import { Form, Input, Row, Col, Button, Select, Radio, TreeSelect } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const RoomSearch = ({ mergeData, form: { getFieldDecorator }, room }) => {
  const formItemLayout1 = {
    wrapperCol: {
      offset: 15,
    },
  };
  const changeStatusList = () => {};
  const onTreeChange = () => {};
  return (
    <div className="components-search">
      <Form layout="inline">
        <Row>
          <Col span={8}>
            <FormItem label="宿舍类别">
              {getFieldDecorator('cateId', {
                initialValue: room.cateId || '',
              })(
                <TreeSelect
                  style={{ minWidth: 215 }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={room.treeData}
                  placeholder="请选择宿舍类别"
                  treeDefaultExpandAll
                  onChange={onTreeChange}
                />,
              )}
            </FormItem>
          </Col>
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
                  <Radio.Button value="2">全部</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={4} />
          <Col span={4} />
          <Col span={4} />
          <Col span={4} />
          <Col span={4} />
          <Col span={4}>
            <FormItem className="search-input" {...formItemLayout1}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
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
