import { connect } from 'dva';
import React from 'react';
import DetailInfo from '../../components/system/roomAllocation/detail/info';
import DetailTable from '../../components/system/roomAllocation/detail/table';
import DetailModal from '../../components/system/roomAllocation/detail/modal';

const AllocationDetail = ({ allocationDetail, dispatch, roomAllocation }) => {
  const detailInfo = {
    allocationDetail,
    roomAllocation,
    mergeData(payload) {
      console.log('hahahhahahhahh');
      dispatch({
        type: 'allocationDetail/mergeData',
        payload,
      });
    },
  };
  const detailList = {
    allocationDetail,
    roomAllocation,
    mergeData(payload) {
      dispatch({
        type: 'allocationDetail/mergeData',
        payload,
      });
    },
  };
  const detailModal = {
    allocationDetail,
    roomAllocation,
    mergeData(payload) {
      dispatch({
        type: 'allocationDetail/mergeData',
        payload,
      });
    },
  };
  return (
    <div>
      <DetailInfo {...detailInfo} />
      <DetailTable {...detailList} />
      <DetailModal {...detailModal} />
    </div>
  );
};
function mapStateToProps({ allocationDetail, roomAllocation }) {
  return { allocationDetail, roomAllocation };
}

export default connect(mapStateToProps)(AllocationDetail);
