<template>
	<view class="login-box">
		<button v-if="app.globalData.token" class="login-button" open-type="chooseAvatar" @chooseavatar="handleChooseAvatar">
			<image class="login-avatar" :src="avatarUrl" mode="widthFix"></image>
		</button>
		<view class="login-info" v-if="!app.globalData.token">
			<view class="login-label">姓名</view>
			<input class="login-nickname" type="nickname" placeholder="请输入您的姓名" @change="handleChange" />
		</view>
		<view class="login-info" v-if="!app.globalData.token">
			<view class="login-label">密码</view>
			<input class="login-nickname" type="text" password placeholder="请输入您的密码" @change="handlePassword" />
		</view>
		<view v-if="!app.globalData.token" class="login-toggle" @tap="handleToggle">
			{{ isLogin ? '没有账号，点击注册' : '已有账号，点击登录' }}
		</view>
		<button v-if="!app.globalData.token" class="button" @tap="handleTap">{{ isLogin ? '登录' : '注册' }}</button>
		<button v-if="app.globalData.token" class="button" @tap="handleModifyAvatar">确认</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api/index.js';
import { upload } from '../../upload/index.js';

const app = getApp();
const avatarUrl = ref(app.globalData.userInfo.avatar);
const nickname = ref('');
const password = ref('');
const isLogin = ref(true);

const handleTap = () => {
	if (!nickname.value || !password.value) {
		uni.showToast({
			title: '用户名和密码必填',
			icon: 'none'
		});
		return;
	}

	const data = {
		name: nickname.value,
		password: password.value
	};

	if (isLogin.value) {
		api.login(data).then((res) => {
			if (res.code === 0) {
				app.globalData.userInfo = res.data;
				app.globalData.token = res.data.token;

				uni.setStorage({
					key: 'userInfo',
					data: res.data
				});

				uni.setStorage({
					key: 'token',
					data: res.data.token
				});

				uni.navigateBack();
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
			}
		});
	} else {
		api.register(data).then((res) => {
			if (res.code === 0) {
				uni.showToast({
					title: '注册成功',
					icon: 'none'
				});
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
			}
		});
	}
};

const handleChooseAvatar = (e) => {
	console.log('e', e);
	avatarUrl.value = e.detail.avatarUrl;
};

const handleChange = (e) => {
	console.log('e', e);
	nickname.value = e.detail.value;
};

const handlePassword = (e) => {
	password.value = e.detail.value;
};
const handleToggle = () => {
	isLogin.value = !isLogin.value;
};

const handleModifyAvatar = () => {
	if (!avatarUrl.value) {
		uni.showToast({
			title: '请上传头像',
			icon: 'none'
		});
		return;
	}

	console.log('avatarUrl', avatarUrl.value);

	upload.uploadAvatar(avatarUrl.value).then((res) => {
		if (res.code === 0) {
			uni.showToast({
				title: '上传成功',
				icon: 'none'
			});
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
		}
	});
};
</script>

<style>
.login-button {
	width: 120rpx;
	height: 120rpx;
	margin: 50rpx auto;
	padding: 0;
}

.login-avatar {
	width: 120rpx;
	height: 120rpx;
}

.login-info {
	display: flex;
	height: 120rpx;
	align-items: center;
	margin-bottom: 20rpx;
}

.login-label {
	margin: 0 50rpx;
}

.login-nickname {
	flex: 1;
	margin-right: 50rpx;
}

.login-toggle {
	color: #1296db;
	font-size: 26rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	text-decoration: underline;
}
</style>
