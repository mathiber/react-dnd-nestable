'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsUpdate = require('react-addons-update');

var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _DragLayer = require('./DragLayer');

var _DragLayer2 = _interopRequireDefault(_DragLayer);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  Nestable: {
    displayName: 'Nestable'
  }
};

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/Nestable.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformCatchErrors2(Component, id);
  };
}

function createSpliceCommand(position) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var command = {};
  var itemsToInsert = options.itemsToInsert || [];
  var lastIndex = position.length - 1;
  var currCommand = command;

  position.forEach(function (index, i) {
    if (i === lastIndex) {
      currCommand.$splice = [[index, options.numToRemove].concat((0, _toConsumableArray3.default)(itemsToInsert))];
    } else {
      var nextCommand = {};
      currCommand[index] = (0, _defineProperty3.default)({}, options.childrenProperty, nextCommand);
      currCommand = nextCommand;
    }
  });

  return command;
}

function replaceNegativeIndex(items, nextPosition, childrenProperty) {
  var currItems = items;

  return nextPosition.map(function (nextIndex) {
    if (nextIndex !== -1) {
      currItems = currItems[nextIndex][childrenProperty] || [];
      return nextIndex;
    }

    return currItems.length;
  });
}

function getRealNextPosition(prev, next) {
  // moving up a level
  if (prev.length < next.length) {
    return next.map(function (nextIndex, i) {
      if (typeof prev[i] !== 'number') {
        return nextIndex;
      }
      return nextIndex > prev[i] ? nextIndex - 1 : nextIndex;
    });
  }

  return next;
}

var Nestable = _wrapComponent('Nestable')((_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Nestable, _Component);

  function Nestable() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Nestable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Nestable.__proto__ || (0, _getPrototypeOf2.default)(Nestable)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      items: _this.props.items
    }, _this.moveItem = function () {
      var _this2;

      return (_this2 = _this).__moveItem__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _this.dropItem = function () {
      var _this3;

      return (_this3 = _this).__dropItem__REACT_HOT_LOADER__.apply(_this3, arguments);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Nestable, [{
    key: '__dropItem__REACT_HOT_LOADER__',
    value: function __dropItem__REACT_HOT_LOADER__() {
      return this.__dropItem__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__moveItem__REACT_HOT_LOADER__',
    value: function __moveItem__REACT_HOT_LOADER__() {
      return this.__moveItem__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var _props = this.props,
          useDragHandle = _props.useDragHandle,
          maxDepth = _props.maxDepth,
          threshold = _props.threshold,
          renderItem = _props.renderItem;


      return {
        useDragHandle: useDragHandle,
        maxDepth: maxDepth,
        threshold: threshold,
        renderItem: renderItem,
        moveItem: this.moveItem,
        dropItem: this.dropItem
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.items !== this.state.items) {
        this.setState({ items: newProps.items });
      }
    }
  }, {
    key: '__moveItem__REACT_HOT_LOADER__',
    value: function __moveItem__REACT_HOT_LOADER__(_ref2) {
      var dragItem = _ref2.dragItem,
          prevPosition = _ref2.prevPosition,
          nextPosition = _ref2.nextPosition;
      var childrenProperty = this.props.childrenProperty;

      var newItems = this.state.items;

      // the remove action might affect the next position,
      // so update next coordinates accordingly
      var realNextPosition = getRealNextPosition(prevPosition, nextPosition);

      if (realNextPosition[realNextPosition.length - 1] === -1) {
        realNextPosition = replaceNegativeIndex(newItems, realNextPosition, childrenProperty);
      }

      // remove item from old position
      var removeItem = createSpliceCommand(prevPosition, {
        numToRemove: 1,
        childrenProperty: childrenProperty
      });

      // add item to new position
      var insertItem = createSpliceCommand(realNextPosition, {
        numToRemove: 0,
        itemsToInsert: [dragItem],
        childrenProperty: childrenProperty
      });

      newItems = (0, _reactAddonsUpdate2.default)(newItems, removeItem);
      newItems = (0, _reactAddonsUpdate2.default)(newItems, insertItem);

      this.setState({ items: newItems });

      return _promise2.default.resolve(realNextPosition);
    }
  }, {
    key: '__dropItem__REACT_HOT_LOADER__',
    value: function __dropItem__REACT_HOT_LOADER__() {
      this.props.onUpdate(this.state.items);
    }
  }, {
    key: 'render',
    value: function render() {
      var items = this.state.items;
      var _props2 = this.props,
          renderItem = _props2.renderItem,
          childrenProperty = _props2.childrenProperty,
          childrenStyle = _props2.childrenStyle;


      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(_Container2.default, {
          items: items,
          parentPosition: [],
          childrenProperty: childrenProperty,
          childrenStyle: childrenStyle,
          topLevel: true
        }),
        _react3.default.createElement(_DragLayer2.default, {
          renderItem: renderItem,
          childrenProperty: childrenProperty,
          childrenStyle: childrenStyle
        })
      );
    }
  }]);
  return Nestable;
}(_react2.Component), _class.defaultProps = {
  items: [],
  childrenProperty: 'children',
  childrenStyle: {},
  onUpdate: function onUpdate() {},
  renderItem: function renderItem() {
    throw new Error('Nestable: You must supply a renderItem prop.');
  },
  useDragHandle: false,
  maxDepth: Infinity,
  threshold: 30
}, _class.childContextTypes = {
  useDragHandle: _propTypes2.default.bool.isRequired,
  maxDepth: _propTypes2.default.number.isRequired,
  threshold: _propTypes2.default.number.isRequired,
  renderItem: _propTypes2.default.func.isRequired,
  moveItem: _propTypes2.default.func.isRequired,
  dropItem: _propTypes2.default.func.isRequired
}, _temp2));

var _default = (0, _pure2.default)(Nestable);

exports.default = _default;
;

var _temp3 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createSpliceCommand, 'createSpliceCommand', 'src/Nestable.jsx');

  __REACT_HOT_LOADER__.register(replaceNegativeIndex, 'replaceNegativeIndex', 'src/Nestable.jsx');

  __REACT_HOT_LOADER__.register(getRealNextPosition, 'getRealNextPosition', 'src/Nestable.jsx');

  __REACT_HOT_LOADER__.register(Nestable, 'Nestable', 'src/Nestable.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Nestable.jsx');
}();

;