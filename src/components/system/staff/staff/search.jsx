import React from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const StaffSearch = ({
  staff,
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
  return (
    <div>
      <div className="components-search">
        <Form layout="inline" onSubmit={handleSubmit}>
          <Row>
            <Col span={8}>
              <FormItem label="搜索条件">
                {getFieldDecorator('queryString', {
                  initialValue: staff.queryString,
                })(<Input minWidth="214" placeholder="请输入宿管员编号或者姓名" />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="楼号">
                {getFieldDecorator('buildingId', {
                  initialValue: staff.buildingId,
                })(
                  <Select style={{ width: '214' }} placeholder="请选择宿管员编号或者姓名">
                    <Option key="" value="">
                      全部
                    </Option>
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
        </Form>
        <div className="action-box" style={{ marginTop: '15px' }}>
          <Row />
          <Row>
            <Col span={16}>
              <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
                +新增宿管员
              </Button>
              &nbsp;&nbsp;
              <Button type="primary">-删除</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(StaffSearch);
