import React from 'react';
import { Button } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import AddableMixin from '../addable-row/Addable';
import DndItem from './dnditem';
import './style/index';

const AddablePanel = createReactClass({
  propTypes: {
    max: PropTypes.number, // 最大项数
    btnText: PropTypes.string, // 新增按钮文案
    draggable: PropTypes.bool, // 是否打开拖拽
  },

  mixins: [AddableMixin],

  getDefaultProps() {
    return {
      btnText: '新增',
      draggable: false,
    };
  },

  render() {
    const { max, btnText, draggable } = this.props;
    const { keys } = this.state;
    const panels = keys.map((rowId, rowIndex) => {
      const elements = this.renderElements(rowId, rowIndex);

      if (draggable) {
        return (
          <DndItem
            elements={elements}
            keys={keys}
            rowId={rowId}
            onRemove={this.removeRow.bind(this, rowId)}
            onDragging={this.onDragging}
            onDragEnd={this.onDragEnd}
            key={rowId}
            index={rowIndex}
          />
        );
      }

      return (
        <div className="hrui-add-panel-block" key={rowId}>
          {elements}

          {
           keys.length > 1 ? <div className="hrui-add-panel-btngroup">
             <a className="hrui-add-panel-dlbtn" onClick={this.removeRow.bind(this, rowId)}>删除</a>
           </div> : null
         }
        </div>
      );
    });

    return (<div className="hrui-add-panel">
      {panels}

      <Button
        type="ghost"
        className="fn-ml16 fn-mt8"
        disabled={keys.length >= max}
        onClick={this.addRow}>{btnText}</Button>
    </div>);
  },
});

export default DragDropContext(HTML5Backend)(AddablePanel);  // eslint-disable-line new-cap
