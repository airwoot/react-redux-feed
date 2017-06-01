import feedEntitiesReducer from '../reducers/entities';
import paginations from '../reducers/paginations';
import feedErrorReducer from '../reducers/errors';
import PaginationReducerFactory from '../reducers/paginations'

const FEED_NAME = 'javascriptTweets'

/**
 * feedEntitiesReducer
 * @type {function}
 */

test('entities reducers -> feedEntitiesReducer', () => {
  const feedEntitiesAction = { type: "SUCCESS_RECEIVE_FEED", payload: { feedName: "javascript Subreddit", items: [{data: {title: 'mock'}}]}, meta: {direction: "initial"}}
  const output = feedEntitiesReducer({},feedEntitiesAction)
  expect(output).toMatchObject({ 'javascript Subreddit': [ { data:  expect.any(Object) } ] });
});

/**
 * feedErrorReducer
 * @type {function}
 */

test('error reducer -> feedErrorReducer -> REQUEST_FEED', () => {
  const output = feedErrorReducer({},{ type: "REQUEST_FEED", payload: {feedName: FEED_NAME}, meta: { direction: "initial", endpoint: 'api'}})
  expect(output).toMatchObject({ [FEED_NAME]: {} });
});

test('error reducer -> feedErrorReducer -> SUCCESS_RECEIVE_FEED', () => {
  const output = feedErrorReducer({},{ type: "SUCCESS_RECEIVE_FEED", payload: {feedName: FEED_NAME}, meta: { direction: "initial", endpoint: 'api'}})
  expect(output).toMatchObject({ [FEED_NAME]: {} });
});

test('error reducer -> feedErrorReducer -> ERROR_RECEIVE_FEED', () => {
  const output = feedErrorReducer({},{ type: "ERROR_RECEIVE_FEED", payload: {feedName: FEED_NAME, error: "FEED_NAME Error"}, meta: { direction: "initial", endpoint: 'api'}})
  expect(output).toMatchObject({ [FEED_NAME]: "FEED_NAME Error" });
});

/**
 * PaginationReducerFactory
 * @type {function}
 */

test('Pagination reducer -> PaginationReducerFactory -> REQUEST_FEED', () => {
  const output = PaginationReducerFactory({}, { type: "REQUEST_FEED", payload: {feedName: FEED_NAME}, meta: { direction: "initial", endpoint: 'api'}})
  expect(output).toMatchObject( { [FEED_NAME]: { below: { isFetching: true } } });
});

test('Pagination reducer -> PaginationReducerFactory -> ERROR_RECEIVE_FEED', () => {
  const output = PaginationReducerFactory({}, { type: "ERROR_RECEIVE_FEED", payload: {feedName: FEED_NAME}, meta: { direction: "initial", endpoint: 'api'}})
  expect(output).toMatchObject( { [FEED_NAME]: { below: { isFetching: false } } });
});

test('Pagination reducer -> PaginationReducerFactory -> UPDATE_PAGINATION', () => {
  const output = PaginationReducerFactory({}, { type: "UPDATE_PAGINATION", payload: { feedName: FEED_NAME, url:'api/next', hasMoreItems: true }, meta: { direction: "initial", endpoint: 'api'}})
  expect(output).toMatchObject({ [FEED_NAME]: { below: { isFetching: false, url: 'api/next', hasMoreItems: true } } });
});
