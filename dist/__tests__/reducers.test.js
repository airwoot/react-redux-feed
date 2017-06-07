'use strict';

var _entities = require('../reducers/entities');

var _entities2 = _interopRequireDefault(_entities);

var _paginations = require('../reducers/paginations');

var _paginations2 = _interopRequireDefault(_paginations);

var _errors = require('../reducers/errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FEED_NAME = 'javascriptTweets';

/**
 * feedEntitiesReducer
 * @type {function}
 */

test('entities reducers -> feedEntitiesReducer', function () {
  var feedEntitiesAction = { type: "SUCCESS_RECEIVE_FEED", payload: { feedName: "javascript Subreddit", items: [{ data: { title: 'mock' } }] }, meta: { direction: "initial" } };
  var output = (0, _entities2.default)({}, feedEntitiesAction);
  expect(output).toMatchObject({ 'javascript Subreddit': [{ data: expect.any(Object) }] });
});

/**
 * feedErrorReducer
 * @type {function}
 */

test('error reducer -> feedErrorReducer -> REQUEST_FEED', function () {
  var output = (0, _errors2.default)({}, { type: "REQUEST_FEED", payload: { feedName: FEED_NAME }, meta: { direction: "initial", endpoint: 'api' } });
  expect(output).toMatchObject(_defineProperty({}, FEED_NAME, {}));
});

test('error reducer -> feedErrorReducer -> SUCCESS_RECEIVE_FEED', function () {
  var output = (0, _errors2.default)({}, { type: "SUCCESS_RECEIVE_FEED", payload: { feedName: FEED_NAME }, meta: { direction: "initial", endpoint: 'api' } });
  expect(output).toMatchObject(_defineProperty({}, FEED_NAME, {}));
});

test('error reducer -> feedErrorReducer -> ERROR_RECEIVE_FEED', function () {
  var output = (0, _errors2.default)({}, { type: "ERROR_RECEIVE_FEED", payload: { feedName: FEED_NAME, error: "FEED_NAME Error" }, meta: { direction: "initial", endpoint: 'api' } });
  expect(output).toMatchObject(_defineProperty({}, FEED_NAME, "FEED_NAME Error"));
});

/**
 * PaginationReducerFactory
 * @type {function}
 */

test('Pagination reducer -> PaginationReducerFactory -> REQUEST_FEED', function () {
  var output = (0, _paginations2.default)({}, { type: "REQUEST_FEED", payload: { feedName: FEED_NAME }, meta: { direction: "initial", endpoint: 'api' } });
  expect(output).toMatchObject(_defineProperty({}, FEED_NAME, { below: { isFetching: true } }));
});

test('Pagination reducer -> PaginationReducerFactory -> ERROR_RECEIVE_FEED', function () {
  var output = (0, _paginations2.default)({}, { type: "ERROR_RECEIVE_FEED", payload: { feedName: FEED_NAME }, meta: { direction: "initial", endpoint: 'api' } });
  expect(output).toMatchObject(_defineProperty({}, FEED_NAME, { below: { isFetching: false } }));
});

test('Pagination reducer -> PaginationReducerFactory -> UPDATE_PAGINATION', function () {
  var output = (0, _paginations2.default)({}, { type: "UPDATE_PAGINATION", payload: { feedName: FEED_NAME, url: 'api/next', hasMoreItems: true }, meta: { direction: "initial", endpoint: 'api' } });
  expect(output).toMatchObject(_defineProperty({}, FEED_NAME, { below: { isFetching: false, url: 'api/next', hasMoreItems: true } }));
});