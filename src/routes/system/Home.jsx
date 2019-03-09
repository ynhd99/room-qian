import { connect } from 'dva';
import React from 'react';
import { Layout } from 'antd';
import config from '../../utils/config';
import styles from '../../common/home.less';

const { Content } = Layout;

const Home = () => (
  <Layout className={styles.layout}>
    <Content className={styles.content}>
      <iframe title="1" className={styles.iframe} src="/home/index.html" frameBorder="0" />
      <iframe title="2" src={`${config.domainReport}logout`} height={0} frameBorder="0" />
    </Content>
  </Layout>
);

function mapStateToProps(home) {
  return { home };
}

export default connect(mapStateToProps)(Home);
