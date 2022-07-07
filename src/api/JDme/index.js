import request from '@/utils/requestjdme';

// 用户登录
export function user_new(params) {
	return request({
		url: '/user_new/info/GetJDUserInfoUnion',
		method: 'get',
		data: params,
	});
}
