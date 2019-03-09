import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import AddableRow from '../addable-row';
import './style/index';


class AddableRowTable extends Component {
  static propTypes = {
    options: PropTypes.array, // 配置项，配置每个行|列里面的表单项
  }

  render() {
    const { options } = this.props;

    let sum = 0;
    const thead = options.map((opt, i) => {
      sum += Number(opt.width);
      return <Col key={i} className="hrui-add-row-col" span={opt.width}>{opt.title}</Col>;
    });

    return (<div className="hrui-add-row-table">
      <Row className="hrui-add-row-table-head">
        {thead}
        <Col className="hrui-add-row-col" span={String(24 - sum)}>操作</Col>
      </Row>

      <AddableRow {...this.props} />
    </div>);
  }
}

export default AddableRowTable;
