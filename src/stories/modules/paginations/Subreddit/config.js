import { isNil } from 'lodash'

const API_ENDPOINT = function(keyword) {
	return `https://www.reddit.com/r/${keyword}.json`
}

export default function getPaginationConfigs(keyword) {
	return {
		getItems(results) {
			if (isNil(results)) {
				return []
			} else {
				return results.data.children
			}
		},
		getEndpoint(paginationState, direction = 'initial') {
			if (direction === 'initial') {
				return API_ENDPOINT(keyword)
			} else {
				return paginationState[direction].url
			}
		},
		updateEndpoint(response, direction = 'initial') {
			return response.json().then(function(results) {
				return `${API_ENDPOINT(keyword)}?after=${results.data.after}`
			})
		},
		hasMoreItems(response, direction = 'initial') {
			if (isNil(response)) {
				return false
			}

			return response.json().then(function(results) {
				return results.data.after
					? true
					: false
			})

			return false
		}
	}
}
