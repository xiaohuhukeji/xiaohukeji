import request from '@/utils/requestxdd';

// 用户登录
export function postSpread(params) {
	return request({
		url: '/api/login/smslogin',
		method: 'post',
		data: params,
	});
}
