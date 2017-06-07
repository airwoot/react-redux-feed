'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _normalizr = require('normalizr');

var _actions = require('../actions');

var _reducers = require('../reducers');

var _Feed = require('./Feed');

var _Feed2 = _interopRequireDefault(_Feed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var feedName = ownProps.name;
  var isFetching = state.feeds.paginations[feedName] ? state.feeds.paginations[feedName].below.isFetching : false;
  var moreItems = state.feeds.paginations[feedName] ? state.feeds.paginations[feedName].below.hasMoreItems : false;

  var error;

  var itemSchema = ownProps.itemSchema || new schema.Entity('items');

  if (state.feeds.errors[feedName] !== undefined) {
    var feedError = state.feeds.errors[feedName];
    if ((typeof feedError === 'undefined' ? 'undefined' : _typeof(feedError)) === 'object' && Object.keys(feedError).length === 0) {
      error = false;
    } else if (typeof feedError === 'string' && feedError.length === 0) {
      error = false;
    } else {
      error = feedError;
    }
  } else {
    error = false;
  }

  var items = [];

  // if the feed has been already mounted, our
  // redux store will have an corresponding state slice
  // for the feed
  if (state[_reducers.FEED_REDUCER_KEY].relationships[feedName]) {
    items = (0, _normalizr.denormalize)(state[_reducers.FEED_REDUCER_KEY].relationships[feedName], [itemSchema], state[_reducers.FEED_REDUCER_KEY].entities);
  }

  return _extends({
    items: items,
    isFetching: isFetching,
    error: error,
    moreItems: moreItems
  }, ownProps);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  var feedName = ownProps.name;

  return {
    fetchFeed: function fetchFeed() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';

      dispatch((0, _actions.fetchFeedThunkCreator)(_extends({ feedName: feedName, direction: direction }, ownProps)));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Feed2.default);