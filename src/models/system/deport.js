import { parse } from 'qs';
import { message } from 'antd';
import {
  addDeport,
  getDeportList,
  updateStatus,
  deleteDeport,
  updateDeport,
} from '../../services/system/deport';

export default {
  namespace: 'deport',
  state: {
    id: '',
    status: '',
    loading: false,
    deportList: [],
    modalVisible: false,
    title: '',
    deportName: '',
    deportCode: '',
    queryString: '',
    oPty: '',
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
        if (location.pathname === '/system/book/deport') {
          console.log('物品开始拉');
          dispatch({
            type: 'getDeportList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * addDeport({ payload }, { put, call }) {
      console.log(payload);
      const res = yield call(addDeport, { ...parse(payload) });
      const { code } = res.data;
      if (code === '200') {
        // 新增成功后获取列表
        message.info('新增成功');
        yield put({
          type: 'getDeportList',
          payload: {},
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateDeport({ payload }, { put, call, select }) {
      const { id } = yield select(state => state.deport);
      payload.id = id;
      const res = yield call(updateDeport, { ...parse(payload) });
      const { code } = res.data;
      if (code === '200') {
        message.info('修改成功');
        yield put({
          type: 'getDeportList',
          payload: {},
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteDeport({ payload }, { put, call }) {
      const res = yield call(deleteDeport, { ...parse(payload) });
      const { code } = res.data;
      if (code === '200') {
        message.info('删除成功');
        yield put({
          type: 'getDeportList',
          payload: {},
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateStatus({ payload }, { put, call }) {
      const res = yield call(updateStatus, { ...parse(payload) });
      const { code } = res.data;
      if (code === '200') {
        message.info('修改成功');
        yield put({
          type: 'getDeportList',
          payload: {},
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getDeportList({ payload }, { put, call, select }) {
      yield put({ type: 'showLoading' });
      const { queryString, pagination } = yield select(state => state.deport);
      payload.queryString = queryString;
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const listData = yield call(getDeportList, { ...parse(payload) });
      if (listData.data && listData.data.success) {
        yield put({
          type: 'mergeData',
          payload: {
            deportList: listData.data.data.list,
            pagination: {
              showSizeChanger: true,
              showQuickJumper: true,
              total: listData.data.data.total,
              current: listData.data.data.pageNum,
              showTotal: total => `共 ${total} 条`,
              pageSize: listData.data.data.pageSize,
              pageSizeOptions: ['10', '20', '50', '100'],
            },
          },
        });
      } else {
        message.warning(`操作失败，请参考：${listData.data.errorInfo}`);
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
      return { ...state, ...action.payload };
    },
  },
};
