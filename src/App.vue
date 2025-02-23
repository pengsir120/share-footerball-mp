<script>
export default {
	globalData: {
		markers: [],
		question: [],
		token: uni.getStorageSync('token') || null,
		userInfo: uni.getStorageSync('userInfo') || { name: '', avatar: '', amount: '' }
	},
	onLaunch: function () {
		console.log('App Launch');
	},
	onShow: function () {
		console.log('App Show');
	},
	onHide: function () {
		console.log('App Hide');
	}
};
</script>
<style>
.button {
	width: 368rpx;
	color: #ffffff;
	background-color: #1296db;
	font-weight: bold;
	letter-spacing: 2rpx;
	margin: 0 auto;
}

.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
