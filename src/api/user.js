import {
	request
} from "../request/index.js";

export default {
	getUserInfo() {
		return request.get('/user')
	}
}