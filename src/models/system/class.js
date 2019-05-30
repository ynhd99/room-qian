import { message } from 'antd';
import { parse } from 'qs';
import {
  getCollegeList,
  getClassList,
  addClass,
  updateClass,
  deleteClass,
  exportClass,
} from '../../services/system/classRoom';

export default {
  namespace: 'classRoom',
  state: {
    loading: false,
    classList: [],
    collegeList: [],
    modalVisable: false,
    status: '2',
    collegeId: '',
    queryString: '',
    // 班级名称
    className: '',
    errorVisible: false,
    errorList: [],
    // 班级代码
    classCode: '',
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
        if (location.pathname === '/system/room/class') {
          dispatch({
            type: 'getClassList',
            payload: {},
          });
          dispatch({
            type: 'getCollegeList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * addClass({ payload }, { call, put }) {
      console.log(`还没有吗${payload.classCode}`);
      const res = yield call(addClass, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'mergeData', payload: { collegeId: '' } });
        yield put({ type: 'getClassList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateClass({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.classRoom);
      payload.id = id;
      const res = yield call(updateClass, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'mergeData', payload: { collegeId: '' } });
        yield put({ type: 'getClassList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getCollegeList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 100;
      payload.status = 0;
      const res = yield call(getCollegeList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            collegeList: res.data.data.list,
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateStatus({ payload }, { call, put }) {
      const res = yield call(updateClass, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getClassList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteClass({ payload }, { call, put }) {
      const res = yield call(deleteClass, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getClassList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
      // 导出班级信息
    * exportClass({ payload }, { call }) {
      console.log('bdwuiedheufherufhrufhru');
      yield call(exportClass, { payload });
    },
    * getClassList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { status, queryString, pagination, collegeId } = yield select(state => state.classRoom);
      payload.queryString = queryString;
      payload.collegeId = collegeId;
      if (status === '2') {
        payload.status = null;
      } else {
        payload.status = status;
      }
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getClassList, { ...parse(payload) });
      if (res.data.code === '200') {
        console.log(`我获取成功了${res.data.data}`);
        yield put({
          type: 'mergeData',
          payload: {
            classList: res.data.data.list,
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
