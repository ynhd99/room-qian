import { parse } from 'qs';
import { message } from 'antd';
import {
  getCollegeList,
  getClassList,
  getBuildingList,
  getRoomList,
  getStudentList,
} from '../../services/system/common/common';

export default {
  namespace: 'allocation',
  state: {
    roomCode: '',
    buildingName: '',
    modalVisible: false,
    cateId: '',
    treeData: [],
    buildingList: [],
    roomList: [],
    collegeList: [],
    classList: [],
    studentList: [],
    queryString: '',
    checkDate: '',
    oPty: '',
    // buildingId: '',
    collegeName: '',
    className: '',
    calssId: '',
    clooegeid: '',
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
        if (location.pathname === '/system/room/allocation') {
          dispatch({
            type: 'getBuildingList',
            payload: {},
          });
          dispatch({
            type: 'getRoomList',
            payload: {},
          });
          dispatch({
            type: 'getCollegeList',
            payload: {},
          });
          dispatch({
            type: 'getClassList',
            payload: {},
          });
          dispatch({
            type: 'getStudentList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    // 分页获取学生住宿情况列表
    * getStudentList({ payload }, { select, call, put }) {
      console.log('我获取学生列表了');
      yield put({ type: 'showLoading' });
      const {
        buildingId,
        pagination,
        classId,
        collegeId,
        studentName,
        studentCode,
        checkDate,
      } = yield select(state => state.allocation);
      payload.buildingId = buildingId;
      payload.classId = classId;
      payload.collegeId = collegeId;
      payload.studentName = studentName;
      payload.studentCode = studentCode;
      if (checkDate !== '') {
        payload.checkDate = checkDate.format('YYYY-MM-DD');
      }
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getStudentList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            studentList: res.data.data.list,
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
    * getCollegeList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 1000;
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
    * getClassList({ payload }, { call, put, select }) {
      const { collegeId } = yield select(state => state.allocation);
      payload.collegeId = collegeId;
      payload.page = 1;
      payload.size = 1000;
      payload.status = 0;
      const res = yield call(getClassList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            classList: res.data.data.list,
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getBuildingList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 1000;
      payload.status = 0;
      const res = yield call(getBuildingList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            buildingList: res.data.data.list,
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getRoomList({ payload }, { call, put, select }) {
      const { buildingId } = yield select(state => state.allocation);
      payload.buildingId = buildingId;
      payload.page = 1;
      payload.size = 1000;
      payload.status = 0;
      const res = yield call(getRoomList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            roomList: res.data.data,
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
