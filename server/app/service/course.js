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
		const collect = await this.app.mysql.query('select * from course left join collect on course.id=collect.course_id where collect.user_id='+this.app.userId+';');
		let allCourse = await this.app.mysql.select('course');
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