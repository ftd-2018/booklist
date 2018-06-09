const Service = require('egg').Service;
class UserService extends Service {
  async find(data){
	const result = await this.app.mysql.get('user', data);
	return result ;
  }

  async insert(data) {
    const result = await this.app.mysql.insert('user', data);
    return result;
  }

  async update(data){
  	const result = await this.app.mysql.update('user', data);
  	return result;
  }

  async select(data){
    const result = await this.app.mysql.select('user', data);
    return result;
  }
}
module.exports = UserService;