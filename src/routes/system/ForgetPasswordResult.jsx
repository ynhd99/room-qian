import React from 'react';
import { connect } from 'dva';
import Result from '../../components/system/forgetPassword/result';
import styles from '../../common/result.less';
import Header from '../../components/system/Home/header';
import Footer from '../../components/system/Home/footer';

const ForgetPasswordResult = ({ forgetPasswordResult }) => {
  const { count } = forgetPasswordResult;
  const resultProps = {
    count,
    title: '你的密码重置成功',
  };
  return (
    <div>
      <Header />
      <Result {...resultProps} className={styles.registerResult} />
      <Footer />
    </div>
  );
};

function mapStateToProps(forgetPasswordResult) {
  return { forgetPasswordResult };
}

export default connect(mapStateToProps)(ForgetPasswordResult);
