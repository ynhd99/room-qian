import React from 'react';
import { Breadcrumb, Form } from 'antd';
import { Link } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import styles from './Bread.less';
import { queryArray } from '../../../utils';

const Bread = ({ SiderMenuList, location }) => {
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

export default Form.create()(Bread);
