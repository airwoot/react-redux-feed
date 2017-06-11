import React from 'react'
import Header from '../../components/Header'
import Spinner from 'react-spinkit'
import Gist from '../../components/Gist'
import GistIcon from 'react-icons/lib/go/gist'
import StopIcon from 'react-icons/lib/fa/circle'
import ErrorIcon from 'react-icons/lib/fa/exclamation-circle';
import parseLinkHeader from 'parse-link-header'
import { isNil } from 'lodash'

const API_ENDPOINT = function(user) {
	return `https://api.github.com/users/${user}/gists`
}

export default function getFeedConfig(user) {
  var name = `${user}Gists`
	return {
    name,
    itemComponent: Gist,
    itemIdKey: 'id',
    itemHeight: 120,
    headerComponent: function() {
      return Header({ name, iconComponent: GistIcon })
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
		getInitialEndpoint(getState) {
			return API_ENDPOINT(user)
		},
		updateEndpoint({headers}) {
      var details = parseLinkHeader(headers.link)

			if (isNil(details) || !details.next) {
				return ''
			}

			return details.next.url
		},
		hasMoreItems({headers, results}) {
			if (isNil(results)) {
				return false
			}

			var moreItems
      var details = parseLinkHeader(headers.link)

			// does not have details
			if (isNil(details) || !details.last) {
				moreItems = false
			} else if (results.url === details.last.url) {
				moreItems = false
			} else if (results.url !== details.last.url) {
				moreItems = true
			}

			return moreItems
		}
	}
}
