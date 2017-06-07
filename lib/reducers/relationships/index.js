import { SUCCESS_RECEIVE_FEED } from '../../actions'
// import { uniqBy } from 'lodash'

export default function feedEntitiesReducer(state = {}, action) {
  var feedName = action.payload && action.payload.feedName
  switch (action.type) {
    case SUCCESS_RECEIVE_FEED:
      // console.log(`
      //   Number of available items -> ${existingItems.length}
      //   Number of new items -> ${action.payload.items.length}
      //   Number of unique items -> ${uniqBy(existingItems.concat(action.payload.items), 'id').length}
      // `);
      return Object.assign({}, state, {
        [feedName]: [].concat(state[feedName] || [], action.payload.result)
      })
    default:
      return state
  }
}
