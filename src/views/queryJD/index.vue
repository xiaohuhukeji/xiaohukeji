<template>
	<!-- 查询 -->
	<div>
		<div class="home">
			<div class="box-card1">
				<el-tabs v-model="Pagestate" :before-leave="Pagestateleave">
					<el-tab-pane label="登录" name="register"></el-tab-pane>
					<el-tab-pane label="查询" name="inquire"></el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<div v-if="Pagestate=='register'" class="home">
			<el-card class="box-card2">
				<el-tabs tab-position="left" style="height: 200px;" :before-leave="chopAccount">
					<el-tab-pane label="多账号切换">
						<el-form size='small' :model="form" label-position='top' :rules="rules" ref="ruleForm"
							label-width="100%" class="demo-ruleForm">
							<el-form-item label="切换账号:">
								<el-select @change="confirm" v-model="form.JDck" placeholder="请选择">
									<el-option v-for="item in accountChoice" :key="item.id" :label="item.accountName"
										:value="item.CK">
									</el-option>
								</el-select>
							</el-form-item>
						</el-form>

					</el-tab-pane>
					<el-tab-pane label="添加账号">
						<el-form size='small' :model="form" label-position='top' :rules="rules" ref="ruleForm"
							label-width="100%" class="demo-ruleForm">
							<el-form-item label="输入获取CK:" prop="JDck">
								<el-input @change="confirm" v-model="form.JDck" placeholder="请输入" />
							</el-form-item>
						</el-form>
					</el-tab-pane>
				</el-tabs>
			</el-card>
			<!-- <el-card class="box-card2">
				<el-form :model="form" label-position='top' :rules="rules" ref="ruleForm" label-width="100%"
					class="demo-ruleForm">
					<el-form-item label="输入获取CK:" prop="JDck">
						<el-input @change="confirm" v-model="form.JDck" placeholder="请输入" />
					</el-form-item>
				</el-form>
			</el-card> -->
		</div>
		<div v-if="Pagestate=='inquire'" class="home">
			<div class="interval">
				<el-card class="box-card">
					<el-row class="statistics" :gutter="10">
						<el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
							用户名：{{message.nickname||'未登录'}}
						</el-col>
						<el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
							等级：{{message.levelName||'无'}}
						</el-col>
						<el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
							是否是puls会员：{{message.isPlusVip=='1'?'是':'否'}}
						</el-col>
						<el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
							当前京豆：{{message.jingBean||'0'}}
						</el-col>
						<el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
							当前京享值：{{disposeMoney(message.uclass.substring(3,10)) }}
						</el-col>
						<el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="4">
							{{farmUserPro.name ||'未种植'}}：还需{{farmUserPro.waterD}}天
						</el-col>
						<el-col class="propertyStyle" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							今日资产：<div class="property">新增：<span
									class="green">{{disposeMoney(statistics[0].amount)}}</span>
								总共：<span class="red">{{disposeMoney(statistics[0].newlyadd)}}</span>
								过期：<span class="yellow">{{disposeMoney(statistics[0].pastdue)}}</span>
							</div>
						</el-col>
					</el-row>
				</el-card>
				<meta name="referrer" content="same-origin" />
			</div>
			<div class="interval">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<el-card class="box-card">
							<circleShow :key="timer" title="京豆" :dataFormat="dataFormat1" />
						</el-card>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
						<el-card class="box-card">
							<circleShow :key="timer" title="" :dataFormat="dataFormat2" />
						</el-card>
					</el-col>
					<!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
					<el-card class="box-card">
						<circleShow :key="timer" title="" :dataFormat="dataFormat3" />
					</el-card>
				</el-col> -->
				</el-row>
			</div>
			<div class="interval">
				<el-card class="box-card">
					<el-table :data="statisticsdata" border style="width: 100%">
						<el-table-column prop="createDate" label="日期">
						</el-table-column>
						<el-table-column prop="amount" label="收益">
						</el-table-column>
						<el-table-column prop="visibleInfo" label="活动名称">
						</el-table-column>
					</el-table>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		setStorage,
		getStorage,
		clearStorage
	} from '../../utils/stockpile';
	import circleShow from './module/circle'
	import {
		user_new
	} from '@/api/JDUser';
	import {
		grade
	} from '@/api/JDGrade';
	import {
		property,
		farmPlant,
		farmPlantget,
		adorable
	} from '@/api/JDAsset';
	export default {
		components: {
			circleShow
		},
		watch: {
			ck(newValue, oldValue) {
				if (newValue) {
					this.inquire()
					this.Pagestate = "inquire";
				}
			},

			dataFormat1: {
				handler(newValue, oldValue) {
					this.timer = new Date().getTime();
				},
				deep: true
			},
			farmUserPro: {
				handler(newValue, oldValue) {
					if (this.farmUserPro.waterTotalT && this.farmUserPro.totalWaterTaskTimes) {
						this.farmUserPro.waterD = Math.ceil(this.farmUserPro.waterTotalT / this.farmUserPro
							.totalWaterTaskTimes);
						this.dataFormat2[0].value = this.farmUserPro.treeEnergy
						this.dataFormat2[1].value = this.farmUserPro.treeTotalEnergy
						this.dataFormat2[2].value = this.farmUserPro.waterD
						this.dataFormat2[3].name = "种植名称：" + this.farmUserPro.name
						this.timer = new Date().getTime();
					}
				},
				deep: true
			},
			windowWidth(val) {
				let that = this;
				//	console.log("实时屏幕宽度：", val, that.windowWidth);
			}

		},
		data() {

			return {
				accountChoice: [],
				exist: true,
				Pagestate: "register",
				form: {
					JDck: "",
				},
				rules: {
					JDck: [{
						required: true,
						message: '请填写获取的CK',
						trigger: 'blur'
					}]
				},
				copycK: null,
				windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
				ck: '', // pt_key=AAJiwprrADBrX4YrPpcGabK0nXM-dbDLvxei-8Xt0SVoBdnagIDohhWV1gcfZS2InbyM35D3Aog; pt_pin=jd_ihqHxruhcDXX;
				timer: "", //时间戳，控制组件唯一性
				message: {
					nickname: "", //用户名
					levelName: "", //会员等级
					isPlusVip: "", //等于1就是puls会员
					jingBean: "", //当前京豆
					uclass: "", //京享值
				},
				farmUserPro: {
					name: "", //种植的植物
					treeEnergy: "", //已经浇水
					treeTotalEnergy: "", //总共需要浇水
					totalEnergy: "", //今天浇水
					treeState: "", //状态
					accomplish: "", //已完成
					waterTotalT: "", //已完成
					totalWaterTaskTimes: 0, //任务次数
					waterD: 0, //还需

				},
				levelName: {
					'注册用户': "😊普通",
					'钻石用户': "💎钻石",
					'金牌用户': "🥇金牌",
					'银牌用户': "🥈银牌",
					'铜牌用户': "🥉铜牌",
				},
				statistics: [{
					time: null,
					amount: 0, //总
					newlyadd: 0, //新增
					pastdue: 0, //过期
				}],
				statisticsdata: [],
				dataFormat1: [{
						value: 0,
						name: "新增"
					},
					{
						value: 0,
						name: "总共"
					},
					{
						value: 0,
						name: "过期"
					}
				],
				dataFormat2: [{
						value: 0,
						name: "已浇水"
					},
					{
						value: 0,
						name: "总共需要"
					},
					{
						value: 0,
						name: "还需多少天"
					},
					{
						value: 0,
						name: "种植名称"
					},
				],
				dataFormat3: [{
						value: 0,
						name: "新增"
					},
					{
						value: 0,
						name: "总共"
					},
					{
						value: 0,
						name: "过期"
					}
				],
			};
		},
		created() {},
		mounted() {
			if (getStorage('gainJDCK')) {
				if (getStorage('gainJDCK').length == '0') {
					this.accountChoice = [];
				} else {
					this.accountChoice = getStorage('gainJDCK')
				}
			}
			var that = this;
			window.onresize = () => {
				return (() => {
					window.fullWidth = document.documentElement.clientWidth;
					that.windowWidth = window.fullWidth;
				})()
			}
		},

		methods: {
			Pagestateleave() {
				if (this.copycK == null) {
					this.$message.warning("未填写ck无法切换");
					return false;
				}
				return true;
			},
			chopAccount() {
				this.form.JDck = "";
			},
			confirm() {
				this.$refs.ruleForm.validate((valid) => {
					if (valid) {
						let pt_key = "" //获取pt_key
						let pt_pin = "" //获取pt_pin
						let cutting = this.form.JDck.split(';')
						cutting.forEach((element, index) => {
							if (element.indexOf('pt_key=') != -1) {
								pt_key = cutting[index]
							}
							if (element.indexOf('pt_pin') != -1) {
								pt_pin = cutting[index]
							}
						});
						if (!pt_key) {
							this.$message.warning('请填写正确CK')
							return
						}
						if (!pt_pin) {
							this.$message.warning('请填写正确CK')
							return
						}
						this.copycK = pt_key + ';' + pt_pin + ';';
						this.form.dispose = pt_key + ';' + pt_pin + ';';
						document.cookie = this.copycK
						this.clear();
						user_new().then(res => {
							if (res.data) {
								this.ck = this.copycK;
							} else {
								this.accountChoice.forEach((item, index) => {
									if (item.CK == this.form.JDck) {
										this.accountChoice.splice(index, 1);
									}
								});
								this.ck = null;
								this.copycK = null;
								this.form.JDck = null;
								this.$message.warning("CK已失效");
								setStorage('user', JSON.stringify(this.accountChoice))
							}
						}).catch(() => {});


					}
				});
			},

			inquire() {
				//sessionStorage.clear()//清除
				//Session.set('token',JSON.parse(JSON.stringify(this.ck))); //保存
				//console.log(sessionStorage.getItem('token'));//取
				//this.clear() //清理cookie
				this.gain()
			},
			async gain() {
				//获取用户信息
				await this.gainUser()
				//获取当前京豆
				await this.gainGrade()
				//获取京东
				await this.gainProperty()
				//获取农场
				await this.farmGet()
				await this.farmPost()
				// //获取东东萌宠
				// await this.adorable()
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
				this.copycK.split(';').forEach(element => {
					document.cookie = element
				});
			},
			gainUser() {
				user_new().then(res => {
					if (res.data) {
						this.message.nickname = res.data.userInfo.baseInfo.nickname;
						this.message.levelName = this.levelName[res.data.userInfo.baseInfo.levelName] || "-";
						this.message.isPlusVip = res.data.userInfo.isPlusVip;
						this.exist = true;
						this.accountChoice.forEach((item, index) => {
							if (item.CK == this.form.JDck) {
								this.exist = false
							}
						});
						if (this.exist) {
							if (this.accountChoice.length == '0') {
								let add = {
									id: 1,
									accountName: this.message.nickname,
									CK: this.form.JDck,
								}
								this.accountChoice.push(add)
								setStorage('user', JSON.stringify(this.accountChoice))
							} else {
								let add = {
									id: this.accountChoice.length + 1,
									accountName: this.message.nickname,
									CK: this.form.JDck,
								}
								this.accountChoice.push(add)
								setStorage('user', JSON.stringify(this.accountChoice))
							}
						}
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
						if (!this.message.nickname) {
							this.message.nickname = petName
						}
						this.message.jingBean = jingBean
						this.message.uclass = uclass
					}
				}).catch(() => {});
			},
			gainProperty() {
				let atPresent = new Date()
				let atPresent1 = new Date(atPresent).getTime() - 24 * 1 * 60 * 60 * 1000;
				let atPresent2 = new Date(atPresent).getTime() - 24 * 2 * 60 * 60 * 1000;
				let atPresent3 = new Date(atPresent).getTime() - 24 * 3 * 60 * 60 * 1000;
				let atPresent4 = new Date(atPresent).getTime() - 24 * 4 * 60 * 60 * 1000;
				let atPresent5 = new Date(atPresent).getTime() - 24 * 5 * 60 * 60 * 1000;
				let atPresent6 = new Date(atPresent).getTime() - 24 * 6 * 60 * 60 * 1000;
				this.statistics = [{
					time: this.formatDate(atPresent),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}, {
					time: this.formatDate(atPresent1),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}, {
					time: this.formatDate(atPresent2),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}, {
					time: this.formatDate(atPresent3),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}, {
					time: this.formatDate(atPresent4),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}, {
					time: this.formatDate(atPresent5),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}, {
					time: this.formatDate(atPresent6),
					amount: 0,
					newlyadd: 0,
					pastdue: 0,
				}]
				// console.log(this.formatDate(atPresent),this.formatDate(atPresent1));
				property().then(res => {
					this.statisticsdata = res.list;
					res.list.forEach(element => {
						this.statistics.forEach((elemen1, index) => {
							if (element.createDate.substring(0, 10) == elemen1.time) {
								this.statistics[index].amount = this.statistics[index].amount +
									element.amount;
								if (element.amount > 0) {
									this.statistics[index].newlyadd = this.statistics[index]
										.newlyadd + element.amount;
								} else {
									this.statistics[index].pastdue = this.statistics[index]
										.pastdue + element.amount;
								}

							}
						});
					});
					this.dataFormat1[0].value = this.statistics[0].newlyadd;
					this.dataFormat1[1].value = this.statistics[0].amount;
					this.dataFormat1[2].value = Math.abs(this.statistics[0].pastdue);
				}).catch(() => {});
			},
			farmGet() {
				farmPlantget().then(res => {
					this.farmUserPro.totalWaterTaskTimes = res.totalWaterTaskInit.totalWaterTaskTimes
				}).catch(() => {});
			},
			farmPost() {
				farmPlant().then(res => {
					const {
						name,
						treeEnergy,
						treeTotalEnergy,
						treeState,
						totalEnergy
					} = res.farmUserPro
					this.farmUserPro.name = name;
					this.farmUserPro.treeEnergy = treeEnergy;
					this.farmUserPro.treeTotalEnergy = treeTotalEnergy;
					this.farmUserPro.treeState = treeState;
					this.farmUserPro.totalEnergy = totalEnergy;
					this.farmUserPro.accomplish = ((treeEnergy / treeTotalEnergy) * 100).toFixed(0)
					this.farmUserPro.waterTotalT = (treeTotalEnergy - treeEnergy - totalEnergy) / 10; //一共还需浇多少次水

				}).catch(() => {});
			},
			adorable() {
				adorable().then(res => {}).catch(() => {});
			},
			// 处理时间戳，返回 yyyy-MM-dd格式
			formatDate(time) {
				let date = new Date(time);
				let YY = date.getFullYear() + "-";
				let MM =
					(date.getMonth() + 1 < 10 ?
						"0" + (date.getMonth() + 1) :
						date.getMonth() + 1) + "-";
				let DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				return YY + MM + DD;
			},
			//处理金额
			disposeMoney(money) {
				if (!money) {
					return 0
				}
				return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			}
		}
	};
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>