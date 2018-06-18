const Base = require('./base');

class UserController extends Base {
	async getUserList(){
		const {ctx} = this;
		const param = ctx.request.body;
		const result = await ctx.service.user.searchByTelWX(param);
		return this.success(result);
	}

	async updateCredit(){
		const {ctx} = this;
		const credit = ctx.request.body.credit;
		const id = ctx.request.body.id;
		const result = await ctx.service.user.updateCredit(id, credit);
		if(result.affectedRows === 1){
			return this.success("更新成功");
		}else{
			return this.fail("更新失败");
		}
	}
}

module.exports = UserController;