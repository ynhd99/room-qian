import React, { Component } from 'react';
import { Select, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style/index';

const InputGroup = Input.Group;
const Option = Select.Option;
const empty = () => {};

class SearchInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    fetchData: PropTypes.func,
    onSearch: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    size: 'default',
    placeholder: '',
    fetchData: empty,
  }

  constructor(props) {
    super(props);
    let value;
    if ('value' in this.props) {
      value = this.props.value !== undefined ? this.props.value : '';
    } else if ('defaultValue' in this.props) {
      value = this.props.defaultValue !== undefined ? this.props.defaultValue : '';
    } else {
      value = '';
    }
    this.state = {
      selectMode: this.props.fetchData !== empty,
      data: [],
      value,
      focus: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  fetch = (value) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.currentValue = value;
    this.timeout = setTimeout(() => this.props.fetchData.call(null, value, (cbValue, cbData = []) => {
      if (this.currentValue === cbValue) {
        this.setState({ data: cbData });
      }
    }), 300);
  }

  handleChange = (param) => {
    const { selectMode } = this.state;
    const value = selectMode ? param : param.target.value;
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    if (selectMode) {
      this.fetch(value);
    }
  }

  handleFocusBlur = (e) => {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  handleSearch = () => {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const { className, style, size, placeholder } = this.props;
    const { selectMode, value, focus, data } = this.state;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': focus,
    });
    const commonProps = {
      size,
      placeholder,
      value: 'value' in this.props && this.props.value !== undefined ? this.props.value : value,
      onChange: this.handleChange,
      onFocus: this.handleFocusBlur,
      onBlur: this.handleFocusBlur,
    };
    const options = data.map(d => <Option disabled={d.disabled} key={d.key}>{d.value}</Option>);
    return (
      <div className={`hermes-search-input ant-search-input-wrapper${className ? ` ${className}` : ''}`} style={style}>
        <InputGroup className={searchCls}>
          {selectMode ? <Select
            {...commonProps}
            combobox
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
          >
            {options}
          </Select> : <Input
            {...commonProps}
            onPressEnter={this.handleSearch}
          />}
          <div className="ant-input-group-wrap">
            <Button icon="search" className={btnCls} size={size} onClick={this.handleSearch} />
          </div>
        </InputGroup>
      </div>
    );
  }
}

export default SearchInput;
