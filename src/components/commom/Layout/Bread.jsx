import React from 'react';
import { connect } from 'dva';
import { Breadcrumb, Button, Col } from 'antd';
import pathToRegexp from 'path-to-regexp';
import styles from './Bread.less';
import INVENTORY_PERMISSION from '../../commom/Permission/systemPermission';
import Permission from '../../commom/Permission/Permission';

const Bread = ({ SiderMenuList, location, dispatch }) => {
  const mergeData = (payload) => {
    dispatch({
      type: 'record/mergeData',
      payload,
    });
  };
  // 匹配当前路由
  const pathArray = [];
  let current;
  SiderMenuList.map((item) => {
    item.items.map((i) => {
      if (i.key && pathToRegexp(i.key).exec(location.pathname)) {
        current = i;
      }
      return current;
    });
    return null;
  });
  const getPathArray = (item) => {
    pathArray.unshift(item);
  };
  getPathArray(current);
  if (current != null) {
    // 递归查找父级
    const breads = pathArray.map((item) => {
      const content = <span>{item.name}</span>;
      if (item.key === '/system/room/record') {
        return (
          <Breadcrumb.Item>
            <Col span={8}>{content}</Col>
            <Col span={4} />
            <Col span={4} />
            <Col span={2} />
            <Col span={2} />
            <Col span={2} />
            {/* <Permission path={INVENTORY_PERMISSION.RECORD_LIST.ADD.code}> */}
            <Button
              type="primary"
              onClick={() =>
                mergeData({ oPty: 'add', id: '', modalVisible: true, title: '', content: '' })
              }
            >
              新增公告
            </Button>
            {/* </Permission> */}
          </Breadcrumb.Item>
        );
      }
      return <Breadcrumb.Item>{content}</Breadcrumb.Item>;
    });

    return (
      <div className={styles.bread}>
        <Breadcrumb separator=">">{breads}</Breadcrumb>
      </div>
    );
  }
  return null;
};
function mapStateToProps({ record }) {
  return { record };
}
export default connect(mapStateToProps)(Bread);
