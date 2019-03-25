import React from 'react';
import { Form, Select, Row, Col, Button, DatePicker } from 'antd';

const { WeekPicker } = DatePicker;

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
              {getFieldDecorator('queryString', {
                initialValue: visitor.querystring,
              })(
                <Select
                  minWidth="214"
                  placeholder="请输入宿舍名称或者编码"
                  onChange={(value) => {
                    mergeData({ queryString: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="到访时间">
              {getFieldDecorator('visitData', {
                initialValue: visitor.visitData,
              })(<WeekPicker minWidth="214" />)}
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
