import React from 'react'
import { connect } from 'react-redux'
import { fetchFeedThunkCreator } from '../actions'
import { FEED_REDUCER_KEY } from '../reducers'
import Feed from './Feed'

var mapStateToProps = function(state, ownProps) {
  var feedName = ownProps.name
  var isFetching = state.feeds.paginations[feedName]
    ? state.feeds.paginations[feedName].below.isFetching
    : false
  var moreItems = state.feeds.paginations[feedName]
    ? state.feeds.paginations[feedName].below.hasMoreItems
    : false

  var error

  if (state.feeds.errors[feedName] !== undefined) {
    var feedError = state.feeds.errors[feedName]
    if (typeof feedError === 'object' && Object.keys(feedError).length === 0) {
      error = false
    } else if (typeof feedError === 'string' && feedError.length === 0) {
      error = false
    } else {
      error = feedError
    }
  } else {
    error = false
  }

  var items = []

  // if the feed has been already mounted, our
  // redux store will have an corresponding state slice
  // for the feed
  if (state[FEED_REDUCER_KEY].entities[feedName]) {
    items = state.feeds.entities[feedName]
  }

  return {
    items,
    isFetching,
    error,
    moreItems,
    ...ownProps
  }
}



var mapDispatchToProps = function(dispatch, ownProps) {
  var feedName = ownProps.name
  var { getItems, getInitialEndpoint, updateEndpoint, hasMoreItems } = ownProps
  return {
    fetchFeed(direction = 'initial') {
      dispatch(
        fetchFeedThunkCreator(
          feedName,
          direction,
          getItems,
          getInitialEndpoint,
          updateEndpoint,
          hasMoreItems
        )
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
