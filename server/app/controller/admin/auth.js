const Base = require('./base');
const bcrypt = require('bcrypt');

class AuthController extends Base {
	constructor(props) {
		super(props);
		this.token =new this.ctx.helper.Token(this.ctx);
	}
	async login(){
		const {ctx} = this;
		const username = ctx.request.body.userName;
    	const password = ctx.request.body.password;
    	const admin = await ctx.service.admin.admin.getByUName(username);
    	if (ctx.helper.isEmpty(admin)) {
			return this.fail('不存在该用户');
	    }
	    // 解盐
	    if (!bcrypt.compareSync(password, admin.password_hash)) {
			return this.fail('密码不正确');
	    }

	    // 更新登录信息
	    await ctx.service.admin.admin.update({
	      id: admin.id,
	      last_login_time: ctx.helper.timest(),
	      last_login_ip: ctx.ip
	    });

	    const sessionKey = await this.token.create({
	    	user_id: admin.id
	    });

	    if (ctx.helper.isEmpty(sessionKey)) {
			return this.fail('登录失败');
	    }

	    const userInfo = {
			id: admin.id,
			username: admin.username
		};

		return this.success({ token: sessionKey, userInfo: userInfo });
	}
}

module.exports = AuthController;