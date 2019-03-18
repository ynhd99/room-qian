import React from 'react';
import { Table, Form, Popconfirm } from 'antd';

const StaffList = ({ mergeData, staff, onPageChange, deleteStaff, getRoleList }) => {
  const columns = [
    {
      title: '宿管员编号',
      dataIndex: 'staffCode',
      key: 'staffCode',
      width: '20%',
    },
    {
      title: '宿管员姓名',
      dataIndex: 'staffName',
      key: 'staffName',
      width: '20%',
    },
    {
      title: '手机号',
      dataIndex: 'staffPhone',
      key: 'staffPhone',
      width: '20%',
    },
    {
      title: '性别',
      dataIndex: 'staffSex',
      key: 'staffSex',
      width: '20%',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '20%',
      render(text, record) {
        return (
          <div>
            <a
              onClick={() => {
                mergeData({
                  oPty: 'edit',
                  id: record.id,
                  modalVisible: true,
                  staffCode: record.staffCode,
                  staffName: record.staffName,
                  staffPhone: record.staffPhone,
                  staffSex: record.staffSex === '女' ? '2' : '1',
                  roleId: record.roleId,
                });
                getRoleList();
              }}
            >
              编辑 |
            </a>
            <Popconfirm
              title="你确定要删除该学生吗？"
              onConfirm={() => {
                deleteStaff({ id: record.id, status: 1 });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a> 删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <Table
      style={{ marginTop: '15px' }}
      columns={columns}
      dataSource={staff.staffList}
      pagination={staff.pagination}
      // loading={staff.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(StaffList);
