/* CREATE BY ZC 2017/12/22 下午1:48:16*/
import React from 'react';
import { connect } from 'dva';
import Result from '../../components/system/register/result';
import styles from '../../common/result.less';
import Header from '../../components/system/Home/header';
import Footer from '../../components/system/Home/footer';

const RegisterResult = ({ registerResult }) => {
  const { count } = registerResult;
  const registerResultProps = {
    count,
    title: '你的辰森帐号注册成功',
  };
  return (
    <div>
      <Header />
      <Result {...registerResultProps} className={styles.registerResult} />
      <Footer />
    </div>
  );
};

function mapStateToProps({ registerResult }) {
  return { registerResult };
}

export default connect(mapStateToProps)(RegisterResult);
