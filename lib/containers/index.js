import React from 'react'
import { connect } from 'react-redux'
import { schema, denormalize } from 'normalizr'
import { get } from 'lodash'
import { fetchFeedThunkCreator } from '../actions'
import { FEED_REDUCER_KEY } from '../reducers'
import Feed from './Feed'

function denormalizeItems({ state, feedName, itemSchema }) {
  // when we are loading multiple feeds
  // they may share items, so to avoid data redundancy we normalize them
  // which is essentially saving all the entities in one big
  // object indexed by their type and ids
  // then we replace the entities in items by their ids
  // The benefits extends to nested entities inside items as well,
  // so here we *re-create* the item in whole as it was sent over the wire from
  // our normalized store as required by a UI component
  var itemsPathForFeed = `${FEED_REDUCER_KEY}.relationships.${feedName}`
  // place where all entities are stored
  var entitiesPathForFeed = `${FEED_REDUCER_KEY}.entities`

  var normalizedItems = get(state, itemsPathForFeed, [])
  var entities = get(state, entitiesPathForFeed, {})

  return denormalize(normalizedItems, [itemSchema], entities)
}

var mapStateToProps = function(state, ownProps) {
  var feedName = ownProps.name

  ownProps = Object.assign({}, defaults, ownProps)
  // although we are supporting bi-directional pagination â `above` and `below`,
  // loading items in the `above` direction are not supported via scroll *but*
  // dispatching an action while polling for new items. So, a loader or a check
  // whether the feed has more items is unnecessary in the `above` direction.
  // Hence the decision to show a loader or to load further items, *only*
  // concerns the `below` direction
  var direction = 'below'

  var paginationPathForFeed = `${FEED_REDUCER_KEY}.paginations.${feedName}.${direction}`

  var isFetchingPathForFeed = `${paginationPathForFeed}.isFetching`
  var isFetching = get(state, isFetchingPathForFeed, false)

  var hasMoreItemsPathForFeed = `${paginationPathForFeed}.hasMoreItems`
  var moreItems = get(state, hasMoreItemsPathForFeed, false)

  var errorPathForFeed = `${FEED_REDUCER_KEY}.error.${feedName}`
  // Currently we are only tracking errors while fetching *initial* items
  // or fetching *items* in the `below` direction
  var error = get(state, errorPathForFeed, false)

  var itemSchema = ownProps.itemSchema

  return {
    ...ownProps,
    items: denormalizeItems({ state, feedName, itemSchema }),
    isFetching,
    moreItems,
    error
  }
}

var mapDispatchToProps = function(dispatch, ownProps) {
  var feedName = ownProps.name

  return {
    fetchFeed(direction = 'initial') {
      dispatch(fetchFeedThunkCreator({ feedName, direction, ...ownProps }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
