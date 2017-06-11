import 'whatwg-fetch'
import isUrl from 'is-url'
import { FEED_REDUCER_KEY } from '../reducers'
import { normalize, schema } from 'normalizr'
import { isEmpty } from 'lodash'

export const REQUEST_FEED = 'REQUEST_FEED'
export const SUCCESS_RECEIVE_FEED = 'SUCCESS_RECEIVE_FEED'
export const ERROR_RECEIVE_FEED = 'ERROR_RECEIVE_FEED'
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'

export function requestFeedActionCreator(feedName, direction, endpoint) {
  return {
    type: REQUEST_FEED,
    payload: {
      feedName
    },
    meta: {
      direction,
      endpoint
    }
  }
}

export function receiveFeedActionCreator(feedName, direction, data) {
  return {
    type: SUCCESS_RECEIVE_FEED,
    payload: {
      feedName,
      ...data
    },
    meta: {
      direction
    }
  }
}

export function errorFeedActionCreator(feedName, direction, error) {
  return {
    type: ERROR_RECEIVE_FEED,
    meta: {
      error: true,
      direction
    },
    payload: {
      feedName,
      error
    }
  }
}

function updatePaginationDetails(feedName, direction, url, hasMoreItems) {
  return {
    type: UPDATE_PAGINATION,
    payload: {
      feedName,
      url,
      hasMoreItems
    },
    meta: {
      direction
    }
  }
}

function getPaginationDetails(state, feedName) {
  return state[FEED_REDUCER_KEY].paginations[feedName]
}

function getNormalizedItems({ result, getItems, itemSchema }) {
  // whatever be the result, we are always expect it to be
  // an array of items, so we are using the shorthand here
  // for `schema.Array`
  return normalize(getItems(result), [itemSchema])
}

export var fetchFeedThunkCreator = function(config) {
  var {
    feedName,
    direction,
    getItems,
    getInitialEndpoint,
    updateEndpoint,
    hasMoreItems,
    itemSchema,
    itemIdKey
  } = config

  return function fetchFeedThunk(dispatch, getState) {
    var paginationDetails = getPaginationDetails(getState(), feedName)
    var endpoint
    // check whether the feed is getting fetched
    // for the first time
    // feeds getting for fetched for the first time needs
    // to use the endpoint as passed by the user
    // subsequent fetches uses the endpoint as a result of updating
    // the endpoint from the previous response
    if (isEmpty(paginationDetails)) {
      endpoint = getInitialEndpoint(getState)
      if (!isUrl(endpoint)) {
        console.error('The initial endpoint ${endpoint} is not a valid url')
        return
      }
    } else {
      endpoint = paginationDetails[direction].url
    }

    // if the api source has already notified
    // there are no more items to fetch
    // we don't have any further actions
    // to dispatch
    if (
      paginationDetails &&
      paginationDetails[direction] &&
      !paginationDetails[direction].hasMoreItems
    ) {
      return
    }

    dispatch(requestFeedActionCreator(feedName, direction, endpoint))
    // console.log(`Endpoint called --> ${endpoint}`);
    fetch(endpoint)
      .then(function(response) {
        if (!response.ok) {
          throw new Error(
            `Request to feed endpoint not successful. Response status ${response.status} returned for ${response.url}`
          )
        }

        var headers = response.headers

        return response.json().then(function(results) {
          var items = getItems(results)
          var nextPageUrl = updateEndpoint({ headers, results, direction })
          var moreItems = hasMoreItems({ headers, results, direction })
          var normalizedItems = getNormalizedItems({
            result,
            getItems,
            itemSchema
          })
          // console.log(`
          //   New endpoint to update -> ${nextPageUrl} ${results} from ${endpoint}
          //   New items are present? ${moreItems}
          // `);
          dispatch(
            updatePaginationDetails(feedName, direction, nextPageUrl, moreItems)
          )

          dispatch(
            receiveFeedActionCreator(feedName, direction, normalizedItems)
          )
        })
      })
      .catch(function dispatchFailureFetchAction(error) {
        dispatch(errorFeedActionCreator(feedName, direction, error.message))
      })
  }
}
