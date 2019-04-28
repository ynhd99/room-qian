import React from 'react';
import { Table, Form, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../../commom/Permission/systemPermission';
import Permission from '../../../commom/Permission/Permission';

const TeacherList = ({ mergeData, teacher, onPageChange, getDataList, deleteTeacher }) => {
  const columns = [
    {
      title: '辅导员编号',
      dataIndex: 'teacherCode',
      key: 'teacherCode',
      width: '15%',
    },
    {
      title: '辅导员姓名',
      dataIndex: 'teacherName',
      key: 'teacherName',
      width: '15%',
    },
    {
      title: '手机号',
      dataIndex: 'teacherPhone',
      key: 'teacherPhone',
      width: '20%',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
      width: '20%',
    },
    {
      title: '性别',
      dataIndex: 'teacherSex',
      key: 'teacherSex',
      width: '10%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '20%',
      render(text, record) {
        return (
          <div>
            <Permission path={INVENTORY_PERMISSION.ACCOUNT_LIST.OPTION.code}>
              <a
                onClick={() => {
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    teacherCode: record.teacherCode,
                    teacherName: record.teacherName,
                    teacherPhone: record.teacherPhone,
                    teacherSex: record.teacherSex === '女' ? '2' : '1',
                    roleId: record.roleId,
                    collegeId: record.collegeId,
                  });
                  getDataList();
                }}
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要删除该学生吗？"
                onConfirm={() => {
                  deleteTeacher({ id: record.id });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 删除</a>
              </Popconfirm>
            </Permission>
          </div>
        );
      },
    },
  ];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`);
      if (selectedRowKeys[0]) {
        mergeData({ deleteTeacherList: selectedRowKeys, buttonStatus: false });
      } else {
        mergeData({ buttonStatus: true });
      }
    },
  };
  return (
    <Table
      style={{ marginTop: '15px' }}
      columns={columns}
      dataSource={teacher.teacherList}
      pagination={teacher.pagination}
      // loading={staff.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
      rowSelection={rowSelection}
    />
  );
};
export default Form.create()(TeacherList);
