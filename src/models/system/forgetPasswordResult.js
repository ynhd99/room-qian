import { routerRedux } from 'dva/router';

export default {
  namespace: 'forgetPasswordResult',
  state: {
    count: 3,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/book/forgetPasswordResult') {
          let count = 3;
          const account = setInterval(() => {
            count -= 1;
            dispatch({
              type: 'updateState',
              payload: {
                count,
              },
            });
            if (count === 0) {
              clearInterval(account);
              dispatch({
                type: 'goMain',
              });
              dispatch({
                type: 'updateState',
                payload: {
                  count: 3,
                },
              });
            }
          }, 1000);
        }
      });
    },
  },
  effects: {
    * goMain(payload, { put }) {
      yield put(routerRedux.push('/system/book/home'));
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
  },
};
