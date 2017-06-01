import {
  requestFeedActionCreator,
  receiveFeedActionCreator,
  errorFeedActionCreator,
  fetchFeedThunkCreator
} from '../actions/index'


test('Testing requestFeedActionCreator [REQUEST_FEED]', () => {
  const output = requestFeedActionCreator('test', 'above', 'api')
  const result = { type: 'REQUEST_FEED', payload: { feedName: 'test' }, meta: { direction: 'above', endpoint: 'api' } }
  expect(result).toMatchObject(output);
});


test('Testing receiveFeedActionCreator [SUCCESS_RECEIVE_FEED]', () => {
  const output = receiveFeedActionCreator('test', 'below', [])
  const result = { type: 'SUCCESS_RECEIVE_FEED', payload: { feedName: 'test', items: [] }, meta: { direction: 'below' } }
  expect(result).toMatchObject(output);
});

test('Testing errorFeedActionCreator [ERROR_RECEIVE_FEED]', () => {
  const output = errorFeedActionCreator('test', 'below', 'error')
  const result = { "type": "ERROR_RECEIVE_FEED", "meta": {"direction": "below", "error": true}, "payload": {"error": "error", "feedName": "test"} }
  expect(result).toMatchObject(output);
});

// TODO: fetchFeedThunkCreator [UPDATE_PAGINATION]  test
