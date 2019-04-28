import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const ClassList = ({ mergeData, classRoom, onPageChange, deleteClass, updateStatus }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>班级代码</span>,
      dataIndex: 'classCode',
      key: 'classCode',
      width: '15%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>班级名称</span>,
      dataIndex: 'className',
      key: 'className',
      width: '20%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>所属学院</span>,
      dataIndex: 'collegeName',
      key: 'collegeName',
      width: '20%',
      align: 'center',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>状态</span>,
      dataIndex: 'status',
      width: '20%',
      align: 'center',
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
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      width: '25%',
      align: 'center',
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.CLASS_LIST.OPTION.code}>
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
              </Permission>
            </div>
          );
        }
        return (
          <div>
            <Permission path={INVENTORY_PERMISSION.CLASS_LIST.OPTION.code}>
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
            </Permission>
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
