import React from 'react';
import { Form, Input, Row, Col, Button, Select, DatePicker } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const AllocationSearch = ({
  mergeData,
  form: { getFieldDecorator },
  allocation,
  searchAction,
  getClassList,
  getRoomList,
}) => {
  const filterOption = (inputValue, option) => {
    const props = option.props;
    const qs = props.queryString;
    const reg = new RegExp(inputValue, 'i');
    if (typeof props.children === 'string') {
      return false;
    }
    if (qs && reg.test(qs)) {
      return true;
    }
    return false;
  };
  const classOptions =
    allocation.classList &&
    allocation.classList.map(c => (
      <Select.Option value={c.id} key={c.id} queryString={`${c.className} | ${c.classCode}`}>
        {c.className} | {c.classCode}
      </Select.Option>
    ));
  const collegeOptions =
    allocation.collegeList &&
    allocation.collegeList.map(college => (
      <Select.Option
        value={college.id}
        key={college.id}
        queryString={`${college.collegeName} | ${college.collegeCode}`}
      >
        {college.collegeName} | {college.collegeCode}
      </Select.Option>
    ));
  const buildingOperation =
    allocation.buildingList &&
    allocation.buildingList.map(building => (
      <Select.Option
        value={building.id}
        key={building.id}
        queryString={`${building.buildingName} | ${building.buildingCode}`}
      >
        {building.buildingName} | {building.buildingCode}
      </Select.Option>
    ));
  const roomOperation =
    allocation.roomList &&
    allocation.roomList.map(room => (
      <Select.Option value={room.id} key={room.id} queryString={`${room.roomCode}`}>
        {room.roomCode}
      </Select.Option>
    ));
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
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
            <FormItem label="楼号" hasFeedback {...formItemLayout}>
              <Select
                style={{ minWidth: 215 }}
                showSearch
                value={allocation.buildingId}
                filterOption={filterOption}
                onChange={(value) => {
                  mergeData({ buildingId: value });
                  getRoomList();
                  searchAction();
                }}
                placeholder="请选择所属楼号"
              >
                <Select.Option value="" key="">
                  全部
                </Select.Option>
                {buildingOperation}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="宿舍号" hasFeedback {...formItemLayout}>
              <Select
                style={{ minWidth: 215 }}
                showSearch
                value={allocation.roomId}
                filterOption={filterOption}
                onChange={(value) => {
                  mergeData({ roomId: value });
                  searchAction();
                }}
                placeholder="请选择宿舍号"
              >
                <Select.Option value="" key="">
                  全部
                </Select.Option>
                {roomOperation}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="学院" hasFeedback {...formItemLayout}>
              <Select
                style={{ minWidth: 215 }}
                showSearch
                value={allocation.collegeId}
                filterOption={filterOption}
                onChange={(value) => {
                  mergeData({ collegeId: value });
                  getClassList();
                  searchAction();
                }}
                placeholder="请选择学生学院"
              >
                <Select.Option value="" key="">
                  全部
                </Select.Option>
                {collegeOptions}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="班级">
              <Select
                style={{ minWidth: 215 }}
                value={allocation.classId}
                showSearch
                filterOption={filterOption}
                onChange={(value) => {
                  mergeData({ classId: value });
                  searchAction();
                }}
                placeholder="请选择学生班级"
                defaultActiveFirstOption
              >
                <Select.Option value="" key="">
                  全部
                </Select.Option>
                {classOptions}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <Form.Item label="学号">
              {getFieldDecorator('studentCode', {
                initialValue: allocation.studentCode || '',
              })(
                <Input
                  style={{ minWidth: 215 }}
                  placeholder="请输入学生学号"
                  onChange={(value) => {
                    mergeData({ studentCode: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="姓名">
              {getFieldDecorator('studentName', {
                initialValue: allocation.studentName || '',
              })(
                <Input
                  style={{ minWidth: 215 }}
                  placeholder="请输入学生姓名"
                  onChange={(value) => {
                    mergeData({ studentName: value.target.value });
                    searchAction();
                  }}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <FormItem label="入住日期" hasFeedback {...formItemLayout}>
              <DatePicker
                format="YYYY-MM-DD"
                style={{ minWidth: 265 }}
                onChange={(value) => {
                  mergeData({ checkDate: value });
                  searchAction();
                }}
              />
            </FormItem>
          </Col>
          <Col span={4} />
          <Col span={4}>
            <FormItem className="search-input" {...formItemLayout1}>
              <Button
                htmlType="submit"
                onClick={() => {
                  mergeData({
                    buildingId: '',
                    roomId: '',
                    collegeId: '',
                    classId: '',
                    studentCode: '',
                    studentName: '',
                    checkDate: '',
                  });
                  searchAction();
                }}
              >
                重置
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Form.create()(AllocationSearch);
