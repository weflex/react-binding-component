"use strict";

const React = require('react');

/**
 * @class BindingComponent
 */
class BindingComponent extends React.Component {

  /**
   * @getter bindStateValue
   */
  get bindStateValue() {
    return this.props.bindStateName.split('.')
    .reduce((ctx, name) => {
      return ctx && ctx[name];
    }, this.props.bindStateCtx && this.props.bindStateCtx.state);
  }

  /**
   * @getter bindStateValue
   */
  set bindStateValue(val) {
    if (typeof this.props.bindStateType === 'function') {
      if (this.props.bindStateType === Number && isNaN(val)) {
        val = 0;
      } else if (this.props.bindStateType === Boolean && typeof val === 'string') {
        val = (val === 'true') ? true : false;
      } else {
        val = this.props.bindStateType(val);
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

  /**
   * @event onChange
   */
  onChange(event) {
    this.bindStateValue = event.target.value;
  }
}

exports.BindingComponent = BindingComponent;
