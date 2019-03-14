import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const StudentSearch = ({
  student,
  mergeData,
  onSubmitInfo,
  form: { getFieldDecorator, validateFields },
}) => {
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
            <Col span={16}>
              <FormItem label="搜索条件">
                {getFieldDecorator('queryString', {
                  initialValue: student.queryString,
                })(<Input width="260" placeholder="请输入学生的编号或者姓名" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div className="action-box" style={{ marginTop: '15px' }}>
          <Row />
          <Row>
            <Col span={16}>
              <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
                +新增学生
              </Button>
              &nbsp;&nbsp;
              <Button type="primary">删除</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Form.create()(StudentSearch);
