const Service = require('egg').Service;

class CourseService extends Service {
	async insert(data){
		const result = await this.app.mysql.insert('course', data);
    	return result;
	}
}