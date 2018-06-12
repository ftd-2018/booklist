const Service = require('egg').Service;

class CourseService extends Service {
	async insert(data){
		const result = await this.app.mysql.insert('course', data);
    	return result;
	}

	async selectByUID(){
		const result = await this.app.mysql.select('course', {
			where:{user_id: this.app.userId},
			columns: ['id', 'title']
		});
		return result;
	}

	async getByID(id){
		const result = await this.app.mysql.get('course', {id: id});
		return {
			title: result.title,
			my_course: result.my_course
		};
	}

	async selectCourseWithCollect(){
		const {ctx, app} = this;
		const collect = await ctx.service.collect.listMyCollect();
		let allCourse = await app.mysql.select('course');
		for(let i = 0; i < allCourse.length; i++){
			allCourse[i].isCollect = 0;   // 未收藏
			for(let j = 0; j < collect.length; j++){
				if(collect[j].course_id == allCourse[i].id){
					allCourse[i].isCollect = 1;  // 已收藏
				}
			}
		}
		return allCourse;
	}

	async selectCourseWithTitle(title){
		const {ctx, app} = this;
		const collect = await ctx.service.collect.listMyCollect();
		let allCourse = await app.mysql.query('select * from course where title like "%'+title+'%"');
		for(let i = 0; i < allCourse.length; i++){
			allCourse[i].isCollect = 0;   // 未收藏
			for(let j = 0; j < collect.length; j++){
				if(collect[j].course_id == allCourse[i].id){
					allCourse[i].isCollect = 1;  // 已收藏
				}
			}
		}
		return allCourse;
	}
}

module.exports = CourseService;