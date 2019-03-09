import React from 'react';
import { Table, Form, Col, Row, Button } from 'antd';

const RoleList = ({ role, onPageChange, mergeData }) => {
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
      dataIndex: 'roleNumber',
      key: 'roleNumber',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      dataIndex: 'action',
    },
  ];
  return (
    <div>
      <div className="action-box" style={{ marginTop: '15px', marginLeft: '30px' }}>
        <Row>
          <Col span={16}>
            <Button type="primary" onClick={() => mergeData({ modalVisible: true })}>
              +新增角色
            </Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={''}>
              停用
            </Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={''}>
              启用
            </Button>
            &nbsp;&nbsp;
            <Button type="primary" onClick={''}>
              删除
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
