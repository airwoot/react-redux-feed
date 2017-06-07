import { combineReducers } from 'redux'
import entities from './entities'
import relationships from './relationships'
import paginations from './paginations'
import errors from './errors'

export default combineReducers({
  entities,
  relationships,
  paginations,
  errors
})

export const FEED_REDUCER_KEY = 'feeds'
