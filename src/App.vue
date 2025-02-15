<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
	console.log('App Launch');
});
onShow(() => {
	console.log('App Show');
});
onHide(() => {
	console.log('App Hide');
});
</script>
<style>
.button {
	width: 368rpx;
	color: #ffffff;
	background-color: #1296db;
	font-weight: bold;
	letter-spacing: 2rpx;
	margin: 0 auto;
}

.ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
