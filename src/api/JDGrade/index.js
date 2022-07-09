import request from '@/utils/requestjdGrade';

// 用户等级当前金豆
export function grade(data) {
	return request({
		url: '/kwxhome/myJd/home.json?&useGuideModule=0&bizId=&brandId=&fromType=wxapp&timestamp='+data,
		method: 'post',
	});
}
