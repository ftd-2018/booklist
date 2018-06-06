const Controller = require('egg').Controller;

class AuthController extends Controller {
	async loginByWeixinAction() {
		const code = this.ctx.request.body.code;
		// const fullUserInfo = this.ctx.request.body.userInfo;
		// const userInfo = fullUserInfo.userInfo;
		// const clientIp = ''; // 暂时不记录 ip

		// 获取openid
		const options = {
			method: 'GET',
			contentType: 'json',
			data: {
				grant_type: 'authorization_code',
				js_code: code,
				secret: this.config.wx.secret,
				appid: this.config.wx.appid
			},
			dataType: 'json'
		};
		const result = await this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session',options);
		console.log('result', result);

		this.ctx.body = {message:'请求成功', data:1};
	}
}

module.exports = AuthController;