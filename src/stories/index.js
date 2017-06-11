import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Provider from './decorators/reduxStore'
import SimpleFeed from './containers/SimpleFeed'
import FeedWithPagination from './containers/FeedWithPagination'
import GistFeeds from './containers/GistFeeds'
import TwitterFeeds from './containers/TwitterFeeds'
import SubRedditFeeds from './containers/SubRedditFeeds'
import Typography from 'typography'
import bootstrap from './typography-theme-bootstrap'

const typography = new Typography(bootstrap)

// Or insert styles directly into the <head> (works well for client-only
// JS web apps.
typography.injectStyles()

const divStyle = {
  display: 'flex'
}

storiesOf('Feed', module)
  .addDecorator(function(story) {
    return <Provider story={story()} />
  })
  .add('Simple Feed', function() {
    return <SimpleFeed />
  })
  .add('Feed With Pagination', function() {
    return <FeedWithPagination />
  })
  .add('Public Gists', function() {
    return <GistFeeds gistUsers={['gaearon', 'mxstbr', 'developit']} />
  })
  .add('Twitter Keyword Streams', function() {
    return <TwitterFeeds keywords={['reactjs', 'reduxjs', 'react-router']} />
  })
  .add('Subreddit Feeds', function() {
    return <SubRedditFeeds keywords={['reactjs', 'reduxjs', 'elm']} />
  })
  .add('Subreddit, Twitter and Gist Feeds', function() {
    return (
      <div style={divStyle}>
        <SubRedditFeeds keywords={['reactjs']} />
        <TwitterFeeds keywords={['react']} />
        <GistFeeds gistUsers={['acdlite']} />
      </div>
    )
  })
