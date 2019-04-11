import React, { Component } from 'react';
import { connect } from 'dva';
import { has } from 'lodash';

class Permission extends Component {
  constructor(props) {
    super(props);
    this.isExistType = this.isExistType.bind(this);
  }

  isExistType() {
    const sysPermmission = this.props.userPermissionData;
    console.log(`sysPermmission${sysPermmission[0]}`);
    if (this.props.path) {
      return sysPermmission.indexOf(this.props.path) !== -1;
    }
    return false;
  }
  render() {
    const isexist = this.isExistType();
    console.log(`isexist${isexist}`);
    if (isexist) {
      return <span>{this.props.children}</span>;
    }
    return null;
  }
}

const propertys = state => ({ userPermissionData: state.home.authorityList });
export default connect(propertys)(Permission);
