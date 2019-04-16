import React from 'react';
import { connect } from 'dva';
import Item from '../../components/system/forgetPassword/item';

const ForgetPassword = ({ home, dispatch, forgetPassword }) => {
  const { count, phoneNumber, allowSubmit } = forgetPassword;
  const itemProps = {
    forgetPassword,
    count,
    home,
    allowSubmit,
    phoneNumber,
    onChangePrefix(value) {
      dispatch({
        type: 'forgetPassword/updateState',
        payload: {
          prefix: value,
        },
      });
    },
    // 手机号改变
    onChangeMobile(ev) {
      const newVal = ev.target.value;
      dispatch({
        type: 'forgetPassword/updateState',
        payload: {
          phoneNumber: newVal,
        },
      });
    },
    // 提交信息
    onSubmitInfo(value) {
      dispatch({
        type: 'forgetPassword/forgetPassword',
        payload: {
          userName: home.userInfo.code, // 用户名
          userPass: value.newUserPass, // 密码
          oldUserPass: value.oldUserPass, // 旧密码
        },
      });
    },
  };
  return (
    <div>
      <Item {...itemProps} />
    </div>
  );
};
function mapStateToProps({ forgetPassword, home }) {
  return { forgetPassword, home };
}

export default connect(mapStateToProps)(ForgetPassword);
