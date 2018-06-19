const Service = require('egg').Service;

class PurchaseService extends Service {
	async addPurchase(courseID){
		const {app,ctx} = this;
		const uInfo = await ctx.service.user.find({
			id: app.userId
		});
		const courseInfo = await ctx.service.course.selectByID(courseID);
		let status = 0;
		if(uInfo.credit >= courseInfo.price){
			
			const result = await app.mysql.update("user", {
				id: app.userId,
				credit: uInfo.credit - courseInfo.price
			});
			if(result.affectedRows === 1){
				const result = await app.mysql.insert("purchase",{
					course_id: courseID,
					user_id: app.userId
				});
				if(result.affectedRows === 1){
					status = 1;
				}
			}	
		}
		return status;
	}
}

module.exports = PurchaseService;