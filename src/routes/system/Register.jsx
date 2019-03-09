import React from 'react';
import { connect } from 'dva';
import Item from '../../components/system/register/item';
import Header from '../../components/system/Home/header';
import Footer from '../../components/system/Home/footer';

const Register = ({ dispatch, register }) => {
  const { phoneNumber, allowSubmit } = register;
  const itemProps = {
    allowSubmit,
    phoneNumber,
    onChangePrefix(value) {
      dispatch({
        type: 'register/updateState',
        payload: {
          prefix: value,
        },
      });
    },
    // 点击协议
    onChangeAgreement(e) {
      const { checked } = e.target;
      dispatch({
        type: 'register/updateState',
        payload: {
          allowSubmit: checked,
        },
      });
    },
    // 手机号改变
    onChangeMobile(ev) {
      const newVal = ev.target.value;
      dispatch({
        type: 'register/updateState',
        payload: {
          phoneNumber: newVal,
        },
      });
    },
    // 提交信息
    onSubmitInfo(value) {
      dispatch({
        type: 'register/register',
        payload: {
          fullName: value.name, // 姓名
          userName: value.userName, // 用户名
          userPass: value.userPass, // 密码
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
function mapStateToProps({ register }) {
  return { register };
}

export default connect(mapStateToProps)(Register);
