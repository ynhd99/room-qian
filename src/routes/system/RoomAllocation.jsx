import { connect } from 'dva';
import React from 'react';
import RoomAllocationSearch from '../../components/system/roomAllocation/search';
import RoomAllocationList from '../../components/system/roomAllocation/list';
import RoomAllocationModal from '../../components/system/roomAllocation/modal';

const RoomAllocation = ({ roomAllocation, dispatch }) => {
  const roomAllocationSearch = {
    roomAllocation,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'roomAllocation/mergeData',
        payload,
      });
    },
    routerGo(path, pageType) {
      dispatch({
        type: 'roomAllocation/routerGo',
        payload: {
          path,
        },
      });
      dispatch({
        type: 'roomAllocation/mergeData',
        payload: {
          pageType,
        },
      });
    },
  };
  const roomAllocationList = {
    roomAllocation,
    mergeData(payload) {
      dispatch({
        type: 'roomAllocation/mergeData',
        payload,
      });
    },
  };
  const roomAllocationModal = {
    roomAllocation,
    mergeData(payload) {
      dispatch({
        type: 'roomAllocation/mergeData',
        payload,
      });
    },
  };
  return (
    <div>
      <RoomAllocationSearch {...roomAllocationSearch} />
      <RoomAllocationList {...roomAllocationList} />
      <RoomAllocationModal {...roomAllocationModal} />
    </div>
  );
};
function mapStateToProps({ roomAllocation }) {
  return { roomAllocation };
}

export default connect(mapStateToProps)(RoomAllocation);
