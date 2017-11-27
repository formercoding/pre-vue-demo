<template>
	<div id="wrapper">
		<div id="scroller">
			<ul>
				<li v-for="i in num">Pretty row {{i}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
let myscroll;
import iscroll from 'iscroll'
export default {
	name: 'app',
	data() {
		return {
			num: 100
		}
	},
	mounted() {
		myscroll = new iscroll('#wrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: false
		});
		let _this = this;
		setInterval(() => {
			_this.num = parseInt(Math.random() * 100);
			_this.$nextTick(() => {
				myscroll.refresh();
			});
		}, 1000);
	},

	updated() {
		console.log('update');
	}
}
</script>

<style>
#wrapper {
	position: relative;
	height: 500px;
	width: 50%;
	overflow: hidden;
}
ul {
	margin: 0;
}
#scroller {
}
</style>
