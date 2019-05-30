import { parse } from 'qs';
import { message } from 'antd';
import { getRoleList } from '../../../services/system/common/common';
import { getStaffList, addStaff, updateStaff, deleteStaff, exportStaff } from '../../../services/system/staff';

export default {
  namespace: 'staff',
  state: {
    loading: false,
    studentList: [],
    roleList: [],
    staffList: [],
    deleteStaffList: [],
    buttonStatus: true,
    modalVisible: false,
    // 学生姓名
    staffName: '',
    errorVisible: false,
    errorList: [],
    // 学生手机号
    staffPhone: '',
    // 性别
    staffSex: '',
    // 楼号
    buildingId: '',
    // 模糊搜索
    queryString: '',
    // 添加编辑标志
    oPty: '',
    // id
    id: '',
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
        if (location.pathname === '/system/room/staff') {
          dispatch({
            type: 'getStaffList',
            payload: {},
          });
          dispatch({
            type: 'getStaffList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getRoleList({ payload }, { call, put }) {
      const res = yield call(getRoleList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            roleList: res.data.data.list,
          },
        });
      }
    },
    * getStaffList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { queryString, pagination } = yield select(state => state.staff);
      console.log(`我开始获取了吧哈哈哈${queryString}`);
      payload.queryString = queryString;
      console.log('我进不来了吧');
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getStaffList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            staffList: res.data.data.list,
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
    * updateStaff({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.staff);
      if (payload.staffSex === '1') {
        payload.staffSex = '男';
      } else if (payload.staffSex === '2') {
        payload.staffSex = '女';
      }
      payload.id = id;
      const res = yield call(updateStaff, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getStaffList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * addStaff({ payload }, { call, put }) {
      if (payload.staffSex === '1') {
        payload.staffSex = '男';
      } else if (payload.staffSex === '2') {
        payload.staffSex = '女';
      }
      const res = yield call(addStaff, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getStaffList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteStaff({ payload }, { call, put }) {
      const res = yield call(deleteStaff, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getStaffList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    // 导出宿管员信息
    * exportStaff({ payload }, { call }) {
      console.log('bdwuiedheufherufhrufhru');
      yield call(exportStaff, { payload });
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
