import React from 'react'
import { connect } from 'react-redux'
import { schema, denormalize } from 'normalizr'
import { get, isEmpty } from 'lodash'
import { compose, defaultProps, withPropsOnChange } from 'recompose'
import { fetchFeedThunkCreator } from '../actions'
import { FEED_REDUCER_KEY } from '../reducers'
import Feed from './Feed'

var defaults = {
  itemIdKey: 'id',
  itemHeight: 120,
  getItems(items) {
    return items
  },
  // for all items without schema, they will stored
  // under the entity `items`
  itemSchema: new schema.Entity('items'),
  // data represented by apis usually have keys
  // denoted by snake case (foo_bar)
  // Using such case in JS which is a
  // a camel cased language by convention
  // may be aesthetically unpleasing, so this option helps
  // *recursively* convert all the keys in the result to
  // camel case
  convertKeysToCamelcase: false,
  headerComponent() {
    return null
  },
  loaderComponent() {
    return <span>Loading...</span>
  },
  errorComponent() {
    return (
      <span style={{ color: 'red' }}>
        'Error Loading Feed'
      </span>
    )
  },
  noItemsComponent() {
    return (
      <span>
        No more items
      </span>
    )
  },
  deactivatedComponent() {
    return <span>Activate the feed with an api endpoint</span>
  },
  configErrorComponent() {
    return (
      <span style={{ color: 'red' }}>
        Incorrect config has been passed to Feed
      </span>
    )
  },
  updateEndpoint() {
    return ''
  },
  hasMoreItems() {
    return false
  }
}

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

function getApiEndpoint(state, ownProps) {
  // A feed is supposed to be activated when it has
  // proper api url to fetch items from. A deactivated feed
  // will not perform any fetch operations
  if (typeof ownProps.getInitialEndpoint === 'string') {
    return getInitialEndpoint
  } else if (typeof ownProps.getInitialEndpoint === 'function') {
    return ownProps.getInitialEndpoint(state)
  } else {
    return ''
  }
}

function validateConfig(ownProps) {
  var configError = false
  var { name, itemComponent } = ownProps

  if (typeof name !== 'string' || isEmpty(name)) {
    configError = true
  }

  if (typeof itemComponent !== 'function') {
    configError = true
  }

  return configError
}

var mapStateToProps = function(state, ownProps) {
  var feedName = ownProps.name

  // although we are supporting bi-directional pagination – `above` and `below`,
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
    api: getApiEndpoint(state, ownProps),
    configError: validateConfig(ownProps),
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

// we fill in our feed config with all default values
// so later in the component we don't have to worry about any defaults
export default compose(
  defaultProps(defaults),
  connect(mapStateToProps, mapDispatchToProps)
)(Feed)
