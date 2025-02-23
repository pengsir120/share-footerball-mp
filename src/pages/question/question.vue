<template>
	<view class="question-box">
		<view v-for="(item, index) in list" :key="item.id">
			<view class="question-title">{{ index + 1 }}. {{ item.title }}</view>
			<view class="question-desc">
				{{ item.answer }}
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { getContactQuestionByType } from '../../pages-data/index.js';

const list = ref([]);
const app = getApp();
onLoad((options) => {
	if (options.type) {
		// list.value = getContactQuestionByType(+options.type);
		list.value = app.globalData.question.find((i) => i.id === +options.type).details;
	}
});
</script>

<style>
page {
	background-color: #f1f1f1;
}

.question-box {
	width: 80%;
	margin: 0 auto;
	background-color: #ffffff;
	padding: 20rpx 5%;
}

.question-title {
	height: 100rpx;
	line-height: 100rpx;
	font-weight: 700;
	font-size: 40rpx;
}

.question-desc {
	font-size: 30rpx;
}
</style>
