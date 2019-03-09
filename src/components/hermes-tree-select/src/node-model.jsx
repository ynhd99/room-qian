import { forIn, assign, findIndex, find, isObject } from 'lodash';
import Deferred from './deferred.jsx';

const DEFAULT_CONFIG = {
  childrenPropertyName: 'children',
  idPropertyName: 'id',
  degreePropertyName: 'count',
  async: false,
  fetch: () => Promise.resolve([]),
};

const TRUE = 1;
const FALSE = 0;
const INDETERMINATE = -1;

class Node {
  constructor(data, config) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    if (!isObject(data)) {
      throw new Error('data must be an object');
    }
    const { childrenPropertyName, idPropertyName, degreePropertyName } = this.config;
    this.model = data;
    const { checked, disabled } = this.model;
    const id = this.model[idPropertyName];
    const degree = this.model[degreePropertyName];
    this.id = id;
    this._children = [];
    this.database = { [id]: this };
    this.state = {
      disableState: FALSE,
      checkState: FALSE,
      signState: FALSE,
      fetchedState: degree ? FALSE : TRUE,
    };
    if (!id) {
      throw new Error(`${idPropertyName} is not existed`);
    }
    const children = this.model[childrenPropertyName];
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((item) => {
          this._addChild(item);
        });
      } else {
        throw new Error(`${childrenPropertyName} must be an array`);
      }
    }
    if (checked) {
      this.check();
    }
    if (disabled) {
      this.disable();
    }
  }

  _addChild(data) {
    const { async, degreePropertyName } = this.config;
    const child = new Node(data, this.config);
    child._parent = this;
    const i = findIndex(this.children(), (item) => {
      return item.id === child.id;
    });
    if (i !== -1) {
      const node = this.children()[i];
      child.merge(node, true);
      this.children().splice(i, 1, child);
      console.warn(`node which id is (${child.id}) has been existed was merged`);
    } else {
      this.children().push(child);
    }
    if (async) {
      const count = this.model[degreePropertyName];
      if (this.children().length > count) {
        console.warn(`${this.id}'s children of length more than it's ${degreePropertyName}`);
      }
    }
    // 更新每个父节点的database
    const childDatabase = child.database;
    const ancestors = child.ancestors();
    ancestors.forEach(node => {
      forIn(childDatabase, (n, id) => {
        node.database[id] = n;
      });
    });
    return child;
  }

  addChild(data) {
    const { childrenPropertyName } = this.config;
    this.model[childrenPropertyName] = this.model[childrenPropertyName] || [];
    const node = this._addChild(data);
    const nodeModel = node.model;
    const modelChildren = this.model[childrenPropertyName];
    const i = findIndex(modelChildren, (item) => {
      return item.id === node.id;
    });
    if (i !== -1) {
      modelChildren.splice(i, 1, nodeModel)
    } else {
      modelChildren.push(nodeModel);
    }
  }

  get(id) {
    return this.database[id];
  }

  degree() {
    const { async, degreePropertyName } = this.config;
    return !async ? this._children.length : this.model[degreePropertyName] || 0;
  }

  depth() {
    return this.ancestors().length;
  }

  isRoot() {
    return this._parent === undefined;
  }

  isLeaf() {
    return this.degree() === 0;
  }

  children() {
    return this._children;
  }

  parent() {
    return this._parent;
  }

  ancestors() {
    const rtn = [];
    let parent = this._parent;
    while (parent) {
      rtn.push(parent);
      parent = parent._parent;
    }
    return rtn;
  }

  _hasChild(id) {
    const children = this.children();
    return find(children, (item) => item.id === id);
  }

  needFetch(recursion) {
    let rtn = false;
    const { async } = this.config;
    if (async) {
      if (!recursion) {
        if (this.state.fetchedState === FALSE) {
          if (this.degree() > this.children().length) {
            rtn = true;
          } else {
            this._changeState('fetched', TRUE);
          }
        }
      } else {
        const list = [this.needFetch()];
        const children = this.children();
        children.forEach(item => {
          list.push(item.needFetch(true));
        });
        rtn = list.some(item => item === true);
      }
    }
    return rtn;
  }

  fetch(recursion) {
    const { fetch } = this.config;
    const dfd = new Deferred();
    const childrenFetch = () => {
      const children = this.children();
      const ps = [];
      children.forEach(item => {
        const p = item.fetch(true);
        ps.push(p);
      });
      Promise.all(ps).then(() => {
        dfd.resolve(this);
      }, (error) => {
        console.error(error)
      });
    };
    if (!recursion) {
      if (this.needFetch()) {
        const promise = fetch(this);
        if (promise) {
          promise.then((children) => {
            children.forEach((item) => {
              this.addChild(item);
            });
            this._changeState('fetched', TRUE);
            dfd.resolve(this);
          }, (error) => {
            console.error(`node which id is ${this.id} fetch failed with error ${error}`);
          });
        } else {
          this._changeState('fetched', TRUE);
          dfd.resolve(this);
        }
      } else {
        dfd.resolve(this);
      }
    } else if (this.needFetch(true)) {
      if (this.needFetch()) {
        this.fetch().then(() => {
          childrenFetch();
        }, (error) => {
          console.error(error);
        });
      } else {
        childrenFetch();
      }
    } else {
      dfd.resolve(this);
    }
    return dfd.promise;
  }

  walkPreOrder(action, context) {
    const length = this._children.length;
    let keepGoing = action.call(context, this);
    for (let i = 0; i < length; i++) {
      if (keepGoing === false) {
        return false;
      }
      keepGoing = this._children[i].walkPreOrder(action, context);
    }
    return keepGoing;
  }

  walkPostOrder(action, context) {
    const length = this._children.length;
    let keepGoing;
    for (let i = 0; i < length; i++) {
      keepGoing = this._children[i].walkPostOrder(action, context);
      if (keepGoing === false) {
        return false;
      }
    }
    keepGoing = action.call(context, this);
    return keepGoing;
  }

  first(filter, context) {
    let rtn;
    this.walkPostOrder((node) => {
      let keepGoing = true;
      if (filter.call(context, node)) {
        rtn = node;
        keepGoing = false;
      }
      return keepGoing;
    });
    return rtn;
  }

  all(filter, context) {
    const rtn = [];
    this.walkPreOrder((node) => {
      if (filter.call(context, node)) {
        rtn.push(node);
      }
    });
    return rtn;
  }

  // todo 中序算法
  waklInOrder(action, context) { // eslint-disable-line
  }

  search(filter, context) {
    const list = [];
    const checked = this.checked();
    const disabled = this.disabled();
    let newTree = this.clone();
    checked.forEach((item) => {
      newTree.get(item.id).check();
    });
    disabled.forEach((item) => {
      newTree.get(item.id).disable();
    });
    if (newTree) {
      newTree.walkPreOrder((node) => {
        if (filter.call(context, node)) {
          node._sign();
        }
      }, context);
      newTree.walkPreOrder((node) => {
        if (node._signState() === FALSE) {
          list.push(node);
        }
      });
      if (list.indexOf(newTree) !== -1) {
        newTree = null;
      } else {
        list.forEach((item) => {
          item.drop();
        });
      }
    }
    return newTree;
  }

  leafs() {
    const rtn = [];
    this.walkPostOrder((node) => {
      if (node.isLeaf()) {
        rtn.push(node);
      }
    });
    return rtn;
  }

  _changeState(type, value) {
    this.state[`${type}State`] = value;
  }

  _sign() {
    if (!this.isLeaf()) {
      this._children.forEach((item) => {
        item._sign();
      });
    } else {
      this.state.signState = TRUE;
    }
    return this;
  }

  _signState() {
    let rtn = FALSE;
    if (!this.isLeaf()) {
      const leafs = this.leafs();
      const allFalse = leafs.every((node) => {
        return node.state.signState === FALSE;
      });
      const allTrue = leafs.every((node) => {
        return node.state.signState === TRUE;
      });
      if (allTrue && leafs.length > 0) {
        rtn = TRUE;
      } else if (allFalse) {
        rtn = FALSE;
      } else {
        rtn = INDETERMINATE;
      }
    } else {
      rtn = this.state.signState;
    }
    return rtn;
  }

  nextAction() {
    let rtn = 'CHECK';
    const leafs = this.leafs();
    const allChecked = leafs.every(node => {
      return node.checkState() === TRUE || node.disableState() === TRUE;
    });
    if (allChecked) {
      rtn = 'UNCHECK';
    }
    return rtn;
  }

  toggleCheck() {
    const action = this.nextAction();
    if (action === 'CHECK') {
      this.check();
    } else if (action === 'UNCHECK') {
      this.uncheck();
    }
  }

  check() {
    if (!this.isLeaf()) {
      this._children.forEach((item) => {
        item.check();
      });
      if (this.needFetch()) {
        console.warn(`node which id is ${this.id} needFetch!!, please fetch it first!`);
      }
    } else if (this.disableState() === FALSE) {
      this._changeState('check', TRUE);
    }
    return this;
  }

  uncheck() {
    if (!this.isLeaf()) {
      this._children.forEach((item) => {
        item.uncheck();
      });
    } else if (this.disableState() === FALSE) {
      this._changeState('check', FALSE);
    }
    return this;
  }

  checkState() {
    let rtn = FALSE;
    const { async } = this.config;
    if (async && this.needFetch(true)) {
      const children = this.children();
      if (children.length === 0) {
        rtn = FALSE
      } else {
        const hasTrue = children.some(node => {
          return node.checkState() === TRUE;
        });
        const allTrue = children.every((node) => {
          return node.checkState() === TRUE;
        });
        if (children.length === this.degree() && allTrue) {
          rtn = TRUE;
        } else if (hasTrue) {
          rtn = INDETERMINATE;
        } else {
          rtn = FALSE;
        }
      }
    } else if (!this.isLeaf()) {
      const children = this.children();
      const allTrue = children.every((node) => {
        return node.checkState() === TRUE;
      });
      const allFalse = children.every((node) => {
        return node.checkState() === FALSE;
      });
      if (allTrue) {
        rtn = TRUE;
      } else if (allFalse) {
        rtn = FALSE;
      } else {
        rtn = INDETERMINATE;
      }
    } else {
      rtn = this.state.checkState;
    }
    return rtn;
  }

  disable() {
    if (!this.isLeaf()) {
      this._children.forEach((item) => {
        item.disable();
      });
      if (this.needFetch()) {
        console.error(`node which id is ${this.id} needFetch!!, please fetch it first!`);
      }
    } else {
      this._changeState('disable', TRUE);
    }
    return this;
  }

  enable() {
    if (!this.isLeaf()) {
      this._children.forEach((item) => {
        item.enable();
      });
    } else {
      this._changeState('disable', FALSE);
    }
    return this;
  }

  disableState() {
    let rtn;
    const { async } = this.config;
    if (async && this.needFetch(true)) {
      rtn = FALSE
    } else if (!this.isLeaf()) {
      const children = this.children();
      const allTrue = children.every((node) => {
        return node.disableState() === TRUE;
      });
      rtn = allTrue ? TRUE : FALSE;
    } else {
      rtn = this.state.disableState;
    }
    return rtn;
  }

  drop() {
    if (!this.isRoot()) {
      const { childrenPropertyName } = this.config;
      const index = this._parent._children.indexOf(this);
      this._parent._children.splice(index, 1);
      this._parent.model[childrenPropertyName].splice(index, 1);
      // 更新每个父节点的database
      const childDatabase = this.database;
      const ancestors = this.ancestors();
      ancestors.forEach(node => {
        forIn(childDatabase, (n) => {
          delete node.database[n.id];
        });
      });
      this._parent = undefined;
      delete this._parent;
    }
    return this;
  }

  clone() {
    const data = this.toJSON();
    let rtn;
    if (data) {
      rtn = new Node(data, this.config);
    }
    return rtn;
  }

  checked() {
    const leafs = this.leafs();
    return leafs.filter((item) => {
      return item.checkState() === TRUE;
    });
  }

  checkedTree() {
    return this.search((node) => {
      return node.checkState() === TRUE;
    });
  }

  disabled() {
    const leafs = this.leafs();
    return leafs.filter((item) => {
      return item.disableState() === TRUE;
    });
  }

  merge(tree, all) {
    if (all) {
      if (tree.id !== this.id) {
        console.warn('can not merge, because of not same root');
      } else {
        const children = tree.children();
        children.forEach(item => {
          const node = this._hasChild(item.id);
          if (node) {
            node.merge(item, all);
          } else {
            this.addChild(item.model);
          }
        });
      }
    }
    const leafs = tree.leafs();
    leafs.forEach((item) => {
      const node = this.get(item.id);
      if (node) {
        if (item.checkState() === TRUE) {
          node.check();
        } else {
          node.uncheck();
        }
        if (item.disableState() === TRUE) {
          node.disable();
        } else {
          node.enable();
        }
      }
    });
    return this;
  }

  toJSON() {
    let rtn;
    try {
      rtn = JSON.parse(JSON.stringify(this.model))
    } catch (e) {
      throw new Error('tree\'s data must be an object which can be stringify');
    }
    return rtn;
  }

  getExpandKeyByLevel(level) {
    const list = this.all((node) => {
      return node.depth() <= level;
    });
    return list.map((node) => node.id);
  }

  correctDegree() {
    const { async } = this.config;
    if (async) {
      const { degreePropertyName } = this.config;
      this.model[degreePropertyName] = this.children().length;
    }
    return this;
  }

  getNodeByIndex(expandIds, index) {
    const children = this.children();
    const length = children.length;
    let rtn;
    let base = 0;
    for (let i = 0; i < length; i++) {
      const node = children[i];
      const id = node.id;
      if (base === index) {
        rtn = node;
        break;
      } else {
        base++;
        if (!node.isLeaf() && expandIds.indexOf(id) !== -1) {
          const vLength = node.getVisibleLength(expandIds);
          if (base + vLength > index) {
            rtn = node.getNodeByIndex(expandIds, index - base);
            break;
          } else {
            base += vLength;
          }
        }
      }
      if (rtn) {
        break;
      }
    }
    return rtn;
  }

  getVisibleLength(expandIds) {
    const children = this.children();
    const length = children.length;
    let rtn = 0;
    for (let i = 0; i < length; i++) {
      const node = children[i];
      const id = node.id;
      rtn++;
      if (!node.isLeaf() && expandIds.indexOf(id) !== -1) {
        rtn += node.getVisibleLength(expandIds);
      }
    }
    return rtn;
  }
}

assign(Node, { TRUE, FALSE, INDETERMINATE });

export default Node;
