import React, { Component } from 'react';
import { connect } from 'dva';

class Permission extends Component {
  constructor(props) {
    super(props);
    this.isExistType = this.isExistType.bind(this);
  }

  isExistType() {
    const sysPermmission = window.sessionStorage.getItem('authority');
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
