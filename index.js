"use strict";

const assign = require('deep-assign');
const React = require('react');

/**
 * @class BindingComponent
 */
class BindingComponent extends React.Component {

  /**
   * @getter bindStateValue
   */
  get bindStateValue() {
    let path;
    let pathIndex = 0;
    let state;
    try {
      path = this.props.bindStateName.split('.');
      state = this.props.bindStateCtx.state;
      do {
        let subpath = path[pathIndex];
        state = state[subpath];
        pathIndex++;
      } while (pathIndex < path.length);
    } catch (error) {
      return null;
    } finally {
      return state;
    }
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

    this.props.bindStateCtx.setState((prevState, currentProps) => {
      let path;
      let pathReversed;
      let overlay = val;
      let pathIndex = 0;
      try {
        path = currentProps.bindStateName.split('.');
        pathReversed = path.reverse();
      } catch (error) {
        return prevState;
      }
      do {
        let subpath = pathReversed[pathIndex];
        overlay = { [subpath]: overlay };
        pathIndex++;
      } while (pathIndex < pathReversed.length);
      const nextState = assign({}, prevState, overlay);
      const entry = path[0];
      return {
        [entry]: nextState[entry]
      };
    });
  }

  /**
   * @event onChange
   */
  onChange(event) {
    this.bindStateValue = event.target.value;
  }
}

exports.BindingComponent = BindingComponent;
