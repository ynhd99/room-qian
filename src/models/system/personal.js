import { message } from 'antd';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import { getForgetPass } from '../../services/system/forgetPassword';

export default {
  namespace: 'personal',
  state: {
    loading: false,
    count: 0,
    prefix: '',
    phoneNumber: '',
    allowSubmit: false,
  },
  subscriptions: {},
  effects: {
    * forgetPassword({ payload }, { put, call }) {
      yield put({ type: 'showLoading' });
      console.log(payload);
      const res = yield call(getForgetPass, parse(payload));
      console.log(payload);
      const { code } = res.data;
      if (code === '200') {
        yield put(routerRedux.push('/system/book/forgetPasswordResult'));
      } else {
        message.warning(`操作失败，请参考：${res.data.errorInfo}`);
      }
      yield put({ type: 'hideLoading' });
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
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    showModal(state) {
      return { ...state, modalVisible: true };
    },
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
};
