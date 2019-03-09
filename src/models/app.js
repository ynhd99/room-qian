import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { getSession } from '../utils/index';
import { userLogout } from '../services/app';
import { message } from 'antd';

export default {
  namespace: 'account',
  state: {
    darkTheme: false, // 风格定为深色
    isShow: false,
    user: {
      userName: getSession('userName') || '',
    },
    isLogin: false,
  },
  effects: {
    * userLogout({ payload }, { put, call }) {
      const res = yield call(userLogout, { ...parse(payload) });
      const { code } = res.data;
      if (code === '304') {
        window.sessionStorage.removeItem('token');
        const path = '/system/book/home';
        yield put(routerRedux.push(path));
      } else {
        message.error('退出失败');
      }
    },
  },
  reducers: {
    mergeData(state, action) {
      return { ...state, ...action.payload };
    },
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/book/home') {
          dispatch({
            type: 'mergeData',
            payload: {
              isShow: false,
            },
          });
          return;
        }
        if (location.pathname === '/system/book/forgetPassword') {
          dispatch({
            type: 'mergeData',
            payload: {
              isShow: false,
            },
          });
          return;
        }
        if (location.pathname === '/system/book/registerResult') {
          dispatch({
            type: 'mergeData',
            payload: {
              isShow: false,
            },
          });
          return;
        }
        if (location.pathname === '/system/book/forgetPasswordResult') {
          dispatch({
            type: 'mergeData',
            payload: {
              isShow: false,
            },
          });
          return;
        }
        if (location.pathname === '/system/book/register') {
          console.log('我不相信');
          dispatch({
            type: 'mergeData',
            payload: {
              isShow: false,
            },
          });
          return;
        }
        if (location.pathname != '/system/book/home') {
          console.log('应该不会变true');
          dispatch({
            type: 'mergeData',
            payload: {
              isShow: true,
            },
          });
        }
      });
    },
  },
};
