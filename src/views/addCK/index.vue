<template>
	<!-- 添加CK -->
	<div class="home">
		<div>
			<el-card class="frame" shadow="always">
				<div class="centered">
					<el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="输入获取CK:" prop="JDck">
							<el-input @change="monitor" v-model="form.JDck" placeholder="请输入" />
						</el-form-item>
						<el-form-item label="输入QQ号:" prop="QQ">
							<el-input v-model="form.QQ" placeholder="请输入" />
						</el-form-item>
						<!-- <el-form-item label="简洁CK:">
							{{copycK}}
						</el-form-item> -->
						<el-form-item class="operate">
							<el-row :gutter="10">
								<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
									<el-button type="success" @click="copyCK()">复制简洁CK</el-button>
								</el-col>
								<el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
									<el-button type="warning" @click="skip()">教程</el-button>
								</el-col>
								<el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
									<el-button type="primary" @click="confirm()">登录</el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-form>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	import {
		postSpread
	} from '@/api/XDD';
	import {
		user_new
	} from '@/api/JDUser';
	export default {
		data() {
			return {
				form: {
					//	JDck: "", //__jda=122270672.16569207335361090526640.1656920733.1656920733.1656920733.1; __jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1656920733537; __jdc=122270672; mba_muid=16569207335361090526640; shshshfpb=c7Ta5yvZGg93IdyJW1w7_VA; shshshfp=898090c24dbab7312c7080addb6b53ec; shshshfpa=57ce6ae2-3508-d56d-4048-5c2c163c6cf1-1647070325; shshshsID=a1f66047ccfb98aa8f22a6ee7661b04d_1_1656920733863; 3AB9D23F7A4B3C9B=KL6BPL373B7ZKWZAALG3GKBF2LFRAQTKLJASXULTD3J2MNZV3ITYUBDIK2P2EMVHTTZ6WZ5SUV6ECVZHOJUJOYDSXU; jcap_dvzw_fp=7tD-rmTdx_4blWIvk2EluYH0UG-xJ8uic3qnOvo5k4hxa_ww4sDm5GWn3Jrh-L0ca0GTxw==; TrackerID=O3jxSgvJvhfcCzAhYmZIbDQtzdfRDtrNn6SXPU1g1YmuehP9kbDv78maa99mo47eZrUL0aWUdOqTLJa9LZqhDtYJtYQW4f5Tqc7T1Jo8ezp7j4eior8Zxd7u84GOUu0K; pt_key=AAJiwprrADBrX4YrPpcGabK0nXM-dbDLvxei-8Xt0SVoBdnagIDohhWV1gcfZS2InbyM35D3Aog; pt_pin=jd_ihqHxruhcDXX; pt_token=xk4a62su; pwdt_id=jd_ihqHxruhcDXX; sfstoken=tk01mc1e91c98a8sMngzdzlZZnE26Ju1YdKxLEGttNT00hCtSs6zLh5qK8wLMg8Jea4kLN7N/CV1hYGjF2yyRkqflWrj; whwswswws=; wxa_level=1; retina=1; cid=9; wqmnx1=MDEyNjM5M3AueiBBMiliMyxjbTZvYTZzbjJRRCpI; jxsid=16569208124187782364; appCode=ms0ca95114; webp=1; __jdb=122270672.2.16569207335361090526640|1.1656920733; mba_sid=16569207335398062724991592074.2; visitkey=159147350652647; autoOpenApp_downCloseDate_jd_homePage=1656920813558_1; __jd_ref_cls=MDownLoadFloat_AppArouse
					JDck: "",
					dispose: '',
					QQ: ''
				},
				copycK: '',
				nickname:'',
				rules: {
					JDck: [{
						required: true,
						message: '请填写获取的CK',
						trigger: 'blur'
					}],
					QQ: [{
						required: true,
						message: '请输入QQ号，否则无法查询',
						trigger: 'blur'
					}],
				}
			};
		},
		created() {},
		mounted() {},
		methods: {
			skip() {
				window.open('http://xiaohukeji.vip:181/index.php/2022/06/23/%e4%ba%ac%e4%b8%9c%e8%8e%b7%e5%8f%96ck/',
					'_blank');
			},
			copyCK() {
				if (this.copycK) {
					let input = document.createElement('input');
					input.value = this.copycK;
					document.body.appendChild(input);
					input.select();
					document.execCommand('Copy');
					this.$message.success('复制成功！');
					input.remove();
				} else {
					this.$message.warning('请填写正确CK')
				}

			},
			monitor() {
				if (!this.form.JDck) {
					this.copycK = "";
				}
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
				this.copycK = ""
				if (!pt_key) {
					return
				}
				if (!pt_pin) {
					return
				}
				this.copycK = pt_key + ';' + pt_pin + ';';
			},
			confirm() {
				// user_new().then(res => {})
				// 	.catch(() => {});
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
						document.cookie = this.copycK
						user_new().then(res => {
							  if (res.data) {
								this.nickname=res.data.userInfo.baseInfo.nickname
								this.addxdd()
							  }else{
								this.$message.warning("CK已失效");
							  }
						}).catch(() => {});


					}
				});
			},
			addxdd() {
				var formData = new FormData();
				formData.append("token", "342414384");
				formData.append("ck", this.form.dispose);
				formData.append("qq", this.form.QQ);
				postSpread(formData).then(res => {
						// eslint-disable-next-line no-console
						if (res.code == '200') {
							this.$message.success("恭喜"+this.nickname+"登录成功");
							this.$refs.ruleForm.resetFields();
						}
					})
					.catch(() => {
						this.$message.warning("登录失败");
					});
			}
		}
	};
</script>

<style scoped lang="scss">
	@import './index.scss';
</style>