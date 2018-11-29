'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  Container: {
    displayName: 'Container'
  }
};

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/Container.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformCatchErrors2(Component, id);
  };
}

function getDepth(item, childrenProperty) {
  // returns depth of item and children
  var depth = 0;

  if (item[childrenProperty]) {
    item[childrenProperty].forEach(function (d) {
      var tmpDepth = getDepth(d, childrenProperty);

      if (tmpDepth > depth) {
        depth = tmpDepth;
      }
    });
  }

  return depth + 1;
}

var Container = _wrapComponent('Container')(function (_Component) {
  (0, _inherits3.default)(Container, _Component);

  function Container() {
    (0, _classCallCheck3.default)(this, Container);
    return (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || (0, _getPrototypeOf2.default)(Container)).apply(this, arguments));
  }

  (0, _createClass3.default)(Container, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          items = _props.items,
          parentPosition = _props.parentPosition,
          childrenProperty = _props.childrenProperty,
          childrenStyle = _props.childrenStyle,
          topLevel = _props.topLevel;


      return _react3.default.createElement(
        'ol',
        { style: topLevel ? {} : childrenStyle },
        items.map(function (item, i) {
          var position = parentPosition.concat([i]);
          var children = item[childrenProperty];

          return _react3.default.createElement(
            _Item2.default,
            {
              id: item.id,
              key: item.id,
              item: item,
              index: i,
              siblings: items,
              position: position,
              depth: getDepth(item, childrenProperty)
            },
            children && children.length ? _react3.default.createElement(WrappedContainer, {
              items: children,
              parentPosition: position,
              childrenProperty: childrenProperty,
              childrenStyle: childrenStyle
            }) : null
          );
        })
      );
    }
  }]);
  return Container;
}(_react2.Component));

var WrappedContainer = (0, _pure2.default)(Container);

var _default = WrappedContainer;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getDepth, 'getDepth', 'src/Container.jsx');

  __REACT_HOT_LOADER__.register(Container, 'Container', 'src/Container.jsx');

  __REACT_HOT_LOADER__.register(WrappedContainer, 'WrappedContainer', 'src/Container.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Container.jsx');
}();

;