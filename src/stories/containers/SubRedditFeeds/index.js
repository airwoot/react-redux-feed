import React, { Component } from 'react'
import { Feed } from '../../../Feed'
import Subreddit from '../../components/Subreddit'
import TweetIcon from 'react-icons/lib/fa/twitter'
import getPaginationConfigs from '../../modules/paginations/Subreddit/config'

import { Div } from 'glamorous'

var feedsContainerStyle = {
	width: '100%',
	columns: '300px 3',
	margin: '30px'
}

var createSubredditFeedConfig = function(keyword) {
	return {
		name: `${keyword} Subreddit`,
		itemComponent: Subreddit,
		itemIdKey: 'id_str',
		itemHeight: 120,
		...getPaginationConfigs(keyword)
	}
}

export default class SubRedditFeeds extends Component {
	render() {
		var { keywords } = this.props
		console.log(keywords.length)
		return (
			<Div
				{...feedsContainerStyle}
				{...{ columns: `300px ${keywords.length}` }}
			>
				{keywords.map(function renderSubRedditFeeds(keyword) {
					return (
						<Feed
							key={keyword}
							{...createSubredditFeedConfig(keyword)}
							headerIcon={TweetIcon}
						/>
					)
				})}
			</Div>
		)
	}
}
