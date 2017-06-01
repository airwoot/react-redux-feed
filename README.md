# React Redux Feed [![npm version](https://badge.fury.io/js/react-redux-feed.svg)](https://www.npmjs.com/package/react-redux-feed) [![Build Status](https://travis-ci.org/airwoot/react-redux-feed.svg?branch=master)](https://travis-ci.org/airwoot/react-redux-feed)

*The list and the items in them have distinct essence.*

This library aims to manage attributes of a list – loading items from an endpoint, pagination and efficiently loading large number of items with [react-virtualized](https://github.com/bvaughn/react-virtualized).

The modularity afforded by React component composition and redux reducers helps us interact with the items regardless of the composition of the items within the `Feed` component.

This separation of concern prevents redundant code for multiple feeds in your app.

The library also provides a well-thought data shape for your redux store.

## Who will use this?

Any app which displays multiple feeds within the app will benefit from this repo. The feeds are stored in a data shape which are [*normalizr*](https://github.com/paularmstrong/normalizr) friendly. Normalizr helps to store data without redundancy.

## Getting Started

### Get the package
`npm install react-redux-feed`

### Usage
`react-redux-feed` consist of two parts
-  A component - responsible for rendering a feed in the DOM
-  A reducer - responsible for updating the state of the feed in redux store

**Use the `Feed` component**
```javascript
import Feed from './Feed'

function SimpleFeed (props) {
  return (
    <Feed
      {...config}
    />
  )
}
```

We will talk about the config shortly

**Include the `feedReducer`**
```javascript
import { combineReducers } from 'redux'
import { feedsReducer } from 'react-redux-feed'

var rootReducer = combineReducers({
  feeds: feedsReducer,
  // other reducers
})

```

**Configs as props to the feed**

**`name: String [required]`**
Name should be a string which can uniquely identify the feed in your app

**`itemIdKey: String`**
Every item in the feed has a key which can uniquely identify it within the feed. `idKey` is the name of the key. The default value of `idKey` is `id`.

**`itemComponent: Component [required]`**
A React component which will be used to render an item in the feed

**`itemHeight`: Number**
The height of the item in pixels. The default height given is 130px.

**`getInitialEndpoint: (getState) => String [required]`**
The user needs to return the source endpoint of the feed. The function receives an argument [`getState`](http://redux.js.org/docs/api/Store.html#getState) which when invoked returns the current state of the redux store.

**`updateEndpoint: ({headers, results, direction}) => String [required]`**
The Feed needs to have a way figure out how to fetch the next set of items. This function gets the headers, the results and pagination direction as arguments.

The [`headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers) object is part of the [`response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) as described by the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) specs.

`direction` is a string and can have two values
-  `above` - the user is trying to load items *above* the feed
-  `below` - the user is trying to load items *below* the feed

The return value of this method should be a url.

**hasMoreItems: (response, direction) => boolean [required]**
The function will receive the same arguments as `updateEndpoint`. It needs to return a boolean which states whether there are any further items in the feed.

**loaderComponent: Component**
A component which will be used whenever items in the feed are loading. The default is the text, 'Loading'.

**headerComponent: Component**
A component which will be used to display a header above the feed.

Here is an example of how [config](src/configs/GistFeeds/index.js) looks for feed displaying gists of a user.

### ReduxStore  Data Shape

```json
{
  "feeds": {
    "entities": {
      "simple": [{
          "data": "item"
        }]
    },
    "paginations": {
      "simple": {
        "isFetching": false
      }
    },
    "errors": {
      "simple": {}
    }
  }
}
```

## Running the example
Clone the repo.

Run
```
yarn
yarn run storybook
```

The examples lists feeds from distinct sources
-  Gists of a user
-  Keyword search stream from Twitter
-  Topics from a subreddit

You can check the configs of all these feeds [here](src/stories/configs)

## Potential Features
-  Lifecycle hooks for feed
-  Establish relationships between different feeds
-  Dispatch actions if any item in a feed matches a criteria
-  Group items in a feed
-  Support async search for a feed
-  Dispatch actions after bulk selection of items
