import React from 'react';
import { connect } from 'dva';
import Item from '../../components/system/forgetPassword/item';
import Header from '../../components/system/Home/header';
import Footer from '../../components/system/Home/footer';

const ForgetPassword = ({ dispatch, forgetPassword }) => {
  const { count, phoneNumber, allowSubmit } = forgetPassword;
  const itemProps = {
    count,
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
          userName: value.userName, // 用户名
          userPass: value.newUserPass, // 密码
          oldUserPasss: value.oldUserPass, // 旧密码
        },
      });
    },
  };
  return (
    <div>
      <Header />
      <Item {...itemProps} />
      <Footer />
    </div>
  );
};
function mapStateToProps({ forgetPassword }) {
  return { forgetPassword };
}

export default connect(mapStateToProps)(ForgetPassword);
