import { parse } from 'qs';
import { message } from 'antd';
import moment from 'moment';
import {
  addRepair,
  updateRepair,
  getRepairList,
  getRoomList,
  getGoodsList,
  exportRepair,
} from '../../services/system/repair';

export default {
  namespace: 'repair',
  state: {
    status: '',
    id: '',
    reason: '',
    roomCode: '',
    propertyName: '',
    roomId: '',
    goodsId: '',
    modalVisible: false,
    errorVisible: false,
    errorList: [],
    repairList: [],
    roomList: [],
    goodsList: [],
    repairPerson: '',
    queryString: '',
    pageType: '',
    buildingId: '',
    visible: false,
    rangeDate: [moment().subtract(1, 'month'), moment()], // 日期选择框数据
    repairDate: new Date(),
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
        if (location.pathname === '/system/room/repair') {
          console.log('哈哈哈');
          dispatch({
            type: 'getRepairList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getRepairList({ payload }, { select, call, put }) {
      console.log('走了吗');
      yield put({ type: 'showLoading' });
      const { roomCode, rangeDate, pagination, queryString } = yield select(state => state.repair);
      payload.roomCode = roomCode;
      payload.queryString = queryString;
      payload.startDate = rangeDate[0].format('YYYY-MM-DD');
      payload.endDate = rangeDate[1].format('YYYY-MM-DD');
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.size === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getRepairList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            repairList: res.data.data.list,
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
    //导出维修信息
    * exportRepair({ payload },{ call }) {
      console.log("bdwuiedheufherufhrufhru");
      yield call(exportRepair, {payload});
    },
    * addRepair({ payload }, { call, put }) {
      payload.repairDate = payload.repairDate.format('YYYY-MM-DD');
      const res = yield call(addRepair, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({
          type: 'mergeData',
          payload: {
            roomCode: '',
          },
        });
        yield put({ type: 'getRepairList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateRepair({ payload }, { select, call, put }) {
      const { id, status, reason } = yield select(state => state.repair);
      console.log(`jqiwjsiwjdiwjedjeudje345666--------${id}`);
      if (payload.repairDate) {
        payload.repairDate = payload.repairDate.format('YYYY-MM-DD');
      }
      payload.id = id;
      payload.reason = reason;
      payload.status = status;
      console.log('我修改了哈');
      const res = yield call(updateRepair, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({
          type: 'mergeData',
          payload: {
            roomCode: '',
            startTime: '',
            endTime: '',
          },
        });
        yield put({ type: 'getRepairList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateStatus({ payload }, { call, put }) {
      console.log('我修改了哈');
      const res = yield call(updateRepair, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({
          type: 'mergeData',
          payload: {
            roomCode: '',
            startTime: '',
            endTime: '',
          },
        });
        yield put({ type: 'getRepairList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getRoomList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 100;
      payload.status = 0;
      const res = yield call(getRoomList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            roomList: res.data.data.list,
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getGoodsList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 100;
      payload.status = 0;
      const res = yield call(getGoodsList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            goodsList: res.data.data.list,
          },
        });
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
