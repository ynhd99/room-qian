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
        type: 'college/getStaffList',
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
  };
  const CollegeSearchList = {
    college,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'college/mergeData',
        payload,
      });
    },
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
      dispatch({
        type: 'college/add',
        payload,
      });
      dispatch({
        type: 'college/mergeData',
        payload: {
          modalVisable: false,
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
