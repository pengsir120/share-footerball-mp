<template>
	<view class="order-box" v-for="item in list" :key="item.id">
		<view class="order-item">场馆名称: {{ item.stadium.name }}</view>
		<view class="order-item ellipsis">订单编号: {{ item.orderNo }}</view>
		<view class="order-item">消费金额: {{ item.amount }}</view>
		<view class="order-item">订单状态: {{ item.status === 1 ? '进行中' : '已完结' }}</view>
		<view class="order-item">订单时长: 00:00:00</view>
		<view class="order-item">开始时间: {{ item.createAt }}</view>
		<view class="order-item">结束时间: {{ item.updateAt }}</view>
	</view>
</template>

<script setup>
import { onReachBottom, onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import api from '../../api/index.js';
import dayjs from 'dayjs';

const list = ref([]);

onLoad(() => {
	api.orderList().then((res) => {
		if (res.code === 0) {
			list.value = res.data.map((i) => {
				return {
					...i,
					amount: (+i.amount).toFixed(2),
					createAt: dayjs(i.createAt).format('YYYY-MM-DD HH:mm:ss'),
					updateAt: dayjs(i.updateAt).format('YYYY-MM-DD HH:mm:ss')
				};
			});
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
		}
	});
});

onReachBottom(() => {
	console.log('reachBottom');
});
</script>

<style>
page {
	background-color: #f1f1f1;
	padding: 30rpx 0;
}

.order-box {
	width: 80%;
	margin: 0 auto;
	margin-bottom: 30rpx;
	background-color: white;
	padding: 30rpx;
}

.order-item {
	height: 50rpx;
	line-height: 50rpx;
}
</style>
