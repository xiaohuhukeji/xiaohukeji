import request from '@/utils/requestjdUser';

// 用户登录
export function user_new(params) {
	return request({
		url: '/user_new/info/GetJDUserInfoUnion',
		method: 'get',
		data: params,
	});
}
