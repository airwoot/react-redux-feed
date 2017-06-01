import React from 'react'
import { Div, Span, A } from 'glamorous'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

var SubredditCardStyle = {
		borderBottom: '1px solid #dedede',
		paddingBottom: '10px'
}

var authorNameStyle = {
	padding: '5px 20px',
	color: 'gray',
	fontSize: '14px',
	float: 'right'
}

var SubredditTitleStyle = {
	fontSize: '16px'
}

var SubredditDateStyle = {
	color: 'gray',
	fontSize: '14px'
}



export default function Subreddit(props) {
	var { id, title, selftext, author, created_utc } = props.data
	
	return (
		<Div {...SubredditCardStyle}>
			<Div {...SubredditTitleStyle}>{title}</Div>
			<Span {...SubredditDateStyle}>{distanceInWordsToNow(created_utc*1000)}</Span>
			<Span {...authorNameStyle}>{author}</Span>
		</Div>
	)
}
