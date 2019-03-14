import { message } from 'antd';
import { parse } from 'qs';
import { getRoleList, getCollegeList } from '../../../services/system/common/common';
import {
  getTeacherList,
  updateTeacher,
  addTeacher,
  deleteTeacher,
} from '../../../services/system/staff';

export default {
  namespace: 'teacher',
  state: {
    loading: false,
    teacherList: [],
    collegeList: [],
    modalVisible: false,
    // 学生姓名
    teacherName: '',
    // 角色
    roleList: [],
    // 学生手机号
    teacherPhone: '',
    // 学院
    collegeId: '',
    // 模糊搜索
    queryString: '',
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
        if (location.pathname === '/system/room/staff') {
          dispatch({
            type: 'getTeacherList',
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
            roleList: res.data.data,
          },
        });
      }
    },
    * getTeacherList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { queryString, pagination } = yield select(state => state.teacher);
      payload.queryString = queryString;
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.rows === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getTeacherList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            teacherList: res.data.data.list,
            roleId: '',
            collegeId: '',
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
    * updateTeacher({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.teacher);
      if (payload.teacherSex === '1') {
        payload.teacherSex = '男';
      } else if (payload.teacherSex === '2') {
        payload.teacherSex = '女';
      }
      payload.id = id;
      const res = yield call(updateTeacher, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getTeacherList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * addTeacher({ payload }, { call, put }) {
      if (payload.teacherSex === '1') {
        payload.teacherSex = '男';
      } else if (payload.teacherSex === '2') {
        payload.teacherSex = '女';
      }
      const res = yield call(addTeacher, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getTeacherList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteTeacher({ payload }, { call, put }) {
      const res = yield call(deleteTeacher, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getTeacherList', payload: {} });
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
