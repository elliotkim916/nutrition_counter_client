import React from 'react';
import '../../index.scss';
export default class Input extends React.Component {
  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = (
        <div className="form-warning">{this.props.meta.warning}</div>
      );
    }
    
    return (
      <div className="form-input">
        <input
          {...this.props.input}
          id = {this.props.input.name}
          type = {this.props.type}
          ref = {input => (this.input = input)}
          placeholder = {this.props.label}
          aria-label = {this.props.input.name}
        />
        <label htmlFor = {this.props.input.name}>
          {error}
          {warning}
        </label>
      </div>
    );
  }
}