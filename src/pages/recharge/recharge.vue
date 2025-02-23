<template>
	<view class="recharge-box">
		<view class="recharge-desc">
			当前账户余额：
			<text>{{ formatAmount(app.globalData.userInfo.amount) }}</text>
			元
		</view>
		<view class="recharge-list">
			<!-- <view class="recharge-item">1</view>
			<view class="recharge-item">2</view>
			<view class="recharge-item">3</view>
			<view class="recharge-item">4</view> -->
			<view class="recharge-item" :class="{ active: index === activeIndex }" v-for="(item, index) in list" :key="item.id" @tap="handleItemTap(index)">
				￥ {{ item.amount }}
			</view>
		</view>
		<button class="button" @tap="handleRecharge">立即充值</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api/index.js';
import { formatAmount } from '../../utils/index.js';

const list = [
	{ id: 1, amount: 10 },
	{ id: 2, amount: 20 },
	{ id: 3, amount: 50 },
	{ id: 4, amount: 100 }
];

const app = getApp();
const activeIndex = ref(0);

const handleItemTap = (index) => {
	activeIndex.value = index;
};

const handleRecharge = () => {
	const activeItem = list.find((_, index) => index === activeIndex.value);
	// uni.showToast({
	// 	title: `当前充值金额: ${activeItem.amount}`,
	// 	mask: true,
	// 	icon: 'none'
	// });

	api.recharge({
		amount: activeItem.amount * 100
	}).then((res) => {
		if (res.code === 0) {
			api.getUserInfo().then((res) => {
				app.globalData.userInfo = res.data;

				uni.setStorage({
					key: 'userInfo',
					data: res.data
				});
			});
			uni.showToast({
				title: '充值成功',
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
.recharge-box {
	width: 80%;
	margin: 0 auto;
}

.recharge-desc {
	height: 100rpx;
	line-height: 100rpx;
	font-size: 40rpx;
	font-weight: bold;
	margin: 40rpx 0;
}

.recharge-desc text {
	color: #1296db;
}

.recharge-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 100rpx;
}

.recharge-item {
	height: 100rpx;
	line-height: 100rpx;
	width: 45%;
	border: 2rpx solid #d1d1d1;
	box-sizing: border-box;
	text-align: center;
	margin-bottom: 50rpx;
}

.active {
	border-color: #1296db;
	color: #1296db;
}
</style>
