import { message } from 'antd';
import { parse } from 'qs';
import {
  getRoleList,
  addRole,
  getAuthorityList,
  updateRole,
} from '../../services/system/common/common';

export default {
  namespace: 'role',
  state: {
    loading: false,
    roleList: [],
    modalVisable: false,
    codeList: [],
    authorityList: [],
    roleAuthorityList: [],
    oPty: '',
    status: '',
    id: '',
    // 员工姓名
    roleName: '',
    // 所含员工数
    roleNumber: '',
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
        if (location.pathname === '/system/room/role') {
          dispatch({
            type: 'getRoleList',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    * getRoleList({ payload }, { select, call, put }) {
      yield put({ type: 'showLoading' });
      const { pagination } = yield select(state => state.role);
      payload.page = payload.pageNo || pagination.current;
      payload.size = payload.pageSize || pagination.pageSize;
      if (payload.page === 0 || payload.size === 0) {
        payload.page = 1;
        payload.size = 10;
      }
      const res = yield call(getRoleList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            roleList: res.data.data.list,
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
    * addRole({ payload }, { call, put, select }) {
      console.log(`还没有吗${payload.classCode}`);
      const { roleAuthorityList } = yield select(state => state.role);
      payload.roleAuthorityList = roleAuthorityList;
      const res = yield call(addRole, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getRoleList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * updateRole({ payload }, { call, put, select }) {
      console.log(`还没有吗${payload.classCode}`);
      const { id, roleAuthorityList } = yield select(state => state.role);
      payload.id = id;
      payload.roleAuthorityList = roleAuthorityList;
      const res = yield call(updateRole, { ...parse(payload) });
      if (res.data.code === '200') {
        message.info('新增成功');
        yield put({ type: 'getRoleList', payload: {} });
      } else {
        message.error(res.data.errorInfo);
      }
    },
    * getAuthorityList({ payload }, { call, put }) {
      console.log(`哈哈哈${payload.id}`);
      const res = yield call(getAuthorityList, { ...parse(payload) });
      if (res.data.code === '200') {
        yield put({
          type: 'mergeData',
          payload: {
            authorityList: res.data.data,
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
