import {
	request
} from '../request/index.js'

export default {
	cdkeyExchange(data) {
		return request.post('/cdkey/exchange', data)
	}
}