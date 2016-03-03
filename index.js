"use strict";

const React = require('react');

/**
 * BindingComponent
 */
class BindingComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  get bindStateValue() {
    return this.props.bindStateName.split('.')
    .reduce((ctx, name) => {
      return ctx && ctx[name];
    }, this.props.bindStateCtx);
  }
  set bindStateValue(val) {
    if (typeof this.props.bindStateType === 'function') {
      val = this.props.bindStateType(val);
      if (this.props.bindStateType === Number && isNaN(val)) {
        val = 0;
      }
    }
    const names = this.props.bindStateName.split('.');
    if (names.length === 1) {
      this.props.bindStateCtx.setState({
        [names[0]]: val
      });
    } else {
      const newState = this.props.bindStateCtx.state[names[0]];
      const subnames = names.slice(1);
      subnames.reduce((curr, name, index) => {
        if (index === subnames.length - 1) {
          curr[name] = val;
        } else {
          curr = curr[name];
        }
        return curr;
      }, newState);
      this.props.bindStateCtx.setState({
        [names[0]]: newState
      });
    }
  }
  onChange(event) {
    this.bindStateValue = event.target.value;
  }
}

exports.BindingComponent = BindingComponent;