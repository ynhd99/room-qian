import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

export default {
  propTypes: {
    className: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.array,
    deselect: PropTypes.bool,
    limit: PropTypes.number,
    limitedDisable: PropTypes.bool,
    onLimitExceeded: PropTypes.func,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
  },
  getDefaultProps() {
    return {
      options: [],
      deselect: false,
      limitedDisable: true,
      onLimitExceeded() {},
      onChange() {},
    };
  },
  getState() {
    const { options } = this.props;
    let tagList;
    if (options && options.length && typeof options[0] === 'string') {
      tagList = options.map(v => {
        return {
          label: v,
          value: v,
        };
      });
    } else {
      tagList = options;
    }
    let selected;
    if ('value' in this.props) {
      selected = this.props.value || [];
    } else if ('defaultValue' in this.props) {
      selected = this.props.defaultValue || [];
    } else {
      selected = [];
    }
    return {
      tagList,
      selected,
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        selected: nextProps.value || [],
      });
    }
  },
  check(label, value) {
    const selectedArr = [];
    const { deselect, limit, limitedDisable, onLimitExceeded, onChange } = this.props;
    const { tagList, selected, radioMode } = this.state;
    const index = selected.indexOf(value);
    if (radioMode) {
      selected.splice(0, selected.length);
      if (!deselect || index === -1) {
        selected.push(value);
      }
    } else if (index > -1) {
      selected.splice(index, 1);
    } else {
      if (limit !== undefined && selected.length > limit - 1) {
        onLimitExceeded();
        return;
      }
      selected.push(value);
    }
    tagList.forEach(v => {
      if (selected.indexOf(v.value) > -1) selectedArr.push(v.value);
    });
    this.setState({
      disableAll: !radioMode && limitedDisable && selected.length >= limit,
      selected: selectedArr,
    }, () => onChange(selectedArr, { label, value }));
  },
  render() {
    const { className, style } = this.props;
    const { tagList, disableAll } = this.state;
    let { selected } = this.state;
    if ('value' in this.props) {
      selected = this.props.value || [];
    }
    const tags = tagList.map(v => {
      let cls;
      if (selected.indexOf(v.value) > -1) {
        cls = 'hermes-tagselect-checked';
      } else if (v.disabled || disableAll) {
        cls = 'hermes-tagselect-disabled';
      } else {
        cls = 'hermes-tagselect-checkable';
      }
      return (<Tag
        className={cls}
        key={v.value}
        disabled={v.disabled}
        onClick={() => !v.disabled && this.check(v.label, v.value)}>
        {v.label}
      </Tag>);
    });
    return (this.props.options.length ? <div className={`hermes-tagselect${className ? ` ${className}` : ''}`} style={style}>
      {tags}
    </div> : null);
  },
};
