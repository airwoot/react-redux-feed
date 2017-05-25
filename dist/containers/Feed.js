'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

var _reactSpinkit = require('react-spinkit');

var _reactSpinkit2 = _interopRequireDefault(_reactSpinkit);

var _InfiniteLoadingStream = require('./InfiniteLoadingStream');

var _InfiniteLoadingStream2 = _interopRequireDefault(_InfiniteLoadingStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Div = _glamorous2.default.Div;
var Ul = _glamorous2.default.Ul;
var H2 = _glamorous2.default.H2;


var containerStyle = {
  width: '400px',
  border: '2px solid whitesmoke',
  marginBottom: '30px'
};

var listStyle = {
  listStyleType: 'none'
};

var itemsContainerStyle = {
  height: '500px',
  overflow: 'auto',

  padding: '20px'
};

var headerStyle = {
  borderBottom: '1px solid whitesmoke',
  padding: '20px'
};

var centerAlignLoader = {
  width: '30px',
  margin: 'auto'
};

var Feed = function (_Component) {
  _inherits(Feed, _Component);

  function Feed(props) {
    _classCallCheck(this, Feed);

    return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).call(this, props));
  }

  _createClass(Feed, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchFeed();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // if the data source for the feed
      // has changed, we need to refetch it
      if (this.props.api !== nextProps.api) {
        this.props.fetchFeed();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var items = _props.items;
      var itemComponent = _props.itemComponent;
      var itemIdKey = _props.itemIdKey;
      var name = _props.name;
      var isFetching = _props.isFetching;
      var hasMoreItems = _props.hasMoreItems;
      var headerIcon = _props.headerIcon;
      var fetchFeed = _props.fetchFeed;


      var loadNextPage = function loadNextPage() {
        fetchFeed('below');
      };

      return _react2.default.createElement(
        Div,
        containerStyle,
        _react2.default.createElement(
          H2,
          headerStyle,
          ' ',
          headerIcon(),
          ' ',
          name,
          ' '
        ),
        _react2.default.createElement(
          Div,
          itemsContainerStyle,
          _react2.default.createElement(_InfiniteLoadingStream2.default, _extends({}, this.props, {
            loadNextPage: loadNextPage
          }))
        )
      );
    }
  }]);

  return Feed;
}(_react.Component);

exports.default = Feed;