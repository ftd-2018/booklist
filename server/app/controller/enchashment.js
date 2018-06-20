const Base = require('./base');

class EnchashmentController extends Base {
	async add(){
		const {ctx, app} = this;
		const credit = ctx.request.body.credit;
		const wechat = ctx.request.body.wechat;

		// 保证 credit 为数字 
		if(!/^[0-9]*$/.test(credit)) 
			return this.fail("credit类型错误");

		const uInfo = await ctx.service.user.find({
			id: app.userId
		});
		const result = await ctx.service.user.update({
			id: app.userId,
			credit: uInfo.credit - credit
		});

		if(result.affectedRows === 1){
			const resultSave = await ctx.service.enchashment.newAndSave(credit, wechat);
			if(resultSave.affectedRows === 1)
				return this.success("提审成功");
			else
				return this.fail("已扣除积分，但提审失败");
		}else{
			return this.fail("提审失败")	
		}
	}
}

module.exports = EnchashmentController;