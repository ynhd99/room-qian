import React from 'react';
import { Form, Input, Row, Col, Button, Select, DatePicker } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const AllocationSearch = ({ mergeData, form: { getFieldDecorator }, allocation }) => {
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
                initialValue: allocation.buildingId,
              })(<Select style={{ minWidth: 215 }} placeholder="请选择楼号" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="宿舍号">
              {getFieldDecorator('roomId', {
                initialValue: allocation.roomId,
              })(<Select style={{ minWidth: 215 }} placeholder="请选择宿舍号" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: allocation.collegeId,
              })(<Select style={{ minWidth: 215 }} placeholder="请选择学院" />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="班级">
              {getFieldDecorator('classId', {
                initialValue: allocation.classId,
              })(<Select style={{ minWidth: 215 }} placeholder="请选择班级" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="学号">
              {getFieldDecorator('staffCode', {
                initialValue: allocation.staffCode || '',
              })(<Input style={{ minWidth: 215 }} placeholder="请输入学号" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="姓名">
              {getFieldDecorator('staffName', {
                initialValue: allocation.staffName || '',
              })(<Input style={{ minWidth: 215 }} placeholder="请输入姓名" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Form.Item label="操作日期">
              <DatePicker style={{ minWidth: 215 }} />
            </Form.Item>
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
    </div>
  );
};
export default Form.create()(AllocationSearch);
