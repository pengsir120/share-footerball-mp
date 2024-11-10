<template>
	<view class="profile-box">
		<view class="profile-top">
			<view v-if="isLogin" class="profile-user">
				<image class="user-avatar" src="../../static/avatar.png" mode="widthFix"></image>
				<view class="user-nickname ellipsis">哈喽伍德哈喽伍德哈喽伍德哈喽伍德哈喽伍德哈喽伍德</view>
			</view>
			<button v-else class="button" @tap="handleTap">点击登录</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const isLogin = ref(true);

const handleTap = () => {
	isLogin.value = true;
};
</script>

<style>
page {
	background-color: #f1f1f1;
}

.profile-box {
	width: 90%;
	margin: 0 auto;
}

.profile-top {
	height: 200rpx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	border-radius: 10rpx;
	margin: 20rpx 0;
}

.profile-user {
	display: flex;
	align-items: center;
	flex: 1;
}

.user-avatar {
	width: 120rpx;
	height: 120rpx;
	margin: 0 40rpx;
	border-radius: 50%;
	box-shadow: 0 0 20rpx #d1d1d1;
}

.user-nickname {
	font-size: 50rpx;
	font-weight: 700;
	margin-right: 40rpx;
	flex: 1;
	width: 435rpx;
}
</style>
