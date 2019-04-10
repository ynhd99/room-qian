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
              {getFieldDecorator('buildingId', {
                initialValue: allocation.buildingId === '' ? '请选择楼号' : allocation.buildingId,
                // rules: [{ required: true, message: '宿舍楼号未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ buildingId: value });
                    getRoomList();
                    searchAction();
                  }}
                  placeholder="请选择所属楼号"
                >
                  {buildingOperation}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="宿舍号" hasFeedback {...formItemLayout}>
              {getFieldDecorator('roomId', {
                initialValue: allocation.roomId === '' ? '请选择宿舍号' : allocation.roomId,
                // rules: [{ required: true, message: '宿舍号未选择', whitespace: true }],
              })(
                <Select
                  style={{ minWidth: 215 }}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ roomId: value });
                    searchAction();
                  }}
                  placeholder="请选择宿舍号"
                >
                  {roomOperation}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: allocation.collegeId === '' ? '请选择学院' : allocation.collegeId,
              })(
                <Select
                  style={{ minWidth: 150 }}
                  value={allocation.collegeId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ collegeId: value, classId: '' });
                    getClassList();
                    searchAction();
                  }}
                  placeholder="请选择学院"
                >
                  {collegeOptions}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem {...formItemLayout} label="班级">
              {getFieldDecorator('classId', {
                initialValue: allocation.classId === '' ? '请选择班级' : allocation.classId,
              })(
                <Select
                  style={{ minWidth: 150 }}
                  value={allocation.classId === '' ? '请选择班级' : allocation.classId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ classId: value });
                    searchAction();
                  }}
                  placeholder="请选择班级"
                  defaultActiveFirstOption
                >
                  {classOptions}
                </Select>,
              )}
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
              {getFieldDecorator('checkDate', {
                initialValue: allocation.checkDate || '',
                // rules: [{ required: true, message: '维修日期未选择', whitespace: true }],
              })(
                <DatePicker
                  format="YYYY-MM-DD"
                  // value={repair.repairDate}
                  // disabledDate={disabledDate}
                  onChange={(value) => {
                    mergeData({ checkDate: value });
                    searchAction();
                  }}
                />,
              )}
            </FormItem>
          </Col>
          <Col span={4} />
          <Col span={4}>
            <FormItem className="search-input" {...formItemLayout1}>
              <Button htmlType="submit">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Form.create()(AllocationSearch);
