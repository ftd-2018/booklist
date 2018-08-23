const Base = require('./base');
const Util = require('../../utils/util');
const util = new Util();

class AuthController extends Base {
	constructor(props) {
		super(props);
		this.token =new this.ctx.helper.Token(this.ctx);
	}
	async loginByWeixinAction() {
		console.log(123123);
		let token = new this.ctx.helper.Token(this.ctx);
		const ctx = this.ctx;
		const code = ctx.request.body.code;
		const fullUserInfo = ctx.request.body.userInfo;
		const userInfo = fullUserInfo.userInfo;

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

		const sessionData = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session',options);
		if (!sessionData.data.openid) {
		  return this.fail('登录失败1');
		}
		// 验证用户信息完整性（数字签名验证）
		const crypto = require('crypto');
		const sha1 = crypto.createHash('sha1').update(fullUserInfo.rawData + sessionData.data.session_key).digest('hex');
		if (fullUserInfo.signature !== sha1) {
		  return this.fail('登录失败2');
		}
		//根据openid查找用户是否已经注册
		let userMsg = await ctx.service.user.find({openid: sessionData.data.openid});
		if(ctx.helper.isEmpty(userMsg)){
			let result = await ctx.service.user.insert({
				username: userInfo.nickName,
				register_time: parseInt(new Date().getTime() / 1000),
				last_login_time: parseInt(new Date().getTime() / 1000),
				openid: sessionData.data.openid,
				avatar: userInfo.avatarUrl || '',
				gender: userInfo.gender || 1, // 性别 0：未知、1：男、2：女
			});
			
			if(result.affectedRows === 1){
				console.log("插入成功");
			}
			userMsg = {};
			userMsg.id = result.insertId;
		}
		
		sessionData.data.user_id = userMsg.id;
		// 查询用户信息
		const resultNewUser = await ctx.service.user.find({
			id: userMsg.id
		});
		
		const newUserInfo = {
			avatar: resultNewUser.avatar,
			username: resultNewUser.username,
			undergraduate: resultNewUser.undergraduate,
			master_school: resultNewUser.master_school,
			wechat_id: resultNewUser.wechat_id,
			tel_id: resultNewUser.tel_id,
			introduce: resultNewUser.introduce
		}
		
		// 更新登录信息
		const resultUpdata = await ctx.service.user.update({
			id: userMsg.id,
			last_login_time: parseInt(new Date().getTime() / 1000)
		});

		if(resultUpdata.affectedRows === 1){
			console.log("更新成功");
		}

		// 生成 Token 返回 客户端
		const sessionKey = await this.token.create(sessionData);
		
		return this.success({ token:sessionKey, userInfo: newUserInfo });
		
	}
}

module.exports = AuthController;