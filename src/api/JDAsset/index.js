import request from '@/utils/requestjdAsset';

// 资产
export function property() {
	return request({
		url: '?appid=jd-cphdeveloper-m&functionId=myBean&body=%7B%22tenantCode%22%3A%22jgm%22%2C%22bizModelCode%22%3A6%2C%22bizModeClientType%22%3A%22M%22%2C%22externalLoginType%22%3A1%7D&g_login_type=0&g_tk=466751646&g_ty=ajax&appCode=ms0ca95114',
		method: 'get',
		data: null,
	});
}

//获取东东农场
export function farmPlantget() {
	return request({
		url: '?functionId=taskInitForFarm&version=14&channel=1&babelChannel=120&appid=wh5',
		method: 'get',
		data: null,
	});
}
//获取东东农场
export function farmPlant() {
	return request({
		url: '?functionId=initForFarm&appid=wh5&clientVersion=9.1.0&version=4',
		method: 'post',
		data: null,
	});
}
//获取东东萌宠
export function adorable() {
	return request({
		url: '?functionId=initPetTown&appid=wh5&loginWQBiz=pet-town&clientVersion=9.0.4',
		method: 'post',
		data: null,
	});
}