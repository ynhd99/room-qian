import React from 'react';
import { Form, Select, Row, Col, Button, TimePicker, moment } from 'antd';

const FormItem = Form.Item;
const VisitorSearch = ({
  visitor,
  mergeData,
  onSubmitInfo,
  form: { getFieldDecorator, validateFields },
}) => {
  const formItemLayout1 = {
    wrapperCol: {
      offset: 15,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        onSubmitInfo(values);
      }
    });
  };
  return (
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="宿舍">
              {getFieldDecorator('roomId', {
                initialValue: visitor.roomId,
              })(<Select minWidth="214" placeholder="请输入物品的编码或者名称" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="到访时间">
              {getFieldDecorator('visitData', {
                initialValue: visitor.visitData,
              })(<TimePicker minWidth="214" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem className="search-input" {...formItemLayout1}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div className="action-box">
        <Row />
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
              添加公共财产
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(VisitorSearch);
