import {
	request
} from '../request/index.js'

export default {
	login(data) {
		return request.post('/login', data)
	}
}