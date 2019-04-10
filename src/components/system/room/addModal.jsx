import React from 'react';
import moment from 'moment';
import { Modal, Form, Select, Table, Row, Col, DatePicker } from 'antd';

const FormItem = Form.Item;
const AddRoomModal = ({
  room,
  mergeData,
  getClassList,
  onPageChange,
  getStudentList,
  addRoomDetail,
  form: { getFieldDecorator },
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
    room.classList &&
    room.classList.map(c => (
      <Select.Option value={c.id} key={c.id} queryString={`${c.className} | ${c.classCode}`}>
        {c.className} | {c.classCode}
      </Select.Option>
    ));
  const collegeOptions =
    room.collegeList &&
    room.collegeList.map(college => (
      <Select.Option
        value={college.id}
        key={college.id}
        queryString={`${college.collegeName} | ${college.collegeCode}`}
      >
        {college.collegeName} | {college.collegeCode}
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
  const handleOk = () => {
    addRoomDetail();
    mergeData({ addModalVisible: false, oPty: '', collegeId: '', classId: '', checkDate: '' });
  };
  const onCancel = () => {
    mergeData({ addModalVisible: false, oPty: '', collegeId: '', classId: '', checkDate: '' });
  };
  const modalOpts = {
    width: '1000',
    title: '新增学生',
    visible: room.addModalVisible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
    destroyOnClose: true,
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const arr = [];
      for (let i = 0; i < selectedRowKeys.length; i += 1) {
        const object = {};
        object.studentId = selectedRowKeys[i];
        arr[i] = object;
      }
      mergeData({ roomDetailInfoList: arr });
    },
    getCheckboxProps: record => ({
      disabled: record.settleFlag === 1,
      name: record.name,
    }),
  };

  const columns = [
    {
      title: '学生编码',
      dataIndex: 'studentCode',
      width: '30%',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
    },
    {
      title: '班级',
      dataIndex: 'className',
    },
    {
      title: '性别',
      dataIndex: 'studentSex',
    },
  ];
  function disabledDate(current) {
    return current && current <= moment().endOf('day');
  }
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <Row>
          <Col span={8}>
            <FormItem {...formItemLayout} label="学院">
              {getFieldDecorator('collegeId', {
                initialValue: room.collegeId === '' ? '请选择学院' : room.collegeId,
              })(
                <Select
                  style={{ minWidth: 150 }}
                  value={room.collegeId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    console.log('我改变学院了');
                    mergeData({ collegeId: value, classId: '' });
                    getClassList();
                    getStudentList();
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
                initialValue: room.classId === '' ? '请选择班级' : room.classId,
              })(
                <Select
                  style={{ minWidth: 150 }}
                  value={room.classId === '' ? '请选择班级' : room.classId}
                  showSearch
                  filterOption={filterOption}
                  onChange={(value) => {
                    mergeData({ classId: value });
                    getStudentList();
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
            <FormItem label="入住日期" hasFeedback {...formItemLayout}>
              {getFieldDecorator('checkDate', {
                initialValue: room.checkDate || '',
                // rules: [{ required: true, message: '维修日期未选择', whitespace: true }],
              })(
                <DatePicker
                  format="YYYY-MM-DD"
                  // value={repair.repairDate}
                  disabledDate={disabledDate}
                  onChange={value => mergeData({ checkDate: value })}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        style={{ marginTop: '15px' }}
        columns={columns}
        dataSource={room.studentList}
        pagination={room.pagination}
        // loading={staff.loading}
        rowKey={record => record.id}
        onChange={onPageChange}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};
export default Form.create()(AddRoomModal);
