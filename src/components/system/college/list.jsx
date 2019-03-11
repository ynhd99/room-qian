import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';

const CollegeList = ({ mergeData, college, onPageChange, showModal, updateStatus }) => {
  const columns = [
    {
      title: '学院代码',
      dataIndex: 'collegeCode',
      key: 'collegeCode',
    },
    {
      title: '学院名称',
      dataIndex: 'collegeName',
      key: 'collegeName',
    },
    {
      title: '分类状态',
      dataIndex: 'status',
      width: 100,
      render(text, record) {
        if (record.parentId === '-1') {
          return null;
        }
        if (record.status === 0) {
          return <Badge status="success" text="启用" />;
        }
        return <Badge status="error" text="停用" />;
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '200',
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <a onClick={() => showModal('edit', record)}>编辑 |</a>
              <Popconfirm
                title="你确定要停用改学院吗？"
                onConfirm={() => {
                  updateStatus({ record, status: 1 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 停用</a>
              </Popconfirm>
            </div>
          );
        }
        return (
          <div>
            <a onClick={() => showModal('edit', record)}>编辑 |</a>
            <Popconfirm
              title="你确定要启用改学院吗？"
              onConfirm={() => {
                updateStatus({ record, status: 1 });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a> 启用 |</a>
            </Popconfirm>
            <Popconfirm
              title="你确定要删除改学院吗？"
              onConfirm={() => {
                updateStatus({ record, status: 1 });
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
      dataSource={college.collegeList}
      pagination={college.pagination}
      // loading={college.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(CollegeList);
