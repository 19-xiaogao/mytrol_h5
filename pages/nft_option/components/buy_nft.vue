<template>
	<div id='buy_html'>
		<div>xxxxxxxxxxxxx</div>
	</div>
</template>

<script>
	export default ({
		data() {
			return {

			}
		},
		props: {

		},
		mounted() {
			// 创建支付宝调用页面
			const div = document.createElement('div');
			div.innerHTML = this.$route.query.htmls;
			document.body.appendChild(div);
			document.forms[0].submit();
		},
		computed: {
			html() {
				console.log(this.$store.state.buy_html)
				return this.$store.state.buy_html
			}
		}
	})
</script>

<style>
	#buy_html {
		width: 100vw;
		height: 100vh;
	}
</style>
