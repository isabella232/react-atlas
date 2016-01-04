import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './input.css';

const propTypes = {
    "disabled": PropTypes.bool,
    "className": PropTypes.string,
    "htmlFor": PropTypes.string,
    "maxLength": PropTypes.number,
    "inputText": PropTypes.string,
    "focus": PropTypes.string
  };

const defaultProps = {
    "disabled": false,
    "type": 'text',
    "inputLength": 0,
    "focus": false
  };

class Input extends Component {
  render () {
    const { disabled, labelText, maxLength, multiline, type, value, ...others} = this.props;

    let cx = classNames.bind(style);

    let inputClassName = cx({
      "input": true,
      "disabled": disabled,
      "multiline": multiline,
      "value": value
    });

    if(this.props.className) inputClassName += ` ${this.props.className}`;

    return (
      <div data-react-toolbox='input'>
        <label className={style.label} {...this.props} >{labelText}</label>
        <input className={inputClassName} {...this.props} onChange={this.props.onChange} type={type} ref='input'/>
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;