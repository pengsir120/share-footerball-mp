<template>
	<view class="map-box">
		<map id="map" class="map" :latitude="latitude" :longitude="longitude" show-location :markers="markers" :scale="10" @markertap="handleMarkerTap" @tap="handleMapTap"></map>
		<view v-show="isScan" class="scan-box scan-title" @tap="handleScan">扫码借还</view>
		<view v-show="!isScan" class="scan-box marker-sunmmary">
			<view class="scan-box-left">
				<image :src="currentMarker?.iconPath" mode="widthFix"></image>
			</view>
			<view class="scan-box-center">
				<view class="top scan-box-center-item">
					{{ currentMarker?.title || '-' }}
				</view>
				<view class="bottom scan-box-center-item">
					{{ currentMarker?.address || '-' }}
				</view>
			</view>
			<view class="scan-box-right" @tap="handleNavTap">
				<image src="/static/nav.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="action-box">
			<image v-for="item in actionList" :key="item.id" :src="item.src" mode="widthFix" @tap="handleImageTap(item)"></image>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
// import { markers } from '../../pages-data/index.js';
import api from '../../api/index.js';

const longitude = ref(0);
const latitude = ref(0);
const currentMarker = ref(null);
const isScan = ref(true);
const markers = ref([]);
const orderNo = ref(uni.getStorageSync('orderNo') || '');

const app = getApp();

onLoad(() => {
	uni.getLocation({
		success(res) {
			console.log('res', res);
			longitude.value = res.longitude;
			latitude.value = res.latitude;
		},
		fail(err) {
			console.log('err', err);
		}
	});

	api.getStadiumList().then((res) => {
		if (res.code === 0) {
			console.log('res', res);
			app.globalData.markers = markers.value = res.data.map((i) => {
				return {
					...i,
					width: 40,
					height: 40,
					iconPath: '/static/icon.png',
					latitude: +i.latitude,
					longitude: +i.longitude,
					title: i.name
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

const handleMarkerTap = (e) => {
	const current = markers.value.find((i) => i.id === e.detail.markerId);
	console.log('current', current);
	currentMarker.value = current;
	isScan.value = false;
};

const handleScan = () => {
	if (!app.globalData.token) {
		uni.showModal({
			title: '尚未登录',
			content: '点击确认进行登录',
			success(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}
			}
		});
		return;
	}

	uni.scanCode({
		success(res) {
			console.log('res', res.result);

			const stadiumId = res.result;

			if (!orderNo.value) {
				console.log('create');
				api.orderCreate({ stadiumId }).then((res) => {
					if (res.code === 0) {
						if (res.data.orderNo) {
							orderNo.value = res.data.orderNo;

							uni.setStorage({
								key: 'orderNo',
								data: res.data.orderNo
							});

							uni.showToast({
								title: '创建成功',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '创建失败',
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title: '创建失败',
							icon: 'none'
						});
					}
				});
			} else {
				api.orderFinish({
					orderNo: orderNo.value
				}).then((res) => {
					if (res.code === 0) {
						uni.removeStorage({
							key: 'orderNo'
						});

						uni.showToast({
							title: '结束成功',
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				});
				console.log('finish');
			}
		}
	});
};

const handleMapTap = () => {
	// isScan.value = true;
};

const handleNavTap = () => {
	console.log('跳转到场馆详情');
	uni.navigateTo({
		url: `/pages/ground/ground?id=${currentMarker.value.id}`
	});
};

const actionList = [
	{
		id: 1,
		src: '/static/search.png',
		name: '地图搜索'
	},
	{
		id: 2,
		src: '/static/support.png',
		name: '客服中心'
	},
	{
		id: 3,
		src: '/static/origin.png',
		name: '回到原点'
	},
	{
		id: 4,
		src: '/static/profile.png',
		name: '个人中心'
	}
];

const handleImageTap = ({ id }) => {
	switch (id) {
		case 1:
			uni.chooseLocation({
				success(res) {
					console.log('res', res);
					longitude.value = res.longitude;
					latitude.value = res.latitude;
				}
			});
			break;
		case 2:
			console.log('客服中心');
			uni.navigateTo({
				url: '/pages/contact/contact'
			});
			break;
		case 3:
			const mapContext = uni.createMapContext('map');
			mapContext.moveToLocation();
			break;
		case 4:
			console.log('个人中心');
			if (!app.globalData.token) {
				uni.showModal({
					title: '尚未登录',
					content: '点击确认进行登录',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				});
				return;
			}
			uni.navigateTo({
				url: '/pages/profile/profile'
			});
			break;
		default:
			break;
	}
};
</script>

<style>
.map-box {
}
.map {
	width: 100vw;
	height: 100vh;
}
.scan-box {
	position: absolute;
	width: 80%;
	height: 120rpx;
	left: 10%;
	bottom: 100rpx;
	background-color: #1296db;
	box-shadow: 0 0 20rpx #1296db;
	border-radius: 20rpx;
	padding: 20rpx 0;
	display: flex;
}

.marker-sunmmary {
	background-color: white;
}

.scan-box-left,
.scan-box-right {
	width: 120rpx;
	margin: 0 20rpx;
}

.scan-box-left image,
.scan-box-right image {
	width: 100%;
	border-radius: 50%;
}

.scan-box-right image {
	width: 80%;
	margin: 10% 0 0 10%;
}

.scan-box-center {
	flex: 1;
}

.scan-box-center-item {
	width: 280rpx;
	height: 60rpx;
	line-height: 60rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.top {
	font-weight: 700;
}
.bottom {
	font-size: 28rpx;
}

.scan-title {
	font-size: 50rpx;
	font-weight: 700;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	letter-spacing: 4rpx;
}

.action-box {
	position: absolute;
	right: 10%;
	bottom: 300rpx;
	width: 90rpx;
}

.action-box image {
	width: 50rpx;
	padding: 20rpx;
	border-radius: 50%;
	box-shadow: 0 0 20rpx #1296db;
	background-color: #ffffff;
	margin-bottom: 40rpx;
}
</style>
