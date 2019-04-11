import { connect } from 'dva';
import React from 'react';
import AllocationSearch from '../../components/system/allocation/search';
import AllocationList from '../../components/system/allocation/list';

const Allocation = ({ allocation, dispatch }) => {
  const searchPropsList = {
    allocation,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'allocation/mergeData',
        payload,
      });
    },
    getRoomList() {
      dispatch({
        type: 'allocation/getRoomList',
        payload: {},
      });
    },
    getClassList() {
      dispatch({
        type: 'allocation/getClassList',
        payload: {},
      });
    },
    searchAction() {
      dispatch({
        type: 'allocation/getStudentList',
        payload: {},
      });
    },
  };
  const listPropsList = {
    allocation,
    mergeData(payload) {
      dispatch({
        type: 'allocation/mergeData',
        payload,
      });
    },
    onPageChange(page) {
      dispatch({
        type: 'allocation/getStudentList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
  };
  return (
    <div>
      <AllocationSearch {...searchPropsList} />
      <AllocationList {...listPropsList} />
    </div>
  );
};
function mapStateToProps({ allocation }) {
  return { allocation };
}

export default connect(mapStateToProps)(Allocation);
