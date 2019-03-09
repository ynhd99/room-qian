import { connect } from 'dva';
import React from 'react';
import DeportBeginSearch from '../../components/system/deportBegin/search';
import DeportBeginList from '../../components/system/deportBegin/list';

const DeportBegin = ({ deportBegin }) => {
  const { loading } = deportBegin;
  const DeportBeginSearchList = {
    loading,
  };
  const DeportBeginListList = {
    loading,
  };
  return (
    <div>
      <DeportBeginSearch {...DeportBeginSearchList} />
      <DeportBeginList {...DeportBeginListList} />
    </div>
  );
};
function mapStateToProps(deportBegin) {
  return { deportBegin };
}

export default connect(mapStateToProps)(DeportBegin);
