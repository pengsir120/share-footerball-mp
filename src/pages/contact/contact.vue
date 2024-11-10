<template>
	<view class="contact-box">
		<view class="contact-top">
			<view class="contact-top-title">24H 在线为您答疑解惑</view>
			<!-- #ifdef MP-WEIXIN -->
			<button open-type="contact" @contact="handleContactTap" class="contact-top-button">在线客服</button>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<button open-type="contact" @tap="handlePhoneCall" class="contact-top-button">拨打电话</button>
			<!-- #endif -->
		</view>
		<view class="contact-bottom">
			<view class="contact-bottom-title">常见问题</view>
			<view class="contact-bottom-list">
				<view class="item" v-for="item in contactQuestion" :key="item.id" @tap="handleItemTap(item)">
					<image class="image" :src="item.src" mode="widthFix"></image>
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { contactQuestion } from '../../pages-data/index.js';

const handleItemTap = (item) => {
	console.log(item);
	uni.navigateTo({
		url: `/pages/question/question?type=${item.type}`
	});
};

const handleContactTap = (e) => {
	console.log(e);
};

const handlePhoneCall = () => {
	console.log('call');
};
</script>

<style>
page {
	background-color: #f1f1f1;
}

.contact-top {
	height: 300rpx;
	text-align: center;
	background-color: #ffffff;
	padding: 20rpx 0;
}

.contact-top-title {
	height: 150rpx;
	line-height: 150rpx;
	font-weight: 700;
}

.contact-top-button {
	width: 368rpx;
	color: #ffffff;
	background-color: #1296db;
	font-weight: 700;
	letter-spacing: 2rpx;
	margin: 0 auto;
}

.contact-bottom {
	margin-top: 20rpx;
	background-color: white;
}

.contact-bottom-title {
	height: 100rpx;
	line-height: 100rpx;
	font-weight: 700;
	padding-left: 20rpx;
	border-bottom: 2rpx solid #f1f1f1;
	box-sizing: border-box;
}

.contact-bottom-list {
	display: flex;
	flex-wrap: wrap;
}

.contact-bottom-list .item {
	width: 50%;
	height: 120rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.image {
	width: 50rpx;
	height: 50rpx;
	margin-right: 10rpx;
}

.item:nth-child(odd) {
	border-right: 2rpx solid #f1f1f1;
	box-sizing: border-box;
}

.item:nth-child(even) {
	border-left: 2rpx solid #f1f1f1;
	box-sizing: border-box;
}

.item:not(:nth-last-child(-n + 2)) {
	border-bottom: 4rpx solid #f1f1f1;
	box-sizing: border-box;
}
</style>
