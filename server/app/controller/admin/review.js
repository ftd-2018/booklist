const Base = require('./base');

class ReviewController extends Base {
	async getList(){
		const {ctx} = this;
		const result = await ctx.service.admin.review.search(ctx.request.body);
		return this.success(result);
	}

	async publish(){ 
		const {ctx} = this;
		const courseID = ctx.request.body.courseID;
		const result = await ctx.service.admin.review.isPublish(courseID, 1);
		if(result.affectedRows === 1){
			return this.success("发布成功");
		}else{
			return this.fail("发布失败");
		}
	}

	async revoke(){
		const {ctx} = this;
		const courseID = ctx.request.body.courseID;
		const result = await ctx.service.admin.review.isPublish(courseID, 0);
		if(result.affectedRows === 1){
			return this.success("撤销成功");
		}else{
			return this.fail("撤销失败");
		}
	}
}

module.exports = ReviewController;