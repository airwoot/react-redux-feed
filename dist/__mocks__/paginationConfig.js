'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getPaginationConfigs;

var _lodash = require('lodash');

var API_ENDPOINT = function API_ENDPOINT(keyword) {
	return 'https://www.reddit.com/r/' + keyword + '.json';
};

function getPaginationConfigs(keyword) {
	return {
		getItems: function getItems(results) {
			if ((0, _lodash.isNil)(results)) {
				return [];
			} else {
				return results.data.children;
			}
		},
		getEndpoint: function getEndpoint(paginationState) {
			var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'initial';

			if (direction === 'initial') {
				return API_ENDPOINT(keyword);
			} else {
				return paginationState[direction].url;
			}
		},
		updateEndpoint: function updateEndpoint(response) {
			var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'initial';

			return response.json().then(function (results) {
				return API_ENDPOINT(keyword) + '?after=' + results.data.after;
			});
		},
		hasMoreItems: function hasMoreItems(response) {
			var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'initial';

			if ((0, _lodash.isNil)(response)) {
				return false;
			}

			return response.json().then(function (results) {
				return results.data.after ? true : false;
			});

			return false;
		}
	};
}