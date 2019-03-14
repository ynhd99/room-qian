import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';

const ClassList = ({ mergeData, classRoom, onPageChange, deleteClass, updateStatus }) => {
  const columns = [
    {
      title: '班级代码',
      dataIndex: 'classCode',
      key: 'classCode',
      width: '20%',
    },
    {
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
      width: '20%',
    },
    {
      title: '学院',
      dataIndex: 'collegeName',
      key: 'collegeName',
      width: '20%',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '20%',
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
      width: '20%',
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <a
                onClick={() =>
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    classCode: record.classCode,
                  })
                }
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要停用该学院吗？"
                onConfirm={() => {
                  updateStatus({ id: record.id, status: 1 });
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
            <a
              onClick={() =>
                mergeData({
                  oPty: 'edit',
                  id: record.id,
                  modalVisible: true,
                  classCode: record.classCode,
                })
              }
            >
              编辑 |
            </a>
            <Popconfirm
              title="你确定要启用该学院吗？"
              onConfirm={() => {
                updateStatus({ id: record.id, status: 0 });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a> 启用 |</a>
            </Popconfirm>
            <Popconfirm
              title="你确定要删除该学院吗？"
              onConfirm={() => {
                deleteClass({ record });
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
      dataSource={classRoom.classList}
      pagination={classRoom.pagination}
      loading={classRoom.loading}
      rowKey={record => record.id}
      onChange={onPageChange}
    />
  );
};
export default Form.create()(ClassList);
