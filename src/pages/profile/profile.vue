<template>
	<view class="profile-box">
		<view class="profile-top">
			<view class="profile-user">
				<image class="user-avatar" :src="app.globalData.userInfo.avatar" mode="widthFix" @tap="handleModifyAvatar"></image>
				<view class="user-nickname ellipsis">{{ app.globalData.userInfo.name || '-' }}</view>
			</view>
			<!-- <button v-else class="button" @tap="handleTap">点击登录</button> -->
		</view>
		<view class="profile-bottom">
			<view class="item" v-for="item in list" :key="item.id" @tap="handleItemTap(item)">
				<!-- <view class="item-left">left</view>
				<view class="item-center">center</view>
				<view class="item-right">right</view> -->
				<image class="item-left" :src="item.src" mode="widthFix"></image>
				<view class="item-center">{{ item.name }}</view>
				<image class="item-right" src="../../static/forward.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const isLogin = ref(false);

const handleTap = () => {
	// isLogin.value = true;
	uni.navigateTo({
		url: '/pages/login/login'
	});
};

const app = getApp();

// 个人中心功能列表
const list = [
	{
		id: 1,
		type: 1,
		name: '我的钱包',
		src: '/static/wallet.png',
		path: '/pages/wallet/wallet'
	},
	{
		id: 2,
		type: 2,
		name: '会员充值',
		src: '/static/vip.png',
		path: '/pages/recharge/recharge'
	},
	{
		id: 3,
		type: 3,
		name: '我的订单',
		src: '/static/order.png',
		path: '/pages/order/order'
	},
	{
		id: 4,
		type: 4,
		name: '奖品兑换',
		src: '/static/change.png',
		path: '/pages/cdk/cdk'
	},
	{
		id: 5,
		type: 5,
		name: '客服中心',
		src: '/static/support.png',
		path: '/pages/contact/contact'
	},
	{
		id: 6,
		type: 6,
		name: '关于我们',
		src: '/static/about.png',
		path: '/pages/about/about'
	}
];

const handleItemTap = (item) => {
	uni.navigateTo({
		url: item.path
	});

	// switch (item.id) {
	// 	case 1:
	// 		uni.navigateTo({
	// 			url: item.path
	// 		});
	// 		break;
	// 	case 2:
	// 		console.log(item.name);
	// 		uni.navigateTo({
	// 			url: item.path
	// 		});
	// 		break;
	// 	case 3:
	// 		console.log(item.name);
	// 		uni.navigateTo({
	// 			url: item.path
	// 		});
	// 		break;
	// 	case 4:
	// 		console.log(item.name);
	// 		uni.navigateTo({
	// 			url: item.path
	// 		});
	// 		break;
	// 	case 5:
	// 		uni.navigateTo({
	// 			url: item.path
	// 		});
	// 		break;
	// 	case 6:
	// 		console.log(item.name);
	// 		break;
	// }
};

const handleModifyAvatar = () => {
	uni.navigateTo({
		url: '/pages/login/login'
	});
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

.profile-bottom {
	background-color: #ffffff;
	border-radius: 10rpx;
}

.item {
	display: flex;
	height: 100rpx;
	border-bottom: 1rpx solid #f1f1f1;
	box-sizing: border-box;
	align-items: center;
}

.item:nth-last-child(-n + 1) {
	border: none;
}

.item-left,
.item-right {
	width: 50rpx;
	height: 50rpx;
	margin: 0 20rpx;
}

.item-center {
	flex: 1;
}
</style>
