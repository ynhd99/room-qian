import { message } from 'antd';
import { parse } from 'qs';
import { addRecord, updateRecord, getRecordList, deleteRecord } from '../../services/system/record';

export default {
  namespace: 'record',
  state: {
    loading: false,
    recordList: [],
    modalVisable: false,
    title: '',
    content: '',
    oPty: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/room/record') {
          dispatch({
            type: 'getRecordList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getRecordList({ payload }, { call, put }) {
      const res = yield call(getRecordList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            recordList: res.data.data,
          },
        });
      } else {
        message.error('获取失败');
      }
    },
    * addRecord({ payload }, { call, put }) {
      const res = yield call(addRecord, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getRecordList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateRecord({ payload }, { call, put, select }) {
      const { id } = yield select(state => state.record);
      payload.id = id;
      const res = yield call(updateRecord, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('更新成功');
        yield put({ type: 'getRecordList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteRecord({ payload }, { call, put }) {
      const res = yield call(deleteRecord, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getRecordList', payload: {} });
      } else {
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
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
};
