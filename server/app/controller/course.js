const Base = require('./base');

class CourseController extends Base {
	async addCourse(){
		const ctx = this.ctx;
		const title = ctx.request.body.title;
		const myCourse = ctx.request.body.myCourse;
		let addResult = await ctx.service.course.insert({
			title: title,
			my_course: myCourse,
			user_id: ctx.app.userId
		});

		if(addResult.affectedRows === 1){
			return this.success("插入成功");
		}else{
			return this.fail("插入失败");
		}
	}

	async listMyCourse(){
		const ctx = this.ctx;
		let result = await ctx.service.course.selectByUID();
		return this.success(result);
	}

	async listCourseDetail(){
		const ctx = this.ctx;
		const id = ctx.request.body.id;
		let result = await ctx.service.course.getByID(id);
		return this.success(result);
	}

	async listAllCourse(){
		const {ctx} = this;
		const getCollectCourse = await ctx.service.course.selectCourseWithCollect();
		return this.success(getCollectCourse);
	}
}

module.exports = CourseController;