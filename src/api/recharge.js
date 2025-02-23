import {
	request
} from "../request/index.js";

export default {
	recharge(data) {
		return request.post('/recharge', data)
	}
}