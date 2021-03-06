import React from 'react';
import { Table, Form, Badge, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const CateList = ({ roomCate, showModal, updateStatus, deleteRoomCate }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>分类名称</span>,
      dataIndex: 'cateName',
      key: 'cateName',
      align: 'center',
      width: '10%',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>分类编码</span>,
      dataIndex: 'cateCode',
      key: 'cateCode',
      align: 'center',
      width: '20%',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>分类描述</span>,
      dataIndex: 'cateDesc',
      key: 'cateDesc',
      align: 'center',
      width: '30%',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>分类状态</span>,
      dataIndex: 'status',
      width: '15%',
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
      width: '25%',
      align: 'center',
      render(text, record) {
        if (record.parentId === '-1') {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.ROOMCATE_LIST.OPTION.code}>
                <a onClick={() => showModal('edit', record)}>编辑 |</a>
                <span className="ant-divider" />
                <Popconfirm
                  title="删除主类，将删除主类下的子类，确定要删除吗？"
                  onConfirm={() => {
                    deleteRoomCate({ id:record.id,parentId:record.parentId });
                  }}
                  okText="确定"
                  cancelText="取消"
                >
                  <a> 删除</a>
                </Popconfirm>
              </Permission>
            </div>
          );
        }
        if (record.status === 0) {
          return (
            <div>
              <Permission path={INVENTORY_PERMISSION.ROOMCATE_LIST.OPTION.code}>
                <a onClick={() => showModal('edit', record)}>编辑 |</a>
                <span className="ant-divider" />
                <Popconfirm
                  title="您确定停用此分类吗？"
                  onConfirm={() => {
                    updateStatus({ id:record.id, status: 1 });
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
        if (record.status === 1) {
          return (
            <div>
              <a onClick={() => showModal('edit', record)}>编辑 |</a>
              <Popconfirm
                title="您确定启用此分类吗？"
                onConfirm={() => {
                  updateStatus({ id:record.id, status: 0 });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 启用 |</a>
              </Popconfirm>
              <span className="antd-divider" />
              <Popconfirm
                title="您确定删除此分类吗？"
                onConfirm={() => {
                  deleteRoomCate({ id:record.id,parentId:record.parentId });
                }}
                okText="确定"
                cancelText="取消"
              >
                <a> 删除</a>
              </Popconfirm>
            </div>
          );
        }
      },
    },
  ];
  return (
    <Table
      style={{ marginTop: '15px' }}
      dataSource={roomCate.cateList}
      columns={columns}
      loading={roomCate.loading}
      rowKey={record => record.id}
      defaultExpandAllRows
      pagination={false}
    />
  );
};
export default Form.create()(CateList);
