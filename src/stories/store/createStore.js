import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { feedsReducer } from 'react-redux-feed'
import thunk from 'redux-thunk'

export default function() {
	var rootReducer = combineReducers({
		feeds: feedsReducer
	})

	var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose

	var store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
	return store
}
