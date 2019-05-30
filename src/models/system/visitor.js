import { message } from 'antd';
import { parse } from 'qs';
import moment from 'moment';
import { addVisitor, getVisitorList, updateVisitor,exportVisitor } from '../../services/system/visitor';

export default {
  namespace: 'visitor',
  state: {
    loading: false,
    visitorList: [],
    modalVisable: false,
    visitorName: '',
    endTime: '',
    errorVisible: false,
    errorList: [],
    startTime: '',
    id: '',
    oPty: '',
    visitDate: [moment().subtract(1, 'month'), moment()], // 日期选择框数据
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
        if (location.pathname === '/system/room/visitor') {
          console.log('哈哈哈');
          dispatch({
            type: 'getVisitorList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getVisitorList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { visitorName, visitDate, pagination } = yield select(state => state.visitor);
      payload.visitorName = visitorName;
      payload.startTime = visitDate[0].format('YYYY-MM-DD HH:mm:ss');
      payload.endTime = visitDate[1].format('YYYY-MM-DD HH:mm:ss');
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.size === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getVisitorList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            visitorList: res.data.data.list,
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
    //导出外来人员信息
    * exportVisitor({ payload },{ call }) {
      console.log("bdwuiedheufherufhrufhru");
      yield call(exportVisitor, {payload});
    },
    * addVisitor({ payload }, { call, put }) {
      console.log(`还没有吗${payload.classCode}`);
      const res = yield call(addVisitor, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({
          type: 'mergeData',
          payload: {
            visitorName: '',
            startTime: '',
            endTime: '',
          },
        });
        yield put({ type: 'getVisitorList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateVisitor({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.visitor);
      payload.id = id;
      const res = yield call(updateVisitor, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({
          type: 'mergeData',
          payload: {
            visitorName: '',
            startTime: '',
            endTime: '',
          },
        });
        yield put({ type: 'getVisitorList', payload: {} });
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
