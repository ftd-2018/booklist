const Service = require('egg').Service;
class UserService extends Service {
  async find(data){
  	const result = await this.app.mysql.get('user', data);
    let obj;
    if(result){
      obj = {
        id: result.id,
        username: result.username,
        avatar: result.avatar,
        undergraduate: result.undergraduate,
        master_school: result.master_school,
        wechat_id: result.wechat_id,
        tel_id: result.tel_id
      };
    }else{
      obj = null;
    }
  	return obj ;
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