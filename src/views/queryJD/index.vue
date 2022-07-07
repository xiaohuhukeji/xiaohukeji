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
				ck: 'pt_key=AAJiwprrADBrX4YrPpcGabK0nXM-dbDLvxei-8Xt0SVoBdnagIDohhWV1gcfZS2InbyM35D3Aog; pt_pin=jd_ihqHxruhcDXX;',
				message: {
					nickname: "", //用户名
					levelName: "", //会员等级
					isPlusVip: "" //等于1就是puls会员
				},
				levelName: {
					'注册用户': "😊普通",
					'钻石用户': "💎钻石",
					'金牌用户': "🥇金牌",
					'银牌用户': "🥈银牌",
					'铜牌用户': "🥉铜牌",
				}
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
					if (res.data) {
						this.message.nickname = res.data.userInfo.baseInfo.nickname;
						this.message.levelName = this.levelName[res.data.userInfo.baseInfo.levelName] || "-";
						this.message.isPlusVip = res.data.userInfo.baseInfo.isPlusVip;
					} else {
						this.$message.warning("CK已失效");
					}
					console.log(this.message);

				}).catch(() => {});
			}
		}
	};
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>