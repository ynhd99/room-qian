import React from 'react';
import { Table, Form, Col, Row, Button, Badge, Popconfirm } from 'antd';

const RoleList = ({ role, onPageChange, mergeData, updateRole, deleteRole, getAuthorityList }) => {
  const columns = [
    {
      title: '角色编码',
      dataIndex: 'roleCode',
      key: 'roleCode',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '所含员工数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
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
      render(text, record) {
        if (record.status === 0) {
          return (
            <div>
              <a
                onClick={() => {
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    classCode: record.classCode,
                  });
                  getAuthorityList({ id: record.id });
                }}
              >
                编辑 |
              </a>
              <Popconfirm
                title="你确定要停用该学院吗？"
                onConfirm={() => {
                  updateRole({ id: record.id, status: 1 });
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
                })
              }
            >
              编辑 |
            </a>
            <Popconfirm
              title="你确定要启用该学院吗？"
              onConfirm={() => {
                updateRole({ id: record.id, status: 0 });
              }}
              okText="确定"
              cancelText="取消"
            >
              <a> 启用 |</a>
            </Popconfirm>
            <Popconfirm
              title="你确定要删除该学院吗？"
              onConfirm={() => {
                deleteRole({ record });
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
    <div>
      <div className="action-box" style={{ marginTop: '15px', marginLeft: '30px' }}>
        <Row>
          <Col span={16}>
            <Button
              type="primary"
              onClick={() => {
                mergeData({ modalVisible: true, oPty: 'add' });
                getAuthorityList({ id: '' });
              }}
            >
              +新增角色
            </Button>
          </Col>
        </Row>
      </div>
      <Table
        style={{ marginTop: '15px' }}
        columns={columns}
        dataSource={role.roleList}
        pagination={role.pagination}
        // loading={role.loading}
        rowKey={record => record.id}
        onChange={onPageChange}
      />
    </div>
  );
};
export default Form.create()(RoleList);
