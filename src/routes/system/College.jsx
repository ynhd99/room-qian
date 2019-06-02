import { connect } from 'dva';
import React from 'react';
import CollegeSearch from '../../components/system/college/search';
import CollegeList from '../../components/system/college/list';
import CollegeModal from '../../components/system/college/modal';

const College = ({ college, dispatch }) => {
  const CollegeLists = {
    college,
    onPageChange(page) {
      dispatch({
        type: 'college/getList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'college/mergeData',
        payload,
      });
    },
    updateStatus(payload) {
      console.log(`我进来了吧${payload.id}`);
      dispatch({
        type: 'college/updateStatus',
        payload: {
          id: payload.id,
          status: payload.status,
        },
      });
    },
    deleteCollege(payload) {
      dispatch({
        type: 'college/deleteCollege',
        payload: {
          id: payload.record.id,
        },
      });
    },
  };
  const CollegeSearchList = {
    college,
    mergeData(payload) {
      dispatch({
        type: 'college/mergeData',
        payload,
      });
    },
    changeStatusList(value) {
      console.log(`我开始改变状态了${value}`);
      dispatch({
        type: 'college/mergeData',
        payload: {
          status: value,
        },
      });
      dispatch({
        type: 'college/getList',
        payload: {},
      });
    },
    searchAction() {
      dispatch({
        type: 'college/getList',
        payload: {},
      });
    },
    nameChanged(value) {
      console.log('我改变了输入框');
      dispatch({
        type: 'college/mergeData',
        payload: {
          queryString: value,
        },
      });
      dispatch({
        type: 'college/getList',
        payload: {},
      });
    },
    onSubmitInfo() {
      dispatch({
        type: 'college/getList',
        payload: {},
      });
    },
    exportCollege(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'college/exportCollege',
        payload,
      });
    }
  };
  const CollegeModalList = {
    college,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'college/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (college.oPty === 'add') {
        dispatch({
          type: 'college/add',
          payload,
        });
      } else {
        dispatch({
          type: 'college/update',
          payload,
        });
      }
      dispatch({
        type: 'college/mergeData',
        payload: {
          modalVisable: false,
          collegeCode: '', 
          collegeName: '', 
          oPty: '',
        },
      });
    },
  };
  return (
    <div>
      <CollegeSearch {...CollegeSearchList} />
      <CollegeList {...CollegeLists} />
      <CollegeModal {...CollegeModalList} />
    </div>
  );
};
function mapStateToProps({ college }) {
  return { college };
}

export default connect(mapStateToProps)(College);
