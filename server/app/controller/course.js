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

	async update(){
		const {ctx} = this;
		const title = ctx.request.body.title;
		const myCourse = ctx.request.body.myCourse;
		const courseID = ctx.request.body.courseID;
		const result = await ctx.service.course.update(courseID, myCourse, title);
		if(result.affectedRows === 1){	
			return this.success("更新成功");
		}else{
			return this.fail("更新失败");
		}
	}

	async listMyCourse(){
		const {ctx} = this;
		const page = ctx.request.body.page;
		const size = ctx.request.body.size;
		let result = await ctx.service.course.selectByUID(page, size);
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
		const page = ctx.request.body.page;
		const size = ctx.request.body.size;
		console.log(123123);
		const getCollectCourse = await ctx.service.course.selectCourseWithCollect(page, size);
		return this.success(getCollectCourse);
	}

	async listSearchCourse(){
		const {ctx} = this;
		const title = ctx.request.body.title;
		const page = ctx.request.body.page;
		const size = ctx.request.body.size; 
		const getSearchCourse = await ctx.service.course.selectCourseWithTitle(title, page, size);
		return this.success(getSearchCourse);
	}
}

module.exports = CourseController;