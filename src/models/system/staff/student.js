import { message } from 'antd';
import { parse } from 'qs';
import { getRoleList, getCollegeList, getClassList } from '../../../services/system/common/common';
import {
  getStudentList,
  addStudent,
  updateStudent,
  deleteStudent,
  exportStudent,
} from '../../../services/system/staff';

export default {
  namespace: 'student',
  state: {
    loading: false,
    // 学生列表
    studentList: [],
    // 班级列表
    classList: [],
    // 学院列表
    collegeList: [],
    // 批量删除列表
    deleteStudentList: [],
    // modal可见标志
    modalVisible: false,
    // 学生姓名
    studentName: '',
    // 按钮是否可选
    buttonStatus: true,
    // 学生手机号
    studentPhone: '',
    // 学院
    collegeId: '',
    errorVisible: false,
    errorList: [],
    // 班级
    classId: '',
    // 角色
    roleId: '',
    // 模糊搜索
    queryString: '',
    colSpan: '',
    // 新增添加标志
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
            type: 'getStudentList',
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
    * getStudentList({ payload }, { select, call, put }) {
      console.log('我开始获取学生列表了');
      yield put({ type: 'showLoading' });
      const { queryString, pagination, collegeId, classId } = yield select(state => state.student);
      payload.queryString = queryString;
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
    * updateStudent({ payload }, { select, call, put }) {
      const { id } = yield select(state => state.student);
      if (payload.studentSex === '1') {
        payload.studentSex = '男';
      } else if (payload.studentSex === '2') {
        payload.studentSex = '女';
      }
      payload.id = id;
      const res = yield call(updateStudent, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('修改成功');
        yield put({ type: 'getStudentList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * addStudent({ payload }, { call, put }) {
      if (payload.studentSex === '1') {
        payload.studentSex = '男';
      } else if (payload.studentSex === '2') {
        payload.studentSex = '女';
      }
      const res = yield call(addStudent, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getStudentList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * deleteStudent({ payload }, { call, put }) {
      const res = yield call(deleteStudent, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('删除成功');
        yield put({ type: 'getStudentList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    // 导出学生信息
    * exportStudent({ payload }, { call }) {
      console.log('bdwuiedheufherufhrufhru');
      yield call(exportStudent, { payload });
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
      console.log('我开始获取学生拉');
      const { collegeId } = yield select(state => state.student);
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
