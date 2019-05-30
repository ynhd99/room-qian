import React from 'react';
import moment from 'moment';
import { Modal, Form, Select, Table, Row, Col, DatePicker, Input } from 'antd';

const FormItem = Form.Item;
const AddRoomModal = ({
  room,
  mergeData,
  getClassList,
  onPageChange,
  getStudentList,
  addRoomDetail,
  form: { getFieldDecorator, validateFields },
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
    validateFields((errors) => {
      if (!errors) {
        addRoomDetail();
        mergeData({
          addModalVisible: false,
          oPty: '',
          collegeId: '',
          classId: '',
          checkDate: new Date(),
          roomDetailInfoList: [],
        });
      }
    });
  };
  const onCancel = () => {
    mergeData({
      addModalVisible: false,
      oPty: '',
      collegeId: '',
      classId: '',
      checkDate: new Date(),
      roomDetailInfoList: [],
    });
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
      console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`);
      const arr = [];
      for (let i = 0; i < selectedRows.length; i += 1) {
        const object = {};
        object.studentId = selectedRows[i].id;
        object.bedCount = selectedRows[i].bedCount;
        arr[i] = object;
      }
      mergeData({ roomDetailInfoList: arr });
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(`selectedRows: ${selectedRows}`, `selected: ${selected}`);
    },
    getCheckboxProps: record => ({
      disabled: record.settleFlag === 1 ? record.settleFlag === 1 : record.bedCount === 0,
      name: record.name,
    }),
  };
  const columns = [
    {
      title: '学生编码',
      dataIndex: 'studentCode',
      width: '15%',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      width: '15%',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      width: '20%',
    },
    {
      title: '班级',
      dataIndex: 'className',
      width: '15%',
    },
    {
      title: '性别',
      dataIndex: 'studentSex',
      width: '10%',
    },
    {
      title: '床位号',
      dataIndex: 'bedCount',
      editable: true,
      width: '25%',
      render(text, record) {
        return (
          <FormItem {...formItemLayout} style={{ margin: '0' }}>
            {getFieldDecorator(`${record.id}bedCount`, {
              initialValue: record.bedCount === 0 ? '' : record.bedCount,
              rules:
                 record.settleFlag === 1 || room.roomDetailInfoList.length !== 0
                  ? ''
                  : [{ required: true, message: '床位号没选择', whitespace: true }],
                  // [{ required: true, message: '床位号没选择', whitespace: true }]
            })(
              <Input
                disabled={record.settleFlag === 1}
                placeholder="请选择床位号"
                onChange={(value) => {
                  record.bedCount = value.target.value;
                }}
              />,
            )}
          </FormItem>
        );
      },
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
                  style={{ minWidth: 100 }}
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
                  style={{ minWidth: 100 }}
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
            <FormItem
              label={
                <span>
                  <span style={{ color: 'red' }}>* </span>入住
                </span>
              }
              hasFeedback
              {...formItemLayout}
            >
              <DatePicker
                format="YYYY-MM-DD"
                value={moment(room.checkDate)}
                style={{ minWidth: 100 }}
                disabledDate={disabledDate}
                onChange={value => mergeData({ checkDate: value })}
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        style={{ marginTop: '15px' }}
        columns={columns}
        dataSource={room.studentList}
        pagination={room.pagination}
        rowKey={record => record.id}
        onChange={onPageChange}
        rowSelection={rowSelection}
      />
    </Modal>
  );
};
export default Form.create()(AddRoomModal);
