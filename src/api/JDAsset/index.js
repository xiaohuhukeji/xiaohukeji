import request from '@/utils/requestjdAsset';

// 资产
export function property(params) {
	return request({
		url: '/?appid=jd-cphdeveloper-m&functionId=myBean&body=%7B%22tenantCode%22%3A%22jgm%22%2C%22bizModelCode%22%3A6%2C%22bizModeClientType%22%3A%22M%22%2C%22externalLoginType%22%3A1%7D&g_login_type=0&g_tk=466751646&g_ty=ajax&appCode=ms0ca95114',
		method: 'get',
		data: params,
	});
}
