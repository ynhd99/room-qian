export default {
  namespace: 'teacher',
  state: {
    loading: false,
    studentList: [],
    modalVisible: false,
    // 学生姓名
    teacherName: '',
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
  subscriptions: {},
  effects: {},
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
