import React from 'react';
import { connect } from 'dva';
import { Avatar, Row, Col } from 'antd';
import styles from '../../common/register.less';

const Personal = ({ home }) => {
  const code = 1;
  return (
    <div style={{ position: 'relation' }}>
      <div style={{ textAlign: 'left', position: 'absolute', marginLeft: '10%', marginTop: '8%' }}>
        <Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          style={{ width: '20%', height: '20%' }}
          icon="user"
        />
      </div>
      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          marginLeft: '30%',
          marginTop: '5%',
          width: '50%',
        }}
      >
        <Row style={{ marginTop: '10%' }}>
          <Col span={8}>
            <span>编号：{home.userInfo.code}</span>
          </Col>
          <Col span={8}>
            <span>姓名：{home.userInfo.name}</span>
          </Col>
          <Col span={8}>
            <span>角色：{home.userInfo.roleName}</span>
          </Col>
        </Row>
        <Row style={{ marginTop: '10%' }}>
          <Col span={8}>
            <span>性别：{home.userInfo.sex}</span>
          </Col>
          <Col span={8}>
            <span>手机号：{home.userInfo.phone}</span>
          </Col>
          <Col span={8}>
            <span>学院：{home.userInfo.collegeName}</span>
          </Col>
        </Row>
        <Row style={{ marginTop: '10%' }}>
          <Col span={8}>
            <span>班级：{home.userInfo.className}</span>
          </Col>
        </Row>
      </div>
    </div>
  );
};

function mapStateToProps({ home }) {
  return { home };
}
export default connect(mapStateToProps)(Personal);
