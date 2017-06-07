'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = feedEntitiesReducer;

var _actions = require('../../actions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { uniqBy } from 'lodash'

function feedEntitiesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var feedName = action.payload && action.payload.feedName;
  switch (action.type) {
    case _actions.SUCCESS_RECEIVE_FEED:
      // console.log(`
      //   Number of available items -> ${existingItems.length}
      //   Number of new items -> ${action.payload.items.length}
      //   Number of unique items -> ${uniqBy(existingItems.concat(action.payload.items), 'id').length}
      // `);
      return Object.assign({}, state, _defineProperty({}, feedName, [].concat(state[feedName] || [], action.payload.result)));
    default:
      return state;
  }
}