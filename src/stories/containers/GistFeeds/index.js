import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import { withItemSchema } from '../../../../lib/enhancers'
import getFeedConfig from '../../configs/Gists'
import { Div } from 'glamorous'
import GistItemSchema from '../../schemas/Gist'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

var FeedWithItemSchema = withItemSchema(GistItemSchema)(Feed)

export default class GistFeeds extends Component {
  render() {
    var { gistUsers } = this.props
    return (
      <Div
        {...feedsContainerStyle}
        {...{ columns: `300px ${gistUsers.length}` }}
      >
        {gistUsers.map(function renderGistFeeds(githubUser) {
          return (
            <FeedWithItemSchema
              key={githubUser}
              {...getFeedConfig(githubUser)}
            />
          )
        })}
      </Div>
    )
  }
}
