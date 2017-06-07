'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FEED_REDUCER_KEY = undefined;

var _redux = require('redux');

var _entities = require('./entities');

var _entities2 = _interopRequireDefault(_entities);

var _relationships = require('./relationships');

var _relationships2 = _interopRequireDefault(_relationships);

var _paginations = require('./paginations');

var _paginations2 = _interopRequireDefault(_paginations);

var _errors = require('./errors');

var _errors2 = _interopRequireDefault(_errors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
  entities: _entities2.default,
  relationships: _relationships2.default,
  paginations: _paginations2.default,
  errors: _errors2.default
});
var FEED_REDUCER_KEY = exports.FEED_REDUCER_KEY = 'feeds';