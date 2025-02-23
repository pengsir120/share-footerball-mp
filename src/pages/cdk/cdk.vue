<template>
	<view class="cdk-box">
		<view class="input-box">
			<input v-model="inputValue" class="input" type="number" placeholder="请输入您的 cdk" />
		</view>
		<button class="button" @tap="handleTap">立即兑换</button>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import api from '../../api/index.js';

const inputValue = ref('');
const handleTap = () => {
	// console.log('inputValue', inputValue.value);
	if (!inputValue.value) {
		uni.showToast({
			title: '请填写正确的code',
			icon: 'none'
		});
		return;
	}

	api.cdkeyExchange({ code: inputValue.value }).then((res) => {
		if (res.code === 0) {
			uni.showToast({
				title: '兑换成功',
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
.cdk-box {
	width: 100vw;
	height: 100vh;
}
.input-box {
	width: 90%;
	margin: 45% auto 100rpx auto;
	/* background-color: red; */
}

.input {
	height: 100rpx;
	border-bottom: 2rpx solid #1296db;
	box-sizing: border-box;
}
</style>
