'use strict';

var _index = require('../actions/index');

test('Testing requestFeedActionCreator [REQUEST_FEED]', function () {
  var output = (0, _index.requestFeedActionCreator)('test', 'above', 'api');
  var result = { type: 'REQUEST_FEED', payload: { feedName: 'test' }, meta: { direction: 'above', endpoint: 'api' } };
  expect(result).toMatchObject(output);
});

test('Testing receiveFeedActionCreator [SUCCESS_RECEIVE_FEED]', function () {
  var output = (0, _index.receiveFeedActionCreator)('test', 'below', []);
  var result = { type: 'SUCCESS_RECEIVE_FEED', payload: { feedName: 'test', items: [] }, meta: { direction: 'below' } };
  expect(result).toMatchObject(output);
});

test('Testing errorFeedActionCreator [ERROR_RECEIVE_FEED]', function () {
  var output = (0, _index.errorFeedActionCreator)('test', 'below', 'error');
  var result = { "type": "ERROR_RECEIVE_FEED", "meta": { "direction": "below", "error": true }, "payload": { "error": "error", "feedName": "test" } };
  expect(result).toMatchObject(output);
});

// TODO: fetchFeedThunkCreator [UPDATE_PAGINATION]  test