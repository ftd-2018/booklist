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
			console.log("插入成功");
		}
	}
}

module.exports = CourseController;