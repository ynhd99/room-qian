import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React from 'react';
import { Router } from 'dva/router';
import App from './routes/App';

function RouterConfig({ history, routes, dispatch }) {
  const router = [
    {
      path: '/',
      name: 'app',
      component: App,
      indexRoute: {
        onEnter: (nextState, replace) => replace('/system/book/home'),
      },
      childRoutes: routes,
    },
  ];
  return (
    <LocaleProvider locale={zhCN}>
      <Router history={history} routes={router} />
    </LocaleProvider>
  );
}
export default connect()(RouterConfig);
