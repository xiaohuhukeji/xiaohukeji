<template>
	<div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
	import * as echarts from 'echarts';
	require("echarts/theme/macarons"); // echarts theme
	import resize from "./mixins/resize";

	export default {
		mixins: [resize],
		props: {
			className: {
				type: String,
				default: "chart"
			},
			width: {
				type: String,
				default: "100%"
			},
			height: {
				type: String,
				default: "200px"
			},
			title: {
				type: String,
				default: "内容"
			},
			amount: {
				type: String,
				default: "0"
			},
			dataFormat: {
				type: Array,
				default: function () {
					return [{
							value: 10,
							name: "内容1"
						},
						{
							value: 20,
							name: "内容2"
						},
						{
							value: 5,
							name: "内容3"
						}
					];
				}
			},
			setcolor: {
				type: Array,
				default: function () {
					return ['#ff0000', '#00b050', '#feb22f'];
				}
			},
		},

		data() {
			return {
				chart: null,
				dataFormats: this.dataFormat
			};
		},

		mounted() {
			this.$nextTick(() => {
				this.initChart();
			});
		},
		beforeDestroy() {
			if (!this.chart) {
				return;
			}
			this.chart.dispose();
			this.chart = null;
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, "macarons");
				this.chart.setOption({
					//backgroundColor: '#000',
					tooltip: {
						trigger: 'item',
						formatter: '{b} <br/>{c}: ({d}%)',
					},
					color: this.setcolor,
					legend: {
						orient: 'vertical',
						top: 'center',
						left: '60%',
						// formatter:'{b}<br/>{c})',
						itemGap: 30,
						textStyle: {
							color: 'black',
							fontSize: '20px',
							// lineHeight: '50px'
						},
						icon: 'circle',
						itemWidth: 8,
					},

					series: [{
							name: 'Access From',
							type: 'pie',
							radius: ['50%', '70%'],
							center: ['30%', '50%'],
							avoidLabelOverlap: false,

							label: {
								normal: {
									show: true,
									position: 'center',
									// color: '#00b0f0',
									// text: '1111'
									fontSize: '14px',
									formatter: '{b}:' + '{c}' + this.title,
									//  formatter: '{total|b}\n{active|总面积}', 
									rich: {
										total: {
											fontSize: 35,
											fontFamily: "微软雅黑",
											color: '#23e5fd'
										},
										active: {
											fontFamily: "微软雅黑",
											fontSize: 16,
											color: '#00b0f0',
											lineHeight: 30,
										},
									}
								},
							},
							labelLine: {
								show: false,
							},
							data: this.dataFormat,
							//   [
							//     { value: 300, name: '公共区面积' },
							//     { value: 120, name: '未占用面积' },
							//     { value: 3180, name: '已占用面积' },
							//   ],
						},
						{
							color: ['#61a0a8'],

							type: 'pie',
							// clockWise: false, //顺时加载
							hoverAnimation: false, //鼠标移入变大
							center: ['30%', '50%'],
							radius: ['48%', '50%'],
							label: {
								normal: {
									show: false
								}
							},
							data: [{
								value: 9,
								name: '',
								itemStyle: {}
							}]
						},

					],
				}, );
			}
		}
	};
</script>