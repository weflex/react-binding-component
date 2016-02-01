# react-binding-component

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]

A react component for data-binding, which makes writing form widget such easy.

## Usage

Extends your component by `BindingComponent`:

```jsx
import { BindingComponent } from 'react-binding-component';

class TextInput extends BindingComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <input 
        onChange={this.onChange.bind(this)} 
        value={this.bindStateValue} 
      />
    );
  }
}
```

In the above example, we are able to use `this.bindStateValue` to access to the binded state and
will have the following `props` in the component `TextInput`:

- `bindStateCtx`: the context of state that you expect to bind on, usually `this`.
- `bindStateType`: the `Function` to convert the value to the corresponding type, like `String`,
  `Number` and etc.
- `bindStateName`: the namespace for accessing from `bindStateCtx.state`, which supports:
  - `name`: the direct access
  - `parent.name`: the dot format

Then use your customized component as below:

```jsx
class ExampleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      config: {
        count: 0
      }
    };
  }
  render() {
    return [
      <TextInput bindStateCtx={this}
        bindStateType={String}
        bindStateName="name" 
      />,
      <TextInput bindStateCtx={this}
        bindStateType={Number}
        bindStateName="config.count" 
      />
    ];
  }
}
```

**What's the different from [rsamec/react-binding]?**

If you have experience on data-binding in react community, you will get known about this light-weight
library. But I would say react-binding-component is more light-weight, and it's more for writing data-binding
integrated UI widget, not for adding the data-binding feature on a native component.

## Installation

```sh
$ npm install react-binding-component --save
```

## License

MIT @ WeFlex, Inc.

[rsamec/react-binding]: https://github.com/rsamec/react-binding
[npm-image]: https://img.shields.io/npm/v/react-binding-component.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-binding-component
[travis-image]: https://img.shields.io/travis/weflex/react-binding-component.js.svg?style=flat-square
[travis-url]: https://travis-ci.org/weflex/react-binding-component.js
[david-image]: http://img.shields.io/david/weflex/react-binding-component.js.svg?style=flat-square
[david-url]: https://david-dm.org/weflex/react-binding-component.js
[downloads-image]: http://img.shields.io/npm/dm/react-binding-component.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-binding-component
