import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { Helmet } from 'react-helmet';
import '../themes/index.less';
import { Header, Sider, styles, Bread } from '../components/commom/Layout';
import { HeaderMenuList, SiderMenuList } from '../components/commom/Menus/menuData';
import { classnames } from '../utils';

const App = ({ children, account, location, dispatch }) => {
  const { isShow, loading } = account;
  const headerProps = {
    HeaderMenuList,
    isShow,
    userLogout() {
      console.log('我点击了退出');
      dispatch({
        type: 'account/userLogout',
        payload: {},
      });
    },
  };
  const siderProps = {
    SiderMenuList,
    isShow,
  };
  const breadProps = {
    SiderMenuList,
    loading,
    location,
  };
  return (
    <div className="container-cloud">
      <Helmet>
        <title>宿舍管理系统</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header {...headerProps} />
      <div className={classnames(styles.layout)}>
        <aside className={classnames(styles.sider)}>
          <Sider {...siderProps} />
        </aside>
        <div style={{ marginLeft: isShow ? 230 : 0 }} className={isShow ? styles.main : ''}>
          <Bread {...breadProps} />
          <div className={'iframe-container'}>
            <div className={styles.content}>
              <Card bordered={false}>{children}</Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default connect(({ account, loading }) => ({ account, loading }))(App);
