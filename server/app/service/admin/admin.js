const Service = require('egg').Service;

class AdminService extends Service{
	async insert(data){
		const result = await this.app.mysql.insert("admin", data);
		return result;
	}

	async getByUName(username){
		const result = await this.app.mysql.get("admin", {
			username: username
		});

		return result;
	}

	async update(data){
		await this.app.mysql.update("admin", data);
	}
}

module.exports = AdminService;

