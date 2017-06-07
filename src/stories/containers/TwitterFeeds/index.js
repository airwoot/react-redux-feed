import React, { Component } from 'react'
import { Feed } from '../../../../lib'
import { Div } from 'glamorous'
import getFeedConfig from '../../configs/Tweets'
import tweetSchema from '../../schemas/Tweets'
import { withItemSchema } from '../../../../lib/enhancers'

var feedsContainerStyle = {
  width: '100%',
  columns: '300px 3',
  margin: '30px'
}

var FeedsWithItemSchema = withItemSchema(tweetSchema)(Feed)

export default class TwitterFeeds extends Component {
  render() {
    var { keywords } = this.props
    return (
      <Div
        {...feedsContainerStyle}
        {...{ columns: `300px ${keywords.length}` }}
      >
        {keywords.map(function renderTwitterFeeds(keyword) {
          return (
            <FeedsWithItemSchema key={keyword} {...getFeedConfig(keyword)} />
          )
        })}
      </Div>
    )
  }
}
