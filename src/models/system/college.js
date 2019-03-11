import { message } from 'antd';
import { parse } from 'qs';
import { getList, add } from '../../services/system/college';

export default {
  namespace: 'college',
  state: {
    loading: false,
    collegeList: [],
    modalVisable: false,
    status: '',
    // 学院名称
    collegeName: '',
    // 学院代码
    collegeCode: '',
    queryString: '',
    // 分页
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '50', '100'],
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/room/college') {
          dispatch({
            type: 'getList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * add({ payload }, { select, call, put }) {
      const res = yield call(add, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { queryString, pagination } = yield select(state => state.college);
      payload.queryString = queryString;
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getList, { ...parse(payload) });
      console.log('我可以获取学院列表了');
      if (res.data.code === '200') {
        console.log(`我获取成功了${res.data.data}`);
        yield put({
          type: 'mergeData',
          payload: {
            collegeList: res.data.data.list,
            pagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              total: res.data.data.total,
              current: res.data.data.pageNum,
              showTotal: total => `共 ${total} 条`,
              pageSize: res.data.data.pageSize,
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.error(res.data.errorInfo);
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
    updateState(state, payload) {
      return { ...state, ...payload };
    },
    mergeData(state, action) {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
};
