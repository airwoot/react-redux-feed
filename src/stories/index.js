import React from 'react'
import { storiesOf, action, linkTo } from '@kadira/storybook'
import Provider from './decorators/reduxStore'
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
	.add('Public Gists', function() {
		return <GistFeeds gistUsers={['gaearon', 'codejets', 'hoodwink73']} />
	})
	.add('Twitter Keyword Streams', function() {
		return <TwitterFeeds keywords={['javascript', 'jsconf', 'reactjs']} />
	})
	.add('Subreddit Feeds', function() {
		return <SubRedditFeeds keywords={['Design', 'StarWars', 'javascript']} />
	})
	.add('Subreddit, Twitter and Gist Feeds', function() {
		return (
			<div style={divStyle}>
				<SubRedditFeeds keywords={['Design']} />
				<TwitterFeeds keywords={['jsconf']} />
				<GistFeeds gistUsers={['gaearon']} />
			</div>
		)
	})
