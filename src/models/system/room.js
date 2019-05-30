import { message } from 'antd';
import moment from 'moment';
import { parse } from 'qs';
import {
  getBuildingList,
  getCateList,
  addRoom,
  updateRoom,
  deleteRoom,
  getRoomList,
  getCollegeList,
  getClassList,
  getStudentList,
  addRoomDetail,
  deleteRoomDetail,
  exportRoom,
} from '../../services/system/room';

export default {
  namespace: 'room',
  state: {
    id: '',
    roomCode: '',
    cateName: '',
    errorVisible: false,
    errorList: [],
    cateId: '',
    buildingName: '',
    buildingId: '',
    status: '',
    checkDate: new Date(),
    modalVisible: false,
    addModalVisible: false,
    cateList: [],
    buildingList: [],
    roomList: [],
    studentList: [],
    collegeList: [],
    classList: [],
    roomDetailInfoList: [],
    collegeId: '',
    queryString: '',
    oPty: '',
    classId: '',
    roomCount: '',
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
        if (location.pathname === '/system/room/room') {
          dispatch({
            type: 'getRoomList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getRoomList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { status, queryString, pagination } = yield select(state => state.room);
      payload.queryString = queryString;
      payload.status = status;
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getRoomList, { ...parse(payload) });
      if (res.data.code === '200') {
        console.log(`我获取成功了${res.data.data}`);
        yield put({
          type: 'mergeData',
          payload: {
            roomList: res.data.data.list,
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
    * addRoom({ payload }, { call, put }) {
      console.log(`还没有吗${payload.classCode}`);
      const res = yield call(addRoom, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getRoomList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
     //导出宿舍信息
     * exportRoom({ payload },{ call }) {
      console.log("bdwuiedheufherufhrufhru");
      yield call(exportRoom, {payload});
    },
    * updateRoom({ payload }, { call, put, select }) {
      if (!payload.id) {
        const { id } = yield select(state => state.room);
        payload.id = id;
      }
      const res = yield call(updateRoom, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getRoomList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteRoom({ payload }, { call, put }) {
      const res = yield call(deleteRoom, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getRoomList', payload: {} });
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
    * getCateList({ payload }, { call, put }) {
      payload.page = 1;
      payload.size = 1000;
      payload.status = 0;
      const res = yield call(getCateList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            cateList: res.data.data,
          },
        });
      } else {
        message.error(res.data.errorInfo);
      }
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
      const { collegeId } = yield select(state => state.room);
      payload.page = 1;
      payload.size = 1000;
      payload.status = 0;
      payload.collegeId = collegeId;
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
    * getStudentList({ payload }, { select, call, put }) {
      console.log('我开始获取学生列表了');
      yield put({ type: 'showLoading' });
      const { pagination, collegeId, classId } = yield select(state => state.room);
      payload.collegeId = collegeId;
      payload.classId = classId;
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
            collegeId: '',
            classId: '',
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
    * addRoomDetail({ payload }, { call, put, select }) {
      const { id, roomDetailInfoList, checkDate } = yield select(state => state.room);
      roomDetailInfoList.map((item) => {
        item.roomId = id;
        item.checkDate = moment(checkDate).format('YYYY-MM-DD');
        return null;
      });
      payload.roomDetailInfoList = roomDetailInfoList;
      console.log(`还没有吗${payload.classCode}`);
      const res = yield call(addRoomDetail, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getRoomList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteRoomDetail({ payload }, { call, put }) {
      console.log(`还没有吗${payload.classCode}`);
      const res = yield call(deleteRoomDetail, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('退宿成功');
        yield put({ type: 'getRoomList', payload: {} });
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
