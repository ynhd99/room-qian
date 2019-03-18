import { parse } from 'qs';
import { message } from 'antd';
import {
  getBuildingList,
  updateBuilding,
  addBuilding,
  deleteBuilding,
} from '../../services/system/building';
import { getStaffList } from '../../services/system/staff';

export default {
  namespace: 'building',
  state: {
    loading: false,
    buildingList: [],
    staffList: [],
    staffId: '',
    modalVisable: false,
    status: '',
    // 学院名称
    buildingName: '',
    // 学院代码
    buildingCode: '',
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
        if (location.pathname === '/system/room/building') {
          dispatch({
            type: 'getBuildingList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    // 分页获取教学楼列表
    * getBuildingList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { queryString, pagination, status } = yield select(state => state.building);
      payload.status = status;
      payload.queryString = queryString;
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getBuildingList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            buildingList: res.data.data.list,
            roleId: '',
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
    // 更新教学楼信息
    * updateBuilding({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.staff);
      payload.id = id;
      const res = yield call(updateBuilding, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getBuildingList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    // 添加教学楼信息
    * addBuilding({ payload }, { call, put }) {
      const res = yield call(addBuilding, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getBuildingList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    // 删除教学楼信息
    * deleteBuilding({ payload }, { call, put }) {
      const res = yield call(deleteBuilding, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getBuildingList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    // 更新教学楼信息
    * updateStatus({ payload }, { call, put }) {
      const res = yield call(updateBuilding, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getBuildingList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getStaffList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 1000;
      payload.status = 0;
      const res = yield call(getStaffList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            staffList: res.data.data.list,
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
