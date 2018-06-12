const Base = require('./base');

class CollectController extends Base {
	async listMyCollect(){
		const {ctx, app} = this;
		const result = await ctx.service.collect.listMyCollect();
		return this.success(result);
	}

	async addOrDeleteCollect(){
		const {ctx, app} = this;
		const courseID = ctx.request.body.courseID;
		const collect = await ctx.service.collect.getByUID(courseID);
		let collectRes = null;
		let handleType = 1;
		if(ctx.helper.isEmpty(collect)){
			// add 
			collectRes = await ctx.service.collect.insert({
				user_id: app.userId,
				course_id: courseID
			}); 
		}else{
			// delete
			collectRes = await ctx.service.collect.delete(collect.id);
			handleType = 0;
		}
		
		if(collectRes){
			return this.success(handleType);
		}

		return this.fail("操作失败");
	}
}

module.exports = CollectController;