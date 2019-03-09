import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Node from './node';

import './style/index';

class NodeTree extends Component {
  static propTypes = {
    onLoadData: PropTypes.func,
    renderNode: PropTypes.func,
    parentId: PropTypes.string,
    url: PropTypes.string,
    extraMsg: PropTypes.string,
    defaultPath: PropTypes.array,
    queryKeys: PropTypes.array,
    backwards: PropTypes.bool,
    showDirectArrow: PropTypes.bool,
    rootSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    childSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    divid: PropTypes.shape({
      brother: PropTypes.number,
      parent: PropTypes.number,
    }),
  };

  static defaultProps = {
    backwards: false,
    showDirectArrow: false,
    rootSize: {
      width: 200,
      height: 100,
    },
    childSize: {
      width: 200,
      height: 100,
    },
    divid: {
      brother: 25,
      parent: 35,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      path: [],
      treeData: [],
    };
    // if (props.defaultPath && props.defaultPath.length > 0) {
    //   this.state.path = props.defaultPath;
    // }
    this.rowLeft = [];
    this.reactKey = 0;

    this.onClickNode = this.onClickNode.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultPath && this.props.defaultPath.length > 0) {
      this.recursiveNodeInit(true);
    } else {
      this.props.onLoadData()
      .then((d) => {
        const treeData = d;
        treeData[0].nodeLayoutId = `${0}_${0}`;   // 根结点
        treeData[0].reactKey = this.reactKey++;
        this.setState({ treeData });
      });
    }
  }

  recursiveNodeInit(first, nodeInfo, treeData, cur) {
    if (first === true) {  // 根节点初始化
      this.props.onLoadData()
      .then((d) => {
        treeData = d;
        treeData[0].nodeLayoutId = `${0}_${0}`;
        treeData[0].reactKey = this.reactKey++;
        const curPathPos = 0;
        this.recursiveNodeInit(false, treeData[0], treeData, curPathPos);
      });
    } else if (cur === this.props.defaultPath.length) {  // 初始路径已经加载完毕
      const path = this.props.defaultPath.map((item, index) => {
        return `${index}_${item}`;
      });
      this.setState({ treeData, path });
    } else {  // 中间状态
      this.props.onLoadData(nodeInfo)
      .then((d) => {
        const curPathPos = cur + 1;
        const { defaultPath } = this.props;
        const path = this.props.defaultPath.slice(0, curPathPos).map((item, index) => {
          return `${index}_${item}`;
        });
        treeData = this.appendTreeData(d, path, treeData);
        let node;
        if (nodeInfo.children && nodeInfo.children.length > 0) {
          nodeInfo.children.forEach((item) => {
            if (item.nodeLayoutId === `${curPathPos}_${defaultPath[curPathPos]}`) {
              node = item;
            }
          });
        } else {
          this.setState({ treeData, path });
          return;
        }
        if (!node) {
          this.setState({ treeData, path });
          return;
        }
        this.recursiveNodeInit(false, node, treeData, curPathPos);
      });
    }
  }

  onClickNode(e) {
    const path = this.state.path;
    let brotherIndex = -1;
    let shouldGetChildren = false;
    let target = e.target;
    let position = '';
    while (target.getAttribute('data-layoutId') === null || target.parentElement === null) {
      target = target.parentElement;
    }
    position = target.getAttribute('data-layoutId');
    const arrIndex = path.indexOf(position);

    for (let i = 0; i < path.length; i++) {
      if (position.split('_')[0] === path[i].split('_')[0] && position.split('_')[1] !== path[i].split('_')[1]) {  // 同级但是是兄弟元素而不是自身
        brotherIndex = i;
        break;
      }
    }

    if (arrIndex !== -1) {         // 点击自身
      path.splice(arrIndex);
    } else if (brotherIndex !== -1) { // 点击同级兄弟节点
      path.splice(brotherIndex);
      path.push(position);
      if (!JSON.parse(target.getAttribute('data-hasChildren'))) {
        shouldGetChildren = true;
      }
    } else {                       // 点击下级
      path.push(position);
      if (!JSON.parse(target.getAttribute('data-hasChildren'))) {
        shouldGetChildren = true;
      }
    }
    this.setState({ path });
    if (shouldGetChildren) {
      (function cb(me, p) {
        me.props.onLoadData(me.getNode(target.getAttribute('data-layoutId')))
        .then((d) => {
          const treeData = me.appendTreeData(d, p);
          me.setState({ treeData });
        });
      }(this, JSON.parse(JSON.stringify(path))));
    }
  }

  getNode(nodeId) {
    const treeData = this.state.treeData;
    const level = Number.parseInt(nodeId.split('_')[0], 10);
    let parent = {};
    let currentTreeLayer = treeData;  // root layer

    for (let i = 0; i <= level; i++) {
      parent = currentTreeLayer[Number.parseInt(this.state.path[i].split('_')[1], 10)];
      if (parent.children && parent.children.length > 0) {
        currentTreeLayer = parent.children;
      }
    }

    return parent;
  }

  appendTreeData(children, path, data) {
    const treeData = data || this.state.treeData;
    const level = Number.parseInt(path[path.length - 1].split('_')[0], 10);
    let parent = {};
    let currentTreeLayer = treeData;  // root layer
    const that = this;

    for (let i = 0; i <= level; i++) {
      parent = currentTreeLayer[Number.parseInt(path[i].split('_')[1], 10)];
      if (parent.children && parent.children.length > 0) {
        currentTreeLayer = parent.children;
      }
    }
    children.forEach((item, index) => {
      item.nodeLayoutId = `${level + 1}_${index}`;
      item.reactKey = that.reactKey++;
    });

    parent.children = children;

    return treeData;
  }

  buildLayer(layout, layerData) {
    const layer = [];
    let isChosen = false;
    let style = {};

    for (let i = 0; i < layerData.length; i++) {
      if (this.state.path.indexOf(layerData[i].nodeLayoutId) !== -1) {
        isChosen = true;
      } else {
        isChosen = false;
      }
      style = {
        width: (layerData[i].nodeLayoutId === '0_0') ? this.props.rootSize.width : this.props.childSize.width,
        height: (layerData[i].nodeLayoutId === '0_0') ? this.props.rootSize.height : this.props.childSize.height,
        lineHeight: `${(layerData[i].nodeLayoutId === '0_0') ? this.props.rootSize.height : this.props.childSize.height}px`,
        marginRight: (i === layerData.length - 1) ? 0 : this.props.divid.brother,
      };
      layer.push(<Node
        key={layerData[i].reactKey.toString()}
        nodeRender={this.props.renderNode}
        onClick={this.onClickNode}
        nodeData={layerData[i]}
        isChosen={isChosen}
        style={style}
      />);
      if (this.state.path.indexOf(layerData[i].nodeLayoutId) !== -1 && layerData[i].children && layerData[i].children.length > 0) {
        this.buildLayer(layout, layerData[i].children);
      }
    }
    layout.push(layer);
  }

  buildPathAndMsg() {
    if (this.state.path.length === 0) {  // 没有结点被展开
      return '';
    }
    const { divid, rootSize, childSize, backwards } = this.props;
    const lines = [];
    const focusLines = [];
    const texts = [];
    const path = backwards ? JSON.parse(JSON.stringify(this.state.path)).reverse() : this.state.path;
    const rowLeft = backwards ? JSON.parse(JSON.stringify(this.rowLeft)).reverse() : this.rowLeft;
    const offset = backwards ? 0 : 1;
    let children = [];
    let rowAndCol = [];
    let pathObject = {};
    let textObject = {};
    let svgWidth = 0;
    const svgHeight = ((path.length) * (childSize.height + divid.parent)) + (rootSize.height + divid.parent);
    let startX;
    let startY;
    let endX;
    let endY;

    for (let i = 0; i < path.length; i++) {
      ({ children } = this.getNode(path[i]));
      if (!children || children.length === 0) {
        break;
      }
      if ((rowLeft[i + (backwards ? 0 : 1)] + (children.length * (childSize.width + divid.brother))) > svgWidth) {
        svgWidth = rowLeft[i + (backwards ? 0 : 1)] + (children.length * (childSize.width + divid.brother));
      }
      rowAndCol = path[i].split('_').map((item) => {
        return Number.parseInt(item, 10);
      });
      if (!this.props.backwards) { // 正序排列
        if (i === 0) {  // 根结点
          startY = divid.parent + rootSize.height;
          startX = (0.5 * rootSize.width) + rowLeft[i];
          endY = startY + divid.parent;
        } else {
          startY = ((rowAndCol[0]) * (divid.parent + childSize.height)) + (divid.parent + rootSize.height);
          startX = (rowAndCol[1] * (divid.brother + childSize.width)) + (0.5 * childSize.width) + rowLeft[i];
          endY = startY + divid.parent;
        }
      } else { // 倒序排列
        const size = (i === path.length - 1) ? rootSize : childSize;
        endY = ((path.length - rowAndCol[0] - 1) * (divid.parent + size.height)) + (divid.parent + size.height);
        startX = (rowAndCol[1] * (divid.brother + childSize.width)) + (0.5 * childSize.width) + rowLeft[i + 1];
        startY = endY + divid.parent;
      }

      // 处理结点中的连线
      for (let j = 0; j < children.length; j++) {
        endX = (j * (divid.brother + childSize.width)) + (0.5 * childSize.width) + rowLeft[i + offset];
        pathObject = { startX, startY, endX, endY };
        if (path.indexOf(children[j].nodeLayoutId) !== -1) {
          focusLines.push(pathObject);  // 两个选中结点之间的连线
        } else {
          lines.push(pathObject);  // 普通连线
        }
      }

      // 处理结点上额外的文字数据
      if (this.props.extraMsg && this.props.extraMsg !== '') {
        for (let k = 0; k < children.length; k++) {
          if (children[k][this.props.extraMsg]) {
            textObject = {
              left: (k * (divid.brother + childSize.width)) + rowLeft[i + offset],
              top: endY,
              value: children[k][this.props.extraMsg],
              reactKey: `${children[k].reactKey}txt`,
            };
            if (this.state.path.indexOf(children[k].nodeLayoutId) !== -1) {
              textObject.focus = true;
            }
            texts.push(textObject);
          }
        }
      }
    }

    const linePath = this.drawPath(lines, '#c1bebe');
    const focusLinePath = this.drawPath(focusLines, '#2db7f5');
    const extraTexts = this.drawText(texts);
    const svgContent = (
      <svg width={svgWidth} height={svgHeight} className="path-container">
        {linePath}
        {focusLinePath}
      </svg>
    );
    const content = {
      svg: svgContent,
      msg: extraTexts,
    };

    return content;
  }

  drawPath(pathPoints = [], color) {
    if (pathPoints.length === 0) {
      return '';
    }
    const { backwards } = this.props;
    const offset = backwards ? -30 : 30;
    const arrowY = backwards ? -4 : 4;
    let pathD = '';
    let pathPoint = {};

    for (let i = 0; i < pathPoints.length; i++) {
      pathPoint = pathPoints[i];
      pathD += `
        M ${pathPoint.startX} ${pathPoint.startY}
        C ${pathPoint.startX} ${pathPoint.startY + offset} ${pathPoint.endX} ${pathPoint.endY - offset}
        ${pathPoint.endX} ${pathPoint.endY}
      `;   // 连接两个结点的一条线
      if (this.props.showDirectArrow) {
        pathD += `
          M ${pathPoint.endX} ${pathPoint.endY} L ${pathPoint.endX - 4} ${pathPoint.endY - arrowY}
          M ${pathPoint.endX} ${pathPoint.endY} L ${pathPoint.endX + 4} ${pathPoint.endY - arrowY}
        `;
      }
    }
    const path = (<path d={pathD} stroke={color} fill="transparent" />);

    return path;
  }

  drawText(texts = []) {
    const { backwards } = this.props;
    const { width } = this.props.childSize;
    const textYOffset = backwards ? -5 : 5;
    const msgHeight = backwards ? 0 : 20;

    if (texts.length === 0) {
      return '';
    }

    let style = {};
    const content = texts.map((item) => {
      style = {
        position: 'absolute',
        left: item.left,
        top: (item.top - textYOffset - msgHeight),
        width,
        fontSize: 14,
        textAlign: 'center',
      };
      return (
        <div style={style} key={item.reactKey}>
          <p style={{ display: 'inline', backgroundColor: '#fff', color: (item.focus ? '#2db7f5' : '#c1bebe'), height: msgHeight }}>{item.value}</p>
        </div>
      );
    });

    return content;
  }

  render() {
    const layout = [];  // 数组里的每一个元素代表树的一层
    const treeData = this.state.treeData;
    let content = [];
    const { rootSize, childSize, divid: { parent, brother }, backwards } = this.props;
    const containerSize = {
      width: document.getElementById(this.props.parentId) ? document.getElementById(this.props.parentId).clientWidth : 0,
      height: document.getElementById(this.props.parentId) ? document.getElementById(this.props.parentId).clientHeight : 0,
    };
    let layerContent = '';
    let curWidth = 0;
    let parentLeft = -1;
    let curLeft = 0;

    this.buildLayer(layout, treeData);
    this.rowLeft = [];
    layout.reverse();

    for (let i = 0; i < layout.length; i++) {
      if (parentLeft === -1) {  // 只在初始化存在，意味着该节点没有父级，为根节点
        curWidth = ((rootSize.width * layout[i].length) + (brother * (layout[i].length - 1)));
        curLeft = ((containerSize.width - 60) - curWidth) / 2;
      } else {  // 其他情况, 展开层的中线应该和它的父节点的中线重合
        curWidth = ((childSize.width * layout[i].length) + (brother * (layout[i].length - 1)));
        const index = Number.parseInt(this.state.path[i - 1].split('_')[1], 10);
        let leftOffset = 0;
        if (index === 0) {
          if (i - 1 === 0) {
            leftOffset = (rootSize.width / 2);
          } else {
            leftOffset = (childSize.width / 2);
          }
        } else {
          leftOffset = ((childSize.width + brother) * index) + (childSize.width / 2);
        }
        curLeft = (parentLeft + leftOffset) - (curWidth / 2);
      }

      if ((curLeft < 0) || (curLeft > 0 && curLeft < childSize.width)) {
        curLeft = 0;
      }

      if (curLeft + curWidth >= (containerSize.width - 60)) {
        curWidth += 30; // 超出后的右边距
      }

      const style = {
        position: 'relative',
        float: 'left',
        left: curLeft,
        width: curWidth,
        clear: 'both',
      };

      if (backwards) {
        style.paddingBottom = parent;
      } else {
        style.paddingTop = parent;
      }

      if (i === layout.length - 1) {
        const direct = backwards ? 'paddingTop' : 'paddingBottom';
        style[direct] = parent;
      }
      layerContent = (
        <div key={(this.reactKey++).toString()} style={style}>
          {layout[i]}
        </div>
      );
      content.push(layerContent);
      this.rowLeft.push(curLeft);
      parentLeft = curLeft;
    }

    const extraContent = this.buildPathAndMsg();
    if (backwards) {
      content.reverse();
    }

    return (
      <div style={containerSize} className="hrui-node-tree">
        <div id="main">
          {extraContent.svg}
          {extraContent.msg}
          {content}
        </div>
      </div>
    );
  }
}

export default NodeTree;
