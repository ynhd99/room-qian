import { connect } from 'dva';
import React from 'react';
import ClassSearch from '../../components/system/class/search';
import ClassList from '../../components/system/class/list';
import ClassModal from '../../components/system/class/modal';

const ClassRoom = ({ classRoom, dispatch }) => {
  const ClassLists = {
    classRoom,
    onPageChange(page) {
      dispatch({
        type: 'classRoom/getStaffList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'classRoom/mergeData',
        payload,
      });
    },
    updateStatus(payload) {
      dispatch({
        type: 'classRoom/updateStatus',
        payload: {
          id: payload.id,
          status: payload.status,
        },
      });
    },
    deleteClass(payload) {
      dispatch({
        type: 'classRoom/deleteClass',
        payload: {
          id: payload.record.id,
        },
      });
    },
  };
  const ClassSearchs = {
    classRoom,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'classRoom/mergeData',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: 'classRoom/getClassList',
        payload: {},
      });
    },
    showModal(modalVisible) {
      dispatch({
        type: 'classRoom/mergeData',
        payload: {
          modalVisible,
        },
      });
      dispatch({
        type: 'classRoom/getCollegeList',
        payload: {},
      });
    },
    exportClass(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'classRoom/exportClass',
        payload,
      });
    }
  };
  const ClassModals = {
    classRoom,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'classRoom/mergeData',
        payload,
      });
    },
    modalHandleOk(values) {
      if (classRoom.oPty === 'add') {
        dispatch({
          type: 'classRoom/addClass',
          payload: {
            classCode: values.classCode,
            className: values.className,
            collegeId: values.collegeId,
          },
        });
      } else {
        console.log('我开始了哈  ');
        dispatch({
          type: 'classRoom/updateClass',
          payload: {
            className: values.className,
            collegeId: values.collegeId,
          },
        });
      }
    },
  };
  return (
    <div>
      <ClassSearch {...ClassSearchs} />
      <ClassList {...ClassLists} />
      <ClassModal {...ClassModals} />
    </div>
  );
};
function mapStateToProps({ classRoom }) {
  return { classRoom };
}

export default connect(mapStateToProps)(ClassRoom);
