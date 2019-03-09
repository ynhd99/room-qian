import React from 'react';
import { Form, Input, Row, Col, Button, Radio } from 'antd';

const FormItem = Form.Item;
const CollegeSearch = ({
  college,
  mergeData,
  onSubmitInfo,
  form: { getFieldDecorator, validateFields },
}) => {
  const formItemLayout1 = {
    wrapperCol: {
      span: 18,
      offset: 6,
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
  const changeStatusList = () => {};
  return (
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="搜索条件">
              {getFieldDecorator('queryString', {
                initialValue: college.queryString,
              })(<Input minWidth="214" placeholder="请输入学院的编码或者名称" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                initialValue: college.status || '',
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
          <Col span={8} xl={8} xxl={6}>
            <FormItem className="search-input" {...formItemLayout1}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div className="action-box" style={{ marginTop: '15px' }}>
        <Row />
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
              添加学院
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
              添加班级
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(CollegeSearch);
