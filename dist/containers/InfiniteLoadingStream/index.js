'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _reactSpinkit = require('react-spinkit');

var _reactSpinkit2 = _interopRequireDefault(_reactSpinkit);

var _glamorous = require('glamorous');

var _glamorous2 = _interopRequireDefault(_glamorous);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Div = _glamorous2.default.Div;


var centerAlignLoader = {
	width: '30px',
	margin: 'auto'
};

var InfiniteLoadingStream = function (_Component) {
	_inherits(InfiniteLoadingStream, _Component);

	function InfiniteLoadingStream(props) {
		_classCallCheck(this, InfiniteLoadingStream);

		return _possibleConstructorReturn(this, (InfiniteLoadingStream.__proto__ || Object.getPrototypeOf(InfiniteLoadingStream)).call(this, props));
	}

	_createClass(InfiniteLoadingStream, [{
		key: 'render',
		value: function render() {
			var _props = this.props;
			var items = _props.items;
			var _props$itemHeight = _props.itemHeight;
			var itemHeight = _props$itemHeight === undefined ? 130 : _props$itemHeight;
			var moreItems = _props.moreItems;
			var loadNextPage = _props.loadNextPage;
			var isNextPageLoading = _props.isNextPageLoading;
			var itemComponent = _props.itemComponent;

			// If there are more items to be loaded then add
			// an extra row to hold a loading indicator or
			// the show an item to say that there is no more
			// items to load

			var rowCount = items.length + 1;

			// Only load 1 page of items at a time.
			// Pass an empty callback to InfiniteLoader in case it asks us
			// to load more than once.
			var loadMoreRows = isNextPageLoading || !moreItems ? function () {} : loadNextPage;

			// Every row is loaded except for our loading indicator row.
			var isRowLoaded = function isRowLoaded(_ref) {
				var index = _ref.index;

				return !!items[index];
			};

			// Render a list item or a loading indicator.
			var rowRenderer = function rowRenderer(_ref2) {
				var index = _ref2.index;
				var key = _ref2.key;
				var style = _ref2.style;

				var content = void 0;

				if (isRowLoaded({ index: index })) {
					content = itemComponent(items[index]);
				} else {
					content = moreItems && _react2.default.createElement(
						Div,
						centerAlignLoader,
						_react2.default.createElement(_reactSpinkit2.default, { spinnerName: 'pulse' })
					);
				}

				return _react2.default.createElement(
					'div',
					{ key: key, style: style },
					content
				);
			};

			return _react2.default.createElement(
				_reactVirtualized.InfiniteLoader,
				{
					isRowLoaded: isRowLoaded,
					loadMoreRows: loadMoreRows,
					rowCount: rowCount
				},
				function (_ref3) {
					var onRowsRendered = _ref3.onRowsRendered;
					var registerChild = _ref3.registerChild;
					return _react2.default.createElement(
						_reactVirtualized.AutoSizer,
						null,
						function (_ref4) {
							var height = _ref4.height;
							var width = _ref4.width;
							return _react2.default.createElement(_reactVirtualized.List, {
								width: width,
								height: height,
								ref: registerChild,
								rowCount: rowCount,
								rowHeight: itemHeight,
								onRowsRendered: onRowsRendered,
								rowRenderer: rowRenderer
							});
						}
					);
				}
			);
		}
	}]);

	return InfiniteLoadingStream;
}(_react.Component);

exports.default = InfiniteLoadingStream;