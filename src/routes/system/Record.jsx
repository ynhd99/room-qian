import { connect } from 'dva';
import React from 'react';
import RecordFilter from '../../components/system/record/filter';
import RecordBody from '../../components/system/record/body';

const Record = ({ Record }) => {
  const filterList = { Record };
  const bodyList = { Record };
  return (
    <div>
      <RecordFilter {...filterList} />
      <RecordBody {...bodyList} />
    </div>
  );
};
function mapStateToProps({ record }) {
  return { record };
}

export default connect(mapStateToProps)(Record);
