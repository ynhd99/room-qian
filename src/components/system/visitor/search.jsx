import React from 'react';
import { Form, Row, Col, Button, DatePicker, Input } from 'antd';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const VisitorSearch = ({
  visitor,
  mergeData,
  onSubmitInfo,
  searchAction,
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
            <FormItem label="搜索条件">
              {getFieldDecorator('visitorName', {
                initialValue: visitor.visitorName,
              })(
                <Input
                  minWidth="220"
                  placeholder="请输入到访人姓名"
                  onChange={(value) => {
                    mergeData({ visitorName: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={16}>
            <FormItem label="到访时间">
              {getFieldDecorator('visitData', {
                initialValue: visitor.visitData,
              })(<RangePicker minWidth="200" />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div className="action-box">
        <Row />
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
              添加访客信息
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(VisitorSearch);
