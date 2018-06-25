const Base = require('./base');

class PurchaseController extends Base {
	async addPurchase(){
		const {ctx, app} = this;
		const courseID = ctx.request.body.courseID;
		const status = await ctx.service.purchase.addPurchase(courseID);
		if(status == 1){
			this.success("订阅成功");
		}else{
			this.fail("账户积分不足，请加客服微信fcsboy，进行充值");
		}
	}

	async listMyPurchase(){
		const {ctx, app} = this;
		const page = ctx.request.body.page;
		const size = ctx.request.body.size;
		const result = await ctx.service.purchase.selectMyPurchase(page, size);
		return this.success(result);
	}

	async listMyPurchaseAboutMe(){
		const {ctx, app} = this;
		const page = ctx.request.body.page;
		const size = ctx.request.body.size;
		const result = await ctx.service.purchase.selectPurchaseAboutMe(page, size);
		const userInfo = await ctx.service.user.find({
			id: app.userId
		});
		let param = {
			list: result,
			credit: userInfo.credit
		}

		return this.success(param);
	}

	async getPayCount(){
		const {ctx, app} = this;
		const result = await ctx.service.purchase.getPayCount();
		return result;
	}
}

module.exports = PurchaseController;