'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Subreddit;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _glamorous = require('glamorous');

var _distance_in_words_to_now = require('date-fns/distance_in_words_to_now');

var _distance_in_words_to_now2 = _interopRequireDefault(_distance_in_words_to_now);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubredditCardStyle = {
	borderBottom: '1px solid #dedede',
	paddingBottom: '10px'
};

var authorNameStyle = {
	padding: '5px 20px',
	color: 'gray',
	fontSize: '14px',
	float: 'right'
};

var SubredditTitleStyle = {
	fontSize: '16px'
};

var SubredditDateStyle = {
	color: 'gray',
	fontSize: '14px'
};

function Subreddit(props) {
	var _props$data = props.data;
	var id = _props$data.id;
	var title = _props$data.title;
	var selftext = _props$data.selftext;
	var author = _props$data.author;
	var created_utc = _props$data.created_utc;


	return _react2.default.createElement(
		_glamorous.Div,
		SubredditCardStyle,
		_react2.default.createElement(
			_glamorous.Div,
			SubredditTitleStyle,
			title
		),
		_react2.default.createElement(
			_glamorous.Span,
			SubredditDateStyle,
			(0, _distance_in_words_to_now2.default)(created_utc * 1000)
		),
		_react2.default.createElement(
			_glamorous.Span,
			authorNameStyle,
			author
		)
	);
}