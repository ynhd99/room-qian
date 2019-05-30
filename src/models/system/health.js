import { parse } from 'qs';
import { message } from 'antd';
import moment from 'moment';
import { addHealth, updateHealth, getHealthList, getRoomList ,exportHealth} from '../../services/system/health';

export default {
  namespace: 'health',
  state: {
    roomCode: '',
    roomId: '',
    modalVisible: false,
    healthList: [],
    errorVisible: false,
    errorList: [],
    roomList: [],
    rangeDate: [moment().subtract(1, 'month'), moment()], // 日期选择框数据
    checkDate: new Date(),
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
        if (location.pathname === '/system/room/health') {
          console.log('哈哈哈');
          dispatch({
            type: 'getHealthList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getHealthList({ payload }, { select, call, put }) {
      console.log('走了吗');
      yield put({ type: 'showLoading' });
      const { roomCode, rangeDate, pagination, checkDate } = yield select(state => state.health);
      console.log(`jwdhuwdhuwehdehfuefhe--------${checkDate}`);
      payload.roomCode = roomCode;
      payload.startDate = rangeDate[0].format('YYYY-MM-DD');
      payload.endDate = rangeDate[1].format('YYYY-MM-DD');
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.size === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getHealthList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            healthList: res.data.data.list,
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
    * addHealth({ payload }, { call, put }) {
      payload.checkDate = payload.checkDate.format('YYYY-MM-DD');
      const res = yield call(addHealth, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({
          type: 'mergeData',
          payload: {
            roomCode: '',
          },
        });
        yield put({ type: 'getHealthList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
      //导出卫生检查信息
      * exportHealth({ payload },{ call }) {
        console.log("bdwuiedheufherufhrufhru");
        yield call(exportHealth, {payload});
      },
    * updateHealth({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.health);
      payload.checkDate = payload.checkDate.format('YYYY-MM-DD');
      payload.id = id;
      console.log('我修改了哈');
      const res = yield call(updateHealth, { ...parse(payload) });
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
        yield put({ type: 'getHealthList', payload: {} });
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
