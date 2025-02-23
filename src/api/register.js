import {
	request
} from '../request/index.js'

export default {
	register(data) {
		return request.post('/register', data)
	}
}