import { message } from 'antd';
import { parse } from 'qs';
import {
  getCateList,
  getMaxCode,
  addRoomCate,
  updateRoomCate,
  deleteRoomCate,
} from '../../services/system/roomCate';

export default {
  namespace: 'roomCate',
  state: {
    cateName: '',
    cateCode: '',
    cateDesc: '',
    status: '',
    cateList: [],
    modalVisible: false,
    type: '',
    loading: false,
    parentId: '-1',
    queryString: '',
    oPty: '',
    id: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system/room/category') {
          dispatch({
            type: 'getCateList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getCateList({ payload }, { call, select, put }) {
      yield put({ type: 'showLoading' });
      const { queryString } = yield select(state => state.roomCate);
      payload.queryString = queryString;
      const res = yield call(getCateList, { ...parse(payload) });
      console.log('我获取到了列表');
      if (res.data.code === '200') {
        console.log(`我获取成功了${res.data.data}`);
        yield put({
          type: 'mergeData',
          payload: {
            cateList: res.data.data,
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
      yield put({ type: 'hideLoading' });
    },
    * addRoomCate({ payload }, { call, select, put }) {
      const res = yield call(addRoomCate, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({
          type: 'mergeData',
          payload: {
            parentId: '-1',
          },
        });
        yield put({ type: 'getCateList', payload: {} });
      } else {
        message.info(res.data.errorInfo);
      }
    },
    * updateRoomCate({ payload }, { call, select, put }) {
      console.log('我进这个方法了吧');
      const { id } = yield select(state => state.roomCate);
      console.log(`获取到得id${id}`);
      payload.id = id;
      const res = yield call(updateRoomCate, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getCateList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateStatus({ payload }, { call, select, put }) {
      const res = yield call(updateRoomCate, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getCateList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteRoomCate({ payload }, { call, put }) {
      const res = yield call(deleteRoomCate, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getCateList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getMaxCode({ payload }, { call, select, put }) {
      const { parentId } = yield select(state => state.roomCate);
      payload.parentId = parentId;
      const res = yield call(getMaxCode, { ...parse(payload) });
      if (res.data.code === '200') {
        console.log('获取成功了');
        yield put({
          type: 'mergeData',
          payload: {
            cateCode: res.data.data.cateCode,
          },
        });
      } else {
        message.error(res.data.erroeInfo);
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
      return { ...state, ...action.payload };
    },
  },
};
