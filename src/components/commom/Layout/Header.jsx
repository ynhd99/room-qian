import { Link } from 'dva/router';
import React from 'react';
import { Menu } from 'antd';
import styles from './Header.less';

const Header = ({ isShow, userLogout }) => {
  if (isShow) {
    return (
      <div className={styles.header}>
        <div className={styles.leftLogo}>
          <img src="./images/logo.png" alt="logo" />
        </div>
        <div className={styles.leftMenus}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">供应链</Menu.Item>
            <Menu.Item key="2">个人中心</Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                userLogout();
              }}
            >
              退出
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.rightMenus} />
      </div>
    );
  }
  return null;
};

export default Header;
