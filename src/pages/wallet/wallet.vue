<template>
	<view class="wallet-box">
		<image class="wallet-icon" src="../../static/money.png" mode="widthFix"></image>
		<view class="wallet-title">我的钱包</view>
		<view class="wallet-amount">
			<text class="amount-symbol">￥</text>
			<text>{{ formatAmount(app.globalData.userInfo.amount) }}</text>
		</view>
		<button class="button" @tap="handleTap">立即充值</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { formatAmount } from '../../utils/index.js';

const app = getApp();

const handleTap = () => {
	uni.navigateTo({
		url: '/pages/recharge/recharge'
	});
};
</script>

<style>
.wallet-box {
	text-align: center;
}

.wallet-icon {
	width: 120rpx;
	height: 120rpx;
	background-color: #1295db;
	border-radius: 50%;
	margin: 50rpx auto 20rpx auto;
}

.wallet-amount {
	height: 200rpx;
	line-height: 200rpx;
	font-size: 100rpx;
	font-weight: bold;
	margin-bottom: 100rpx;
}

.amount-symbol {
	font-size: 60rpx;
	margin-right: 10rpx;
}
</style>
