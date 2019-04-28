import React from 'react';
import { Table, Form, Col, Row, Button, Popconfirm } from 'antd';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const RoleList = ({ role, onPageChange, mergeData, deleteRole }) => {
  const columns = [
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>角色编码</span>,
      dataIndex: 'roleCode',
      key: 'roleCode',
      align: 'center',
      width: '15%',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>角色名称</span>,
      dataIndex: 'roleName',
      key: 'roleName',
      align: 'center',
      width: '25%',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>所含员工数</span>,
      dataIndex: 'count',
      key: 'count',
      align: 'center',
      width: '20%',
    },
    {
      title: <span style={{ display: 'table', margin: '0 auto' }}>操作</span>,
      dataIndex: 'action',
      align: 'center',
      width: '30%',
      render(text, record) {
        return (
          <div>
            <Permission path={INVENTORY_PERMISSION.ROLE_LIST.OPTION.code}>
              <a
                onClick={() => {
                  mergeData({
                    oPty: 'edit',
                    id: record.id,
                    modalVisible: true,
                    roleName: record.roleName,
                    roleCode: record.roleCode,
                    selectedKeys: record.nodeIdList,
                  });
                }}
              >
                编辑 |
              </a>
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
            </Permission>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="action-box" style={{ marginTop: '15px', marginLeft: '30px' }}>
        <Permission path={INVENTORY_PERMISSION.ROLE_LIST.ADD.code}>
          <Row>
            <Col span={16}>
              <Button
                type="primary"
                onClick={() => {
                  mergeData({
                    modalVisible: true,
                    oPty: 'add',
                    roleName: '',
                    roleCode: '',
                    selectedKeys: [],
                  });
                }}
              >
                +新增角色
              </Button>
            </Col>
          </Row>
        </Permission>
      </div>
      <Table
        style={{ marginTop: '15px' }}
        columns={columns}
        dataSource={role.roleList}
        size="middle"
        pagination={role.pagination}
        // loading={role.loading}
        rowKey={record => record.id}
        onChange={onPageChange}
      />
    </div>
  );
};
export default Form.create()(RoleList);
