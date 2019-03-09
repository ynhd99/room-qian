import React from 'react';
import { Form, Input, Row, Col, Button, Radio, Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const CollegeSearch = ({
  building,
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
  const changeStatusList = () => {};
  return (
    <div className="components-search">
      <Form layout="inline" onSubmit={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem label="搜索条件">
              {getFieldDecorator('queryString', {
                initialValue: building.queryString,
              })(<Input minWidth="214" placeholder="请输入宿舍楼的编码或者名称" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                initialValue: building.status || '',
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
          <Col span={8}>
            <FormItem label="宿管人员">
              {getFieldDecorator('staffId', {
                initialValue: building.staffId,
              })(
                <Select style={{ minWidth: 215 }} placeholder="请选择宿管员">
                  <Option key="" value="">
                    全部
                  </Option>
                </Select>,
              )}
            </FormItem>
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
      <div className="action-box">
        <Row />
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
              添加宿舍楼
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Form.create()(CollegeSearch);
