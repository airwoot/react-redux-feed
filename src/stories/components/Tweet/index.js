import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { Div, Span, Img, A } from 'glamorous'

var tweetContainerStyle = {
	position: 'relative',
	marginBottom: '10px',
	paddingBottom: '10px',
	borderBottom: '2px solid whitesmoke'
}

var userNameStyle = {
	fontWeight: '700',
	fontSize: '12px'
}

var userHandleStyle = {
	fontWeight: '400',
	fontSize: '12px',
	color: 'gray',
	display: 'inline-block',
	paddingLeft: '10px'
}

var textContainerStyle = {
	position: 'absolute',
	top: '-10px',
	left: '60px'
}

var textStyle = {
	fontWeight: 400,
	fontSize: '12px',
	color: '#333333',
	lineHeight: 1.25
}

var userAvatarContainerStyle = {
	width: '50px'
}

var userAvatarStyle = {
	width: '100%',
	height: '100%',
	borderRadius: '4px 4px'
}

var tweetMetaStyle = {
	fontSize: '10px'
}

export default function Tweet(props) {
	var { id_str, text, user, created_at } = props
	return (
		<div>
			<Div {...tweetContainerStyle}>
				<Div {...userAvatarContainerStyle}>
					<Div {...userAvatarContainerStyle}>
						<Img {...userAvatarStyle} src={user.profile_image_url} />
					</Div>
				</Div>
				<Div {...textContainerStyle}>
					<Span {...userNameStyle}>{user.name}</Span>
					<Span {...userHandleStyle}>@{user.screen_name}</Span>

					<Div {...textStyle}>{text}</Div>

					<A
						target="_blank"
						href={`https://twitter.com/statuses/${id_str}`}
						{...tweetMetaStyle}
					>
						{distanceInWordsToNow(created_at)}
					</A>
				</Div>
			</Div>
		</div>
	)
}
