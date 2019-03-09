import { connect } from 'dva';
import React from 'react';
import ClassSearch from '../../components/system/class/search';
import ClassList from '../../components/system/class/list';

const ClassRoom = ({ classRoom, dispatch }) => {
  const CollegeLists = {
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
  };
  const CollegeSearchList = {
    classRoom,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'classRoom/mergeData',
        payload,
      });
    },
  };
  const CollegeModalList = {
    classRoom,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'college/mergeData',
        payload,
      });
    },
  };
  return (
    <div>
      <ClassSearch {...CollegeSearchList} />
      <ClassList {...CollegeLists} />
    </div>
  );
};
function mapStateToProps({ classRoom }) {
  return { classRoom };
}

export default connect(mapStateToProps)(ClassRoom);
