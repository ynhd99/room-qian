import React from 'react';
import { Table, Form, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../../commom/Permission/systemPermission';
import Permission from '../../../commom/Permission/Permission';

const StudentList = ({ mergeData, student, onPageChange, getDataList, deleteStudent }) => {
  const column = [
    {
      title: '学号',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: '15%',
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName',
      width: '15%',
    },
    {
      title: '手机号',
      dataIndex: 'studentPhone',
      key: 'studentPhone',
      width: '20%',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
      width: '20%',
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
      width: '15%',
    },
  ];
  const columns = [
    {
      title: '学号',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: '15%',
    },
    {
      title: '学生姓名',
      dataIndex: 'studentName',
      key: 'studentName',
      width: '15%',
    },
    {
      title: '手机号',
      dataIndex: 'studentPhone',
      key: 'studentPhone',
      width: '15%',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
      width: '20%',
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
      width: '10%',
    },
    {
      title: '性别',
      dataIndex: 'studentSex',
      key: 'studentSex',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '15%',
      render(text, record) {
        return (
          <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.OPTION.code}>
            <div>
              <a
                onClick={() => {
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    studentCode: record.studentCode,
                    studentName: record.studentName,
                    studentPhone: record.studentPhone,
                    classId: record.classId,
                    studentSex: record.studentSex === '女' ? '2' : '1',
                    collegeId: record.collegeId,
                    roleId: record.roleId,
                  });
                  getDataList();
                }}
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要删除该学生吗？"
                onConfirm={() => {
                  deleteStudent({ id: record.id });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 删除</a>
              </Popconfirm>
            </div>
          </Permission>
        );
      },
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`);
      if (selectedRowKeys[0]) {
        mergeData({ deleteStudentList: selectedRowKeys, buttonStatus: false });
      } else {
        mergeData({ buttonStatus: true });
      }
    },
  };
  return (
    <div>
      <Table
        style={{ marginTop: '15px' }}
        columns={columns}
        dataSource={student.studentList}
        pagination={student.pagination}
        rowKey={record => record.id}
        onChange={onPageChange}
        rowSelection={rowSelection}
      />
    </div>
  );
};
export default Form.create()(StudentList);
