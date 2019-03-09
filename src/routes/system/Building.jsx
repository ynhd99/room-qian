import { connect } from 'dva';
import React from 'react';
import BuildingList from '../../components/system/building/list';
import Buildingsearch from '../../components/system/building/search';
import BuildingModal from '../../components/system/building/modal';

const Ruilding = ({ building, dispatch }) => {
  const BuildingLists = {
    building,
    onPageChange(page) {
      dispatch({
        type: 'building/getStaffList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'building/mergeData',
        payload,
      });
    },
  };
  const BuildingSearchList = {
    building,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'building/mergeData',
        payload,
      });
    },
  };
  const BuildingModalList = {
    building,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'building/mergeData',
        payload,
      });
    },
  };
  return (
    <div>
      <Buildingsearch {...BuildingSearchList} />
      <BuildingList {...BuildingLists} />
      <BuildingModal {...BuildingModalList} />
    </div>
  );
};
function mapStateToProps({ building }) {
  return { building };
}

export default connect(mapStateToProps)(Ruilding);
