import React, { Component } from 'react'
import { withProps } from 'recompose'
import parseLinkHeader from 'parse-link-header'
import { isNil } from 'lodash'
import { schema } from 'normalizr'
import { compose, withItemSchema, Feed } from '../../../../lib'
import { Div } from 'glamorous'
import Gist from '../../components/Gist'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 1',
  margin: '30px'
}

var user = 'developit'

var getInitialEndpoint = () => `https://api.github.com/users/${user}/gists`

var FeedEnhancedWithPagination = compose(
  withItemSchema(new schema.Entity('gists'), {
    convertKeysToCamelcase: true
  }),
  withProps({
    name: `gistsWithSchema`,
    getInitialEndpoint,
    itemComponent: Gist
  })
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
