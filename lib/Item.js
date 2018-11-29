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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _itemTypes = require('./itemTypes');

var _itemTypes2 = _interopRequireDefault(_itemTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  Item: {
    displayName: 'Item'
  }
};

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/Item.jsx',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformCatchErrors2(Component, id);
  };
}

// keep track of horizontal mouse movement
var mouse = {
  lastX: 0
};

function isSamePosition(prevPosition, nextPosition) {
  for (var i = 0; i < prevPosition.length; i++) {
    if (prevPosition[i] !== nextPosition[i]) {
      return false;
    }
  }

  return true;
}

function increaseHorizontalLevel(prevPosition, prevIndex) {
  var nextPosition = prevPosition.slice(0, -1);
  // append to prevSibling's children
  nextPosition.push(prevIndex - 1, -1);
  return nextPosition;
}

function decreaseHorizontalLevel(prevPosition) {
  var nextPosition = prevPosition.slice(0, -1);
  nextPosition[nextPosition.length - 1] += 1;
  return nextPosition;
}

var cardSource = {
  isDragging: function isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
  beginDrag: function beginDrag(props, monitor, component) {
    var node = (0, _reactDom.findDOMNode)(component);

    return {
      id: props.id,
      index: props.index,
      position: props.position,
      data: props.item,
      depth: props.depth,
      // rect for entire component including children
      clientRect: node.getBoundingClientRect()
    };
  }
};

var cardTarget = {
  drop: function drop(props, monitor) {
    // clear mouse position
    mouse.lastX = 0;

    if (!monitor.didDrop()) {
      props.dropItem();
    }
  },
  hover: function hover(props, monitor, component) {
    if (!component) {
      return;
    }

    var item = monitor.getItem();

    // the item being dragged
    var prevPosition = item.position,
        dragItem = item.data,
        dragDepth = item.depth,
        prevIndex = item.index;

    // props for component underneath drag

    var hoverPosition = props.position,
        hoverSiblings = props.siblings,
        maxDepth = props.maxDepth,
        threshold = props.threshold;


    var hoverDepth = hoverPosition.length - 1;
    var totalDepth = hoverDepth + dragDepth;

    // don't exceed max depth
    if (totalDepth > maxDepth) {
      return;
    }

    // determine mouse position
    var clientOffset = monitor.getClientOffset();
    var initialClientOffset = monitor.getInitialClientOffset();

    var hoverNode = (0, _reactDom.findDOMNode)(component);
    // rect for entire component including children
    var hoverClientRect = hoverNode.getBoundingClientRect();

    // rect for item without children
    var hoverItemClientRect = hoverNode.children[0].getBoundingClientRect();

    var isOverSelf = isSamePosition(prevPosition, hoverPosition);

    // set mouse.lastX if it isn't set yet (first hover event)
    mouse.lastX = mouse.lastX || initialClientOffset.x;

    var currMouseX = clientOffset.x;
    var mouseDistanceX = currMouseX - mouse.lastX;
    var nearLeftEdge = currMouseX < hoverClientRect.left + 10;

    // nextPosition will be overwritten when moving horizontally
    var nextPosition = hoverPosition;

    // moving horizontally
    if (isOverSelf && (nearLeftEdge || Math.abs(mouseDistanceX) >= threshold)) {
      // reset lastX for new phase
      mouse.lastX = currMouseX;

      // increase horizontal level
      if (mouseDistanceX > 0 &&
      // has previous sibling
      prevIndex - 1 >= 0 &&
      // isn't at max depth
      prevPosition.length + dragDepth - 1 !== maxDepth) {
        nextPosition = increaseHorizontalLevel(prevPosition, prevIndex);
      }

      // decrease horizontal level
      if (mouseDistanceX < 0 &&
      // is nested
      prevPosition.length > 1 &&
      // is last item in array
      prevIndex === hoverSiblings.length - 1) {
        nextPosition = decreaseHorizontalLevel(prevPosition);
      }
    }

    // don't replace items with themselves
    if (isSamePosition(prevPosition, nextPosition)) {
      return;
    }

    // get vertical middle
    var hoverMiddleY = (hoverClientRect.bottom - hoverClientRect.top) / 2;

    // get pixels to the top
    var hoverClientY = clientOffset.y - hoverClientRect.top;

    // dragging child item to another position with same parent
    if (nextPosition.length === prevPosition.length) {
      var last = nextPosition.length - 1;
      var _prevIndex = prevPosition[last];
      var nextIndex = nextPosition[last];

      // only perform the move when the mouse has crossed half of the items height
      // when dragging downwards, only move when the cursor is below 50%
      // when dragging upwards, only move when the cursor is above 50%

      // dragging downwards
      if (_prevIndex < nextIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // dragging upwards
      if (_prevIndex > nextIndex && hoverClientY > hoverMiddleY) {
        return;
      }
    } else if (
    // dragging child item over parent item
    nextPosition.length < prevPosition.length && nextPosition[nextPosition.length - 1] === prevPosition[prevPosition.length - 2]) {
      var hoverItemMiddleY = (hoverItemClientRect.bottom - hoverItemClientRect.top) / 2;

      // cancel if hovering in lower half of parent item
      if (hoverClientY > hoverItemMiddleY) {
        return;
      }
    } else if (!isOverSelf && clientOffset.y > hoverItemClientRect.bottom) {
      // cancel if over a nested target that isn't its own child
      return;
    }

    // this is where the actual move happens
    props.moveItem({
      dragItem: dragItem,
      prevPosition: prevPosition,
      nextPosition: nextPosition
    }).then(function (nextPos) {
      // note: we're mutating the monitor item here!
      // generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches
      item.position = nextPos;
      item.index = nextPos[nextPos.length - 1];
    });
  }
};

var Item = _wrapComponent('Item')(function (_Component) {
  (0, _inherits3.default)(Item, _Component);

  function Item() {
    (0, _classCallCheck3.default)(this, Item);
    return (0, _possibleConstructorReturn3.default)(this, (Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).apply(this, arguments));
  }

  (0, _createClass3.default)(Item, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      this.props.connectDragPreview((0, _reactDndHtml5Backend.getEmptyImage)(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState, nextContext);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          item = _props.item,
          position = _props.position,
          children = _props.children,
          isDragging = _props.isDragging,
          connectDragSource = _props.connectDragSource,
          connectDropTarget = _props.connectDropTarget,
          useDragHandle = _props.useDragHandle,
          renderItem = _props.renderItem;

      // params passed to renderItem callback

      var renderParams = {
        item: item,
        isDragging: isDragging,
        isPreview: false,
        depth: position.length
      };

      if (useDragHandle) {
        renderParams.connectDragSource = connectDragSource;
        return connectDropTarget(_react3.default.createElement(
          'li',
          null,
          renderItem(renderParams),
          children
        ));
      }

      return (0, _compose2.default)(connectDropTarget, connectDragSource)(_react3.default.createElement(
        'li',
        null,
        renderItem(renderParams),
        children
      ));
    }
  }]);
  return Item;
}(_react2.Component));

var _default = (0, _compose2.default)((0, _getContext2.default)({
  useDragHandle: _propTypes2.default.bool.isRequired,
  maxDepth: _propTypes2.default.number.isRequired,
  threshold: _propTypes2.default.number.isRequired,
  renderItem: _propTypes2.default.func.isRequired,
  moveItem: _propTypes2.default.func.isRequired,
  dropItem: _propTypes2.default.func.isRequired
}), (0, _reactDnd.DropTarget)(_itemTypes2.default.nestedItem, cardTarget, function (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}), (0, _reactDnd.DragSource)(_itemTypes2.default.nestedItem, cardSource, function (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}))(Item);

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mouse, 'mouse', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(isSamePosition, 'isSamePosition', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(increaseHorizontalLevel, 'increaseHorizontalLevel', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(decreaseHorizontalLevel, 'decreaseHorizontalLevel', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(cardSource, 'cardSource', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(cardTarget, 'cardTarget', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(Item, 'Item', 'src/Item.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/Item.jsx');
}();

;