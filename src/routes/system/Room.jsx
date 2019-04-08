import { connect } from 'dva';
import React from 'react';
import RooomSearch from '../../components/system/room/search';
import RoomList from '../../components/system/room/list';
import RoomModal from '../../components/system/room/modal';

const Room = ({ room, dispatch }) => {
  const searchPropsList = {
    room,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'room/mergeData',
        payload,
      });
    },
    searchAction() {
      dispatch({
        type: 'room/getRoomList',
        payload: {},
      });
    },
    getDataList() {
      dispatch({
        type: 'room/getCateList',
        payload: {},
      });
      dispatch({
        type: 'room/getBuildingList',
        payload: {},
      });
    },
  };
  const listPropsList = {
    room,
    onPageChange(page) {
      dispatch({
        type: 'room/getRoomList',
        payload: {
          pageNo: page.current,
          pageSize: page.pageSize,
        },
      });
    },
    getDataList() {
      dispatch({
        type: 'room/getCateList',
        payload: {},
      });
      dispatch({
        type: 'room/getBuildingList',
        payload: {},
      });
    },
    mergeData(payload) {
      dispatch({
        type: 'room/mergeData',
        payload,
      });
    },
    updateStatus(payload) {
      dispatch({
        type: 'room/updateRoom',
        payload: {
          id: payload.id,
          status: payload.status,
        },
      });
    },
    deleteRoom(payload) {
      dispatch({
        type: 'room/deleteRoom',
        payload: {
          id: payload.record.id,
        },
      });
    },
  };
  const modalPropsList = {
    room,
    mergeData(payload) {
      dispatch({
        type: 'room/mergeData',
        payload,
      });
    },
    modalHandleOk(payload) {
      if (room.oPty === 'add') {
        dispatch({
          type: 'room/addRoom',
          payload,
        });
      } else {
        dispatch({
          type: 'room/updateRoom',
          payload,
        });
      }
      dispatch({
        type: 'room/mergeData',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  return (
    <div>
      <RooomSearch {...searchPropsList} />
      <RoomList {...listPropsList} />
      <RoomModal {...modalPropsList} />
    </div>
  );
};
function mapStateToProps({ room }) {
  return { room };
}

export default connect(mapStateToProps)(Room);
