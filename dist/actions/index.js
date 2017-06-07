'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchFeedThunkCreator = exports.UPDATE_PAGINATION = exports.ERROR_RECEIVE_FEED = exports.SUCCESS_RECEIVE_FEED = exports.REQUEST_FEED = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.requestFeedActionCreator = requestFeedActionCreator;
exports.receiveFeedActionCreator = receiveFeedActionCreator;
exports.errorFeedActionCreator = errorFeedActionCreator;

require('whatwg-fetch');

var _isUrl = require('is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

var _reducers = require('../reducers');

var _normalizr = require('normalizr');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REQUEST_FEED = exports.REQUEST_FEED = 'REQUEST_FEED';
var SUCCESS_RECEIVE_FEED = exports.SUCCESS_RECEIVE_FEED = 'SUCCESS_RECEIVE_FEED';
var ERROR_RECEIVE_FEED = exports.ERROR_RECEIVE_FEED = 'ERROR_RECEIVE_FEED';
var UPDATE_PAGINATION = exports.UPDATE_PAGINATION = 'UPDATE_PAGINATION';

function requestFeedActionCreator(feedName, direction, endpoint) {
  return {
    type: REQUEST_FEED,
    payload: {
      feedName: feedName
    },
    meta: {
      direction: direction,
      endpoint: endpoint
    }
  };
}

function receiveFeedActionCreator(feedName, direction, data) {
  return {
    type: SUCCESS_RECEIVE_FEED,
    payload: _extends({
      feedName: feedName
    }, data),
    meta: {
      direction: direction
    }
  };
}

function errorFeedActionCreator(feedName, direction, error) {
  return {
    type: ERROR_RECEIVE_FEED,
    meta: {
      error: true,
      direction: direction
    },
    payload: {
      feedName: feedName,
      error: error
    }
  };
}

function updatePaginationDetails(feedName, direction, url, hasMoreItems) {
  return {
    type: UPDATE_PAGINATION,
    payload: {
      feedName: feedName,
      url: url,
      hasMoreItems: hasMoreItems
    },
    meta: {
      direction: direction
    }
  };
}

function getPaginationDetails(state, feedName) {
  return state[_reducers.FEED_REDUCER_KEY].paginations[feedName];
}

function getNormalizedItems(_ref) {
  var results = _ref.results;
  var getItems = _ref.getItems;
  var itemSchema = _ref.itemSchema;
  var _ref$itemIdKey = _ref.itemIdKey;
  var itemIdKey = _ref$itemIdKey === undefined ? 'id' : _ref$itemIdKey;

  if (!(itemSchema instanceof _normalizr.schema.Entity)) {
    itemSchema = new _normalizr.schema.Entity('items', {}, {
      idAttribute: itemIdKey
    });
  }

  return (0, _normalizr.normalize)(getItems(results), [itemSchema]);
}

var fetchFeedThunkCreator = exports.fetchFeedThunkCreator = function fetchFeedThunkCreator(config) {
  var defaultGetItems = function defaultGetItems(items) {
    return items;
  };
  var feedName = config.feedName;
  var direction = config.direction;
  var _config$getItems = config.getItems;
  var getItems = _config$getItems === undefined ? defaultGetItems : _config$getItems;
  var getInitialEndpoint = config.getInitialEndpoint;
  var updateEndpoint = config.updateEndpoint;
  var hasMoreItems = config.hasMoreItems;
  var itemSchema = config.itemSchema;
  var itemIdKey = config.itemIdKey;


  return function fetchFeedThunk(dispatch, getState) {
    var paginationDetails = getPaginationDetails(getState(), feedName);
    var endpoint;
    // check whether the feed is getting fetched
    // for the first time
    // feeds getting for fetched for the first time needs
    // to use the endpoint as passed by the user
    // subsequent fetches uses the endpoint as a result of updating
    // the endpoint from the previous response
    if (paginationDetails === undefined || paginationDetails === null) {
      endpoint = getInitialEndpoint(getState);
      if (!(0, _isUrl2.default)(endpoint)) {
        console.error('The initial endpoint ${endpoint} is not a valid url');
        return;
      }
    } else {
      endpoint = paginationDetails[direction].url;
    }

    // if the api source has already notified
    // there are no more items to fetch
    // we don't have any further actions
    // to dispatch
    if (paginationDetails && paginationDetails[direction] && !paginationDetails[direction].hasMoreItems) {
      return;
    }

    dispatch(requestFeedActionCreator(feedName, direction, endpoint));
    // console.log(`Endpoint called --> ${endpoint}`);
    fetch(endpoint).then(function (response) {
      if (!response.ok) {
        throw new Error('Request to feed endpoint not successful. Response status ' + response.status + ' returned for ' + response.url);
      }

      var headers = response.headers;

      return response.json().then(function (results) {
        var items = getItems(results);
        var nextPageUrl = updateEndpoint({ headers: headers, results: results, direction: direction });
        var moreItems = hasMoreItems({ headers: headers, results: results, direction: direction });
        var normalizedItems = getNormalizedItems({
          results: results,
          getItems: getItems,
          itemSchema: itemSchema,
          itemIdKey: itemIdKey
        });
        // console.log(`
        //   New endpoint to update -> ${nextPageUrl} ${results} from ${endpoint}
        //   New items are present? ${moreItems}
        // `);
        dispatch(updatePaginationDetails(feedName, direction, nextPageUrl, moreItems));

        dispatch(receiveFeedActionCreator(feedName, direction, normalizedItems));
      });
    }).catch(function dispatchFailureFetchAction(error) {
      dispatch(errorFeedActionCreator(feedName, direction, error.message));
    });
  };
};