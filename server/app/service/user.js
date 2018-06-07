const Service = require('egg').Service;
class UserService extends Service {
  async find(data){
	const result = await this.app.mysql.get('users', data);
	return result ;
  }

  async insert(data) {
    const result = await this.app.mysql.insert('users', data);
    return result;
  }

  async update(data){
  	const result = await this.app.mysql.update('users', data);
  	return result;
  }
}
module.exports = UserService;