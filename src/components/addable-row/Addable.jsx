import React from 'react';
import PropTypes from 'prop-types';
import { getValueFromEvent } from '../common/utils';

const noop = () => {};

/**
 * AddableMixin 可增加的表单组合核心模块
 */

export default {
  propTypes: {
    onChange: PropTypes.func, // 值变化触发函数，适配rc-form
    value: PropTypes.array, // 值，适配rc-form
    max: PropTypes.number, // 最大项数
    onAddRow: PropTypes.func, // 添加触发函数
    onRemoveRow: PropTypes.func, // 删除触发函数
    options: PropTypes.array, // 配置项，配置每个行|列里面的表单项
    form: PropTypes.object, // 如果options中需要传入formFieldProps，则需要传入rc-form对象
  },

  getDefaultProps() {
    return {
      form: undefined,
      max: Infinity,
      onChange: noop,
      onAddRow: noop,
      onRemoveRow: noop,
    };
  },

  getInitialState() {
    this.uuid = 0;
    return this.transformPropsToStates(this.props, []);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.props.value !== nextProps.value) {
      this.setState(this.transformPropsToStates(nextProps, this.state.keys));
    } else if (typeof nextProps.value === 'undefined') {
      this.setState(this.transformPropsToStates({
        ...nextProps,
        value: [{}],
      }, this.state.keys));
    }
  },

  transformPropsToStates(props, keys) {
    let { value } = props;

    if (!value && keys.length === 0) {
      keys.push(this.uuid);
      value = [{}];
    } else if (value.length < keys.length) {
      // keys 长度小于回填值长度时需要减少
      /* eslint-disable no-param-reassign */
      keys = keys.slice(0, value.length);
    } else {
      for (let i = keys.length; i < value.length; i++) {
        keys.push(++this.uuid);
      }
    }

    // 手动对initialValue进行赋值
    value = value.map(it => {
      return this.setRowInitialValue(it, props);
    });

    return {
      keys,
      value: props.value || [{}],
    };
  },

  setRowInitialValue(row, props = this.props) {
    const { options } = props;
    options.forEach(opt => {
      const { name, formFieldProps } = opt;
      if (formFieldProps && formFieldProps.initialValue) {
        row[name] = row[name] || formFieldProps.initialValue;
      }
    });
    return row;
  },

  addRow() {
    const { max } = this.props;
    const { keys, value } = this.state;

    if (keys.length >= max) {
      return;
    }

    keys.push(++this.uuid);
    value.push(this.setRowInitialValue({}));

    this.props.onAddRow(this.uuid, keys);
    this.setState({ keys, value });
    this.props.onChange(value);
  },

  removeRow(row) {
    let { keys } = this.state;
    const { value } = this.state;
    let removedKey;

    keys = keys.filter((k, index) => {
      if (k === row) {
        removedKey = k;
        value.splice(index, 1);
      }
      return k !== row;
    });

    this.props.onRemoveRow(removedKey, keys);
    this.setState({ keys, value });
    this.props.onChange(value);
  },

  copyRow(row) {
    const { max } = this.props;
    const { keys, value } = this.state;

    if (keys.length >= max) {
      return;
    }

    keys.push(++this.uuid);
    value.push({ ...value[row] });

    this.props.onAddRow(this.uuid, keys);
    this.setState({ keys, value });
    this.props.onChange(value);
  },

  renderElements(rowId, rowIndex, extra) {
    const { options } = this.props;
    const { value } = this.state;

    // 遍历options中的每一个构建元素
    return options.map((cfg, cfgIndex) => {
      let fieldProps = { ...extra };

      if (this.props.form && cfg.formFieldProps) {
        // 需要增加fieldProps，配合rc-form进行校验等功能
        fieldProps = { ...cfg.formFieldProps };
        // 覆盖原来的initialValue & onChange & normalize
        fieldProps.initialValue = value[rowIndex][cfg.name] || fieldProps.initialValue;

        const func = fieldProps.onChange;
        // 箭头函数没有arguments
        fieldProps.onChange = function onChange(e) {
          value[rowIndex][cfg.name] = getValueFromEvent(e);

          if (func) {
            /* eslint-disable prefer-rest-params */
            const args = Array.prototype.slice.call(arguments).concat(rowIndex);
            func.apply(this, args);
          }

          this.props.onChange(value);
          this.setState({ value });
        }.bind(this);

        const func2 = fieldProps.normalize;
        // 箭头函数没有arguments
        fieldProps.normalize = function normalize(v) {
          if (func2) {
            /* eslint-disable prefer-rest-params */
            const args = Array.prototype.slice.call(arguments).concat(rowIndex);
            return func2.apply(this, args);
          }
          return v;
        }.bind(this);

        fieldProps = this.props.form.getFieldProps(`addable-${cfg.name}-${rowId}`, fieldProps);
      } else {
        fieldProps.value = value[rowIndex][cfg.name];
        fieldProps.onChange = (e) => {
          value[rowIndex][cfg.name] = getValueFromEvent(e);
          this.props.onChange(value);
          this.setState({ value });
        };
      }

      return (
        <div key={cfgIndex}>
          {cfg.render(rowIndex, fieldProps)}
        </div>
      );
    });
  },

  // 支持拖动方法
  onDragging(dragIndex, hoverIndex) {
    const { keys, value } = this.state;
    const dragItem = keys[dragIndex];
    const dragValue = value[dragIndex];
    keys.splice(dragIndex, 1);
    keys.splice(hoverIndex, 0, dragItem);
    value.splice(dragIndex, 1);
    value.splice(hoverIndex, 0, dragValue);
    this.setState({ keys, value });
  },

  // 支持拖动方法
  onDragEnd() {
    this.props.onChange(this.state.value);
  },

};
