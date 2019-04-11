import { message } from 'antd';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import getLogin from '../../services/system/home';

export default {
  namespace: 'home',
  state: {
    loading: false,
    params: null,
    authorityList: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/book/home') {
          window.login = (data) => {
            dispatch({
              type: 'login',
              payload: {
                ...data,
              },
            });
          };
          window.toRegister = () => {
            dispatch(routerRedux.push('/system/book/register'));
          };
          window.toForget = () => {
            dispatch(routerRedux.push('/system/book/forgetPassword'));
          };
        }
      });
    },
  },
  effects: {
    * login({ payload }, { put, call }) {
      const res = yield call(getLogin, { ...parse(payload) });
      const { code } = res.data;
      if (code === '200') {
        window.sessionStorage.setItem('token', res.data.data.sessionId);
        const path = '/system/room/record';
        yield put(routerRedux.push(path));
        yield put({
          type: 'mergeData',
          payload: {
            authorityList: res.data.data.authority,
          },
        });
      } else {
        console.log(res.data.errorInfo);
        message.error(res.data.errorInfo);
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    updateState(state, payload) {
      return { ...state, ...payload };
    },
    mergeData(state, action) {
      console.log(`ahhahahah${action.payload.authorityList[0]}`);
      return { ...state, ...action.payload };
    },
  },
};
