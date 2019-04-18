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
        <div className={styles.leftMenus} />
        <div className={styles.rightMenus}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', fontSize: '18px' }}
          >
            <Menu.Item key="1">宿舍管理</Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                userLogout();
              }}
            >
              退出
            </Menu.Item>
          </Menu>
          <div className={styles.user}>
            <div className={styles.divider} />
            <div className={styles.info}>{window.sessionStorage.getItem('fullName')}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Header;
