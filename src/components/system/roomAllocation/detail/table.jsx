import React from 'react';
import { Table, Popconfirm } from 'antd';

const DetailTable = ({ allocationDetail, handleDelete }) => {
  if (allocationDetail.pageType === 'add' || allocationDetail.pageType === 'edit') {
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
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          detail.dataSource.length >= 1 ? (
            <Popconfirm title="您确定要删除吗?" onConfirm={() => handleDelete(record.key)}>
              删除
            </Popconfirm>
          ) : null,
      },
    ];
  } else if (allocationDetail.pageType === 'view') {
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
  }
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
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) =>
        allocationDetail.dataSource.length >= 1 ? (
          <Popconfirm title="您确定要删除吗?" onConfirm={() => handleDelete(record.key)}>
            删除
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <div>
      <Table
        dataSource={allocationDetail.dataList}
        columns={columns}
        pagination={false}
        rowKey={record => record.id}
      />
    </div>
  );
};

export default DetailTable;
