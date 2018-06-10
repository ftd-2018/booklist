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
}

module.exports = CourseService;