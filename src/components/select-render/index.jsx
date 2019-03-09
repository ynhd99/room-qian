import React, { Component } from 'react';
import { Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import { getValueFromEvent } from '../commom/utils';

import './style/index';

const Option = Select.Option;
export function map2OptionsExtra(map) {
  return Object.keys(map).map(key => (
    <Option key={key} disabled={map[key].disabled}>
      {map[key].name}
    </Option>
  ));
}

/**
 * 公共组件 - 选择渲染
 * 前置一个选择框，根据选择渲染不同的内容
 */

class SelectRender extends Component {
  static propTypes = {
    options: PropTypes.array, // 配置
    defaultType: PropTypes.string, // 默认选项
    value: PropTypes.object,
    onChange: PropTypes.func,
    disabled: PropTypes.bool, // 下拉框禁用
    getPopupContainer: PropTypes.func,
  };

  static defaultProps = {
    value: {},
    onChange: () => {},
    getPopupContainer: () => document.body,
  };

  constructor(props) {
    super(props);
    this.selectProps = {
      size: 'large',
      placeholder: '请选择',
      style: { width: '100%' },
      getPopupContainer: this.props.getPopupContainer,
    };

    this.state = {
      value: {
        ...props.value,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.value && nextProps.value.type) {
      this.setState({
        value: {
          ...nextProps.value,
        },
      });
    }
  }

  // 记录每次值变化，更新内部外部状态
  onValueChange = (e, key) => {
    const { value } = this.state;
    const newValue = getValueFromEvent(e);
    value[key] = newValue;

    this.setState({ value });
    this.props.onChange(value);
  };

  renderSecondChoice = () => {
    const { value } = this.state;
    const opt = this.cfgObject[value.type];
    if (opt && !opt.disabled && opt.render) {
      return opt.render(value, this.onValueChange);
    }
    return null;
  };

  render() {
    const { value } = this.state;

    this.cfgObject = this.props.options.reduce((preV, current) => {
      preV[current.key] = current;
      return preV;
    }, {});

    this.selectOptions = map2OptionsExtra(this.cfgObject);

    // 如果找不到type对应的option，则默认展示第一项
    this.defaultType = this.props.defaultType || this.props.options[0].key;
    if (Object.keys(this.cfgObject).indexOf(value.type) === -1) {
      value.type = this.defaultType;
    }

    // 判断布局
    const display = this.cfgObject[value.type].display;

    return (
      <div className="hrui-select-render">
        <Row>
          <Col span="7" style={{ marginTop: -1 }}>
            <Select
              {...this.selectProps}
              disabled={this.props.disabled}
              value={value.type}
              onChange={e => this.onValueChange(e, 'type')}
            >
              {this.selectOptions}
            </Select>
          </Col>
          {display !== 'block' ? (
            <Col span="17" className="fn-pl8">
              {this.renderSecondChoice(value.type)}
            </Col>
          ) : null}
        </Row>
        {display === 'block' ? <div>{this.renderSecondChoice(value.type)}</div> : null}
      </div>
    );
  }
}

export default SelectRender;
