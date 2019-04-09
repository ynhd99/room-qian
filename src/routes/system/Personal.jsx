import React from 'react';
import { connect } from 'dva';
import PersonalItem from '../../components/system/Personal/item';

const Personal = ({ personal }) => {
  const personalItem = { personal };
  return (
    <div>
      <PersonalItem {...personalItem} />
    </div>
  );
};
function mapStateToProps({ personal }) {
  return { personal };
}
export default connect(mapStateToProps)(Personal);
