const Service = require('egg').Service;

class CollectService extends Service{
	async getByUID(courseID){
		const {app} = this;
		const result = await app.mysql.get('collect', {user_id: app.userId, course_id: courseID})
		result result;
	}

	async selectByUID(){
		const result = await this.app.mysql.select('collect', {
			where: {user_id: this.app.userId}
		});
		return result;
	}

	async insert(data){
		const result = await this.app.mysql.insert('collect', data);
		return result;
	}

	async delete(id){
		const result = await this.app.mysql.delete('posts', {
		  	id: id,
		}); 
		return result;
	}
}

module.exports = CollectService;