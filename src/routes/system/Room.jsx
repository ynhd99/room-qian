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
  };
  const listPropsList = {
    room,
    mergeData(payload) {
      dispatch({
        type: 'room/mergeData',
        payload,
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
