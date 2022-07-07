<template>
	<!-- 添加CK -->
	<div class="home">
		<div>
			<el-button @click="inquire">默认按钮</el-button>
		</div>
	</div>
</template>

<script>
	import {
		user_new
	} from '@/api/JDme';
	export default {
		data() {
			return {
				ck: ''
			};
		},
		created() {},
		mounted() {},
		methods: {
			inquire() {
				//sessionStorage.clear()//清除
				//Session.set('token',JSON.parse(JSON.stringify(this.ck))); //保存
				//console.log(sessionStorage.getItem('token'));//取
				var cookies = document.cookie.split(";");
				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					document.cookie =
						name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				}
				if (cookies.length > 0) {
					for (var i = 0; i < cookies.length; i++) {
						var cookie = cookies[i];
						var eqPos = cookie.indexOf("=");
						var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
						var domain = location.host.substr(location.host.indexOf("."));
						document.cookie =
							name +
							"=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +
							domain;
					}
				}
				document.cookie = this.ck
				user_new().then(res => {
					console.log(res.data.userInfo.baseInfo.nickname);

				}).catch(() => {});
			}
		}
	};
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>