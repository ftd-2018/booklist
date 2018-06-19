const Base = require('./base');

class PurchaseController extends Base {
	async addPurchase(){
		const {ctx, app} = this;
		const courseID = ctx.request.body.courseID;
		const status = await ctx.service.purchase.addPurchase(courseID);
		if(status == 1){
			this.success("订阅成功");
		}else{
			this.fail("订阅失败");
		}

	}
}

module.exports = PurchaseController;