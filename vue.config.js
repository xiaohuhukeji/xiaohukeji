module.exports = {
	productionSourceMap: false,
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	lintOnSave: false,
	devServer: {
		open: process.env.VUE_APP_OPEN === 'false' ? false : true, // 自动打开浏览器
		host: '0.0.0.0', // 真机模拟，使用
		port: process.env.VUE_APP_PORT, // 前台代理端口号
		https: false, // https： {type: Booleam}
		hotOnly: false, // 热更新
		proxy: {
			// 设置代理
			'/apii': {
				target: 'http://1.116.45.168:8080',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/apii': '',
				},
			},
			'/apijdme': {
				target: 'https://me-api.jd.com',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/apijdme': '',
				},
			},
		},
	},
	chainWebpack(config) {
		// 移除打包后 index.html 所有打包好的文件都预加载行为
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
	},
	configureWebpack: {
		output: {
			filename: `js/[name].${new Date().getTime()}.js`,
			chunkFilename: `js/[name].${new Date().getTime()}.js`,
		},
	},
	css: {
		extract: {
			filename: `css/[name].${new Date().getTime()}.css`,
			chunkFilename: `css/[name].${new Date().getTime()}.css`,
		},
	},
};
