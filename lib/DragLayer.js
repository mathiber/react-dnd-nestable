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

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reactDnd = require('react-dnd');

var _itemTypes = require('./itemTypes');

var _itemTypes2 = _interopRequireDefault(_itemTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  CustomDragLayer: {
    displayName: 'CustomDragLayer'
  }
};

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/DragLayer.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformCatchErrors2(Component, id);
  };
}

var layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0
};

function getItemStyles(props, clientRect) {
  var initialOffset = props.initialOffset,
      currentOffset = props.currentOffset;

  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  var x = currentOffset.x,
      y = currentOffset.y;
  var width = clientRect.width,
      height = clientRect.height;

  var transform = 'translate(' + x + 'px, ' + y + 'px)';

  return {
    transform: transform,
    WebkitTransform: transform,
    width: width,
    height: height
  };
}

var noopConnectDragSource = function noopConnectDragSource(el) {
  return el;
};

var CustomDragLayer = _wrapComponent('CustomDragLayer')(function (_Component) {
  (0, _inherits3.default)(CustomDragLayer, _Component);

  function CustomDragLayer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CustomDragLayer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CustomDragLayer.__proto__ || (0, _getPrototypeOf2.default)(CustomDragLayer)).call.apply(_ref, [this].concat(args))), _this), _this.getChildren = function () {
      var _this2;

      return (_this2 = _this).__getChildren__REACT_HOT_LOADER__.apply(_this2, arguments);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CustomDragLayer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.isDragging !== nextProps.isDragging) {
        document.body.classList.toggle('dnd-dragging');
      }
    }
  }, {
    key: '__getChildren__REACT_HOT_LOADER__',
    value: function __getChildren__REACT_HOT_LOADER__(items, depth) {
      var _this3 = this;

      var _props = this.props,
          renderItem = _props.renderItem,
          childrenProperty = _props.childrenProperty,
          childrenStyle = _props.childrenStyle;


      if (!items || !items.length) {
        return null;
      }

      return _react3.default.createElement(
        'ol',
        { style: childrenStyle },
        items.map(function (item, i) {
          return _react3.default.createElement(
            'li',
            { key: i },
            renderItem({
              item: item,
              isDragging: false,
              isPreview: true,
              depth: depth,
              connectDragSource: noopConnectDragSource
            }),
            _this3.getChildren(item[childrenProperty], depth + 1)
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          item = _props2.item,
          itemType = _props2.itemType,
          renderItem = _props2.renderItem,
          isDragging = _props2.isDragging,
          childrenProperty = _props2.childrenProperty;


      if (!isDragging || itemType !== _itemTypes2.default.nestedItem) {
        return null;
      }

      return _react3.default.createElement(
        'div',
        { style: layerStyles },
        _react3.default.createElement(
          'div',
          { style: getItemStyles(this.props, item.clientRect) },
          renderItem({
            item: item.data,
            isDragging: false,
            isPreview: true,
            depth: 1,
            connectDragSource: noopConnectDragSource
          }),
          this.getChildren(item.data[childrenProperty], 2)
        )
      );
    }
  }]);
  return CustomDragLayer;
}(_react2.Component));

var _default = (0, _compose2.default)((0, _reactDnd.DragLayer)(function (monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}), _pure2.default)(CustomDragLayer);

exports.default = _default;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(layerStyles, 'layerStyles', 'src/DragLayer.jsx');

  __REACT_HOT_LOADER__.register(getItemStyles, 'getItemStyles', 'src/DragLayer.jsx');

  __REACT_HOT_LOADER__.register(noopConnectDragSource, 'noopConnectDragSource', 'src/DragLayer.jsx');

  __REACT_HOT_LOADER__.register(CustomDragLayer, 'CustomDragLayer', 'src/DragLayer.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/DragLayer.jsx');
}();

;