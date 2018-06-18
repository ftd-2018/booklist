const Base = require('./base');

class EnchashmentController extends Base {
	async getList(){
		const {ctx} = this;
		const result = await ctx.service.admin.enchashment.search(ctx.request.body);
		return this.success(result);
	}

	async enchashment(){ 
		const {ctx} = this;
		const enchashmentID = ctx.request.body.enchashmentID;
		const result = await ctx.service.admin.enchashment.isEnchashment(enchashmentID, 1);
		if(result.affectedRows === 1){
			return this.success("提现成功");
		}else{
			return this.fail("提现失败");
		}
	}

	async revoke(){
		const {ctx} = this;
		const enchashmentID = ctx.request.body.enchashmentID;
		const result = await ctx.service.admin.enchashment.isEnchashment(enchashmentID, 0);
		if(result.affectedRows === 1){
			return this.success("撤销成功");
		}else{
			return this.fail("撤销失败");
		}
	}
}

module.exports = EnchashmentController;