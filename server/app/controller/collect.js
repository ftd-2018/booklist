const Base = require('./base');

class CollectController extends Base {
	
	async addOrDeleteCollect(){
		const {ctx, app} = this;
		const courseID = ctx.request.body.courseID;
		const collect = await ctx.servive.getByUID(courseID);
		let collectRes = null;
		let handleType = "已收藏";

		if(ctx.helper.isEmpty(collect)){
			// add 
			collectRes = await ctx.servive.insert({
				user_id: app.userId,
				course_id: courseID
			}); 

		}else{
			// delete
			collectRes = await ctx.servive.delete(collect.id);
			handleType = "已取消";
		}

		console.log('collectRes', collect);
		
		if(collectRes){
			return this.success(handleType);
		}

		return this.fail("操作失败");
	}
}

module.exports = CollectController;