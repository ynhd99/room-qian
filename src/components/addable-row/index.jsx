import React from 'react';
import { Row, Col } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import AddableMixin from './Addable';
import DndItem from './dnditem';
import './style/index';

const AddableRow = createReactClass({
  propTypes: {
    max: PropTypes.number, // 最大项数
    options: PropTypes.array, // 配置项，配置每个行|列里面的表单项
    copyable: PropTypes.bool, // 是否打开可复制操作
    draggable: PropTypes.bool, // 是否打开拖拽
    disabled: PropTypes.any, // 是否禁用
  },

  mixins: [AddableMixin],

  getDefaultProps() {
    return {
      copyable: false,
      draggable: false,
    };
  },

  render() {
    const { max, options, disabled, copyable, draggable } = this.props;
    const { keys } = this.state;

    let sum = 0;
    options.forEach((opt) => {
      sum += Number(opt.width);
    });

    const tbody = keys.map((rowId, rowIndex) => {
      const cols = this.renderElements(rowId, rowIndex, { disabled }).map((col, colIndex) => {
        return (
          <Col key={colIndex} className="hrui-add-row-col" span={options[colIndex].width}>
            {col}
          </Col>
        );
      });

      let control = [];
      if (disabled) {
        control = null;
      } else if (keys.length === 1) {
        control.push(<a key={1} onClick={this.addRow}>新增</a>);
        if (copyable) {
          control.push(<span key={2} className="ft-bar">|</span>);
          control.push(<a key={3} onClick={this.copyRow.bind(this, rowIndex)}>复制</a>);
        }
      } else {
        if ((rowIndex === keys.length - 1) && !(keys.length >= max)) {
          control.push(<a key={1} onClick={this.addRow}>新增</a>);
          control.push(<span key={2} className="ft-bar">|</span>);
        }
        if (copyable && !(keys.length >= max)) {
          control.push(<a key={3} onClick={this.copyRow.bind(this, rowIndex)}>复制</a>);
          control.push(<span key={4} className="ft-bar">|</span>);
        }
        control.push(<a key={5} onClick={this.removeRow.bind(this, rowId)}>删除</a>);
      }

      const rowContent = [
        ...cols,
        <Col key="controls" className="hrui-add-row-col" span={String(24 - sum)}>
          {control}
        </Col>
      ];

      if (draggable) {
        return (
          <DndItem
            rowId={rowId}
            content={rowContent}
            onDragging={this.onDragging}
            onDragEnd={this.onDragEnd}
            key={rowId}
            index={rowIndex}
          />
        );
      }

      return (
        <Row key={rowId} className="hrui-add-row">
          { rowContent }
        </Row>
      );
    });

    return (<div className="hrui-add-row-body">
      {tbody}
    </div>);
  },
});

export default DragDropContext(HTML5Backend)(AddableRow); // eslint-disable-line new-cap
