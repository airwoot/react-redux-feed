import React, { Component } from 'react'
import { withProps } from 'recompose'
import parseLinkHeader from 'parse-link-header'
import { isNil } from 'lodash'
import { compose, withPagination, Feed } from '../../../../lib'
import { Div } from 'glamorous'
import Gist from '../../components/Gist'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 1',
  margin: '30px'
}

var updateEndpoint = function({ headers }) {
  var details = parseLinkHeader(headers.link)
  if (isNil(details) || !details.next) {
    return ''
  }

  return details.next.url
}

var hasMoreItems = function({ headers, results }) {
  if (isNil(results)) {
    return false
  }

  var details = parseLinkHeader(headers.link)
  var moreItems

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

var user = 'developit'

var getInitialEndpoint = () => `https://api.github.com/users/${user}/gists`

var FeedEnhancedWithPagination = compose(
  withPagination(updateEndpoint, hasMoreItems),
  withProps({ name: `userGists`, getInitialEndpoint, itemComponent: Gist })
)(Feed)

class FeedWithPagination extends Component {
  render() {
    var topic = 'reactjs'
    return (
      <Div {...feedsContainerStyle}>
        <FeedEnhancedWithPagination />
      </Div>
    )
  }
}

export default FeedWithPagination
