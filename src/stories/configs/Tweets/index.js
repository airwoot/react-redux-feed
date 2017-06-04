import React from 'react'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'
import Tweet from '../../components/Tweet'
import TweetIcon from 'react-icons/lib/fa/twitter'
import StopIcon from 'react-icons/lib/fa/circle'
import ErrorIcon from 'react-icons/lib/fa/exclamation-circle';
import { isNil } from 'lodash'

const API_ENDPOINT = function(keyword) {
  return `https://hwk73-twitter-apis.now.sh/api/search-tweets/${keyword}`
}

export default function getFeedConfig(keyword) {
  var name = `${keyword}Tweets`
  return {
    name,
    itemComponent: Tweet,
    itemIdKey: 'id_str',
    itemHeight: 120,
    headerComponent: function() {
      return Header({ name, iconComponent: TweetIcon })
    },
    loaderComponent: function() {
      return <Spinner spinnerName="pulse" fadeIn={0} />
    },
    errorComponent () {
      return (
        <span style={{color: 'red'}}>
          <ErrorIcon color='red'/> {' Loading Feed'}
        </span>

      )
    },
    noItemsComponent () {
      return (
        <span>
          <StopIcon color='gray'/>
        </span>
      )
    },
    getItems(searchResults) {
      if (isNil(searchResults)) {
        return []
      } else {
        return searchResults.statuses
      }
    },
    getInitialEndpoint(getState) {
      return API_ENDPOINT(keyword)
    },
    updateEndpoint({results}) {
      var newEndpoint = `${API_ENDPOINT(keyword)}${results.search_metadata.next_results}`

      return newEndpoint
    },
    hasMoreItems({results}) {
      if (isNil(results)) {
        return false
      }

      return results.search_metadata.next_results &&
        results.search_metadata.next_results.length > 0
        ? true
        : false
    }
  }
}
