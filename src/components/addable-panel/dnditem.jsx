import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd'; // eslint-disable-line new-cap
import classNames from 'classnames';

const ItemTypes = {
  OPTION: 'option',
};

const optionSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const optionTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();  // eslint-disable-line react/no-find-dom-node

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.onDragging(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },

  drop(props) {
    if (props.onDragEnd) {
      props.onDragEnd();
    }
  }
};

@DropTarget(ItemTypes.OPTION, optionTarget, connect => ({  // eslint-disable-line new-cap
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.OPTION, optionSource, (connect, monitor) => ({  // eslint-disable-line new-cap
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DndItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onDragging: PropTypes.func.isRequired,
    onDragEnd: PropTypes.func.isRequired,
  };

  render() {
    const { isDragging, connectDragSource, connectDropTarget, onRemove, elements, rowId, keys } = this.props;

    const rowCls = classNames({
      'hrui-add-panel-block': true,
      'dnd-item': true,
      dragging: isDragging,
    });

    const content = (
      <div className={rowCls} key={rowId}>
        {elements}

        {
          keys.length > 1 ? <div className="hrui-add-panel-btngroup">
            <a className="hrui-add-panel-dlbtn" onClick={onRemove}>删除</a>
          </div> : null
        }
      </div>
    );

    return connectDragSource(connectDropTarget(
      content
    ));
  }
}
