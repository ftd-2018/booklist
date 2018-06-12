const Base = require('./base');

class UserController extends Base {
	async setInfo(){
		const {ctx, app} = this;
		const param = ctx.request.body;
		param.id = app.userId;
		console.log(123, param);
		let result = await ctx.service.user.update(param);
		if(result.affectedRows === 1){
			return this.success("更新成功");
		}else{
			return this.fail("更新失败");
		}
	}
}

module.exports = UserController;