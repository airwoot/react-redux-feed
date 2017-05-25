import React from 'react'

export default function Subreddit(props) {
	var { id, title } = props.data
	console.log(title)
	return (
		<div>
			<p>{title}</p>
		</div>
	)
}
