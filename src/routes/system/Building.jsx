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
    updateStatus(payload) {
      dispatch({
        type: 'building/updateStatus',
        payload,
      });
    },
    deleteBuilding(payload) {
      dispatch({
        type: 'building/deleteBuilding',
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
    searchAction() {
      dispatch({
        type: 'building/getBuildingList',
        payload: {},
      });
    },
    getStaffList() {
      dispatch({
        type: 'building/getStaffList',
        payload: {},
      });
    },
    exportBuilding(payload){
      console.log("哈哈哈哈哈哈哈哈哈哈哈哈");
      dispatch({
        type: 'building/exportBuilding',
        payload,
      });
    }
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
    // modal点击确定按钮处理事件
    modalHandleOk(payload) {
      if (building.oPty === 'add') {
        dispatch({
          type: 'building/addBuilding',
          payload,
        });
      } else {
        dispatch({
          type: 'building/updateBuilding',
          payload,
        });
      }
      dispatch({
        type: 'building/mergeData',
        payload: {
          modalVisible: false,
        },
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
