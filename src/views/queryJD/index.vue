<template>
	<!-- 添加CK -->
	<div class="home">
		<div>
			<meta name="referrer" content="same-origin" />
			<el-button @click="inquire">默认按钮</el-button>
		</div>
	</div>
</template>

<script>
	import {
		user_new
	} from '@/api/JDUser';
	import {
		grade
	} from '@/api/JDGrade';
	import {
		property
	} from '@/api/JDAsset';
	export default {
		data() {
			return {
				ck: 'pt_key=AAJitpEaADBvXWzDTN5LWO8QEkOzFNdlFraXG8A9ojwpKNY8kBeeZXR8YY0595Knak_m8B5ezSs;pt_pin=jd_5795feed172f0;',
				message: {
					nickname: "", //用户名
					levelName: "", //会员等级
					isPlusVip: "", //等于1就是puls会员
					jingBean: "", //当前京豆
					uclass: "", //京享值

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

				this.clear() //清理cookie
				this.gain()
			},
			async gain() {
				//获取用户信息
				await this.gainUser()
				//获取当前京豆
				await this.gainGrade()
				//获取京东
				await this.gainProperty()
			},
			clear() {
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
			},
			gainUser() {
				user_new().then(res => {
					if (res.data) {
						this.message.nickname = res.data.userInfo.baseInfo.nickname;
						this.message.levelName = this.levelName[res.data.userInfo.baseInfo.levelName] || "-";
						this.message.isPlusVip = res.data.userInfo.baseInfo.isPlusVip;
					} else {
						this.$message.warning("CK已失效");
					}
				}).catch(() => {});
			},
			gainGrade() {
				let date = Date.now()
				grade(date).then(res => {
					if (res.user) {
						let {
							petName,
							jingBean,
							uclass
						} = res.user
						// this.message.nickname=petName
						this.message.jingBean = jingBean
						this.message.uclass = uclass
					}
				//	console.log(parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 - (24 * 60 *60 * 1000));
				}).catch(() => {});
			},
		    gainProperty(){
				property().then(res => {
				
				}).catch(() => {});
			},
		}
	};
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>