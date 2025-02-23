const app = getApp()

class Request {
	constructor(domain) {
		this.domain = domain
	}
	request(path, method, data) {
		uni.showLoading({
			title: 'Loading...'
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: `${this.domain}${path}`,
				method,
				data,
				header: {
					'Authorization': `Bearer ${app.globalData.token}`
				},
				success: res => {
					resolve(res.data)
				},
				fail: err => {
					reject(err)
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		})
	}
	get(path, data) {
		return this.request(path, 'GET', data)
	}
	post(path, data) {
		return this.request(path, 'POST', data)
	}
}

export const request = new Request('http://localhost:9000')