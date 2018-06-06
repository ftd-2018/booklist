const Controller = require('egg').Controller;

class AuthController extends Controller {
	async index() {
		const code = this.ctx.request.body.code;
		const userInfo = this.ctx.request.body.userInfo;
		console.log(1111111, code);
		
		this.ctx.body = {message:'请求成功', data:1};
		this.ctx.set('Accept', "*");
		this.ctx.set("Content-Type", "application/json;charset=UTF-8");
		this.ctx.set("hubojun", "123");
	}
}

module.exports = AuthController;