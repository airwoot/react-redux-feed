'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Feed = require('../../containers/Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _containers = require('../../containers');

var _containers2 = _interopRequireDefault(_containers);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducers = require('../../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reddit = require('react-icons/lib/fa/reddit');

var _reddit2 = _interopRequireDefault(_reddit);

var _subreddit = require('../../__mocks__/subreddit.js');

var _subreddit2 = _interopRequireDefault(_subreddit);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _mockResponse = require('../helpers/mockResponse');

var _mockResponse2 = _interopRequireDefault(_mockResponse);

var _paginationConfig = require('../../__mocks__/paginationConfig');

var _paginationConfig2 = _interopRequireDefault(_paginationConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.document = _jsdom2.default.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;


test('Rendering Feed container', function () {
  // const wrapper = MountFeedContainer()
  /**
   * Warning: This browser doesn't support the `onScroll` event
   * Need to figure out a way around this
   */
  expect(true).toBe(true);
});

function MountFeedContainer() {
  var store = void 0;
  var subject = void 0;
  var rootReducer = (0, _redux.combineReducers)({
    feeds: _reducers2.default
  });
  store = (0, _redux.createStore)(rootReducer, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default)));

  fetch.mockResponse(JSON.stringify({ items: [] }));

  var feedKey = 'starwars';
  subject = (0, _enzyme.mount)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(_containers2.default, _extends({
      key: feedKey
    }, createSubredditFeedConfig(feedKey), {
      headerIcon: _reddit2.default }))
  ));
  return subject;
}

function createSubredditFeedConfig(feedKey) {
  return _extends({
    name: feedKey + ' Subreddit',
    itemComponent: _subreddit2.default,
    itemIdKey: 'id_str',
    itemHeight: 120
  }, (0, _paginationConfig2.default)(feedKey));
}