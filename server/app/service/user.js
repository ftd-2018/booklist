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
        tel_id: result.tel_id,
        credit: result.credit
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

  async searchByTelWX(param){
    const {app} = this;
    const wechat_id = param.wechat_id || '';
    const tel_id = param.tel_id || '';
    const username = param.username || '';
    let str = `select id,wechat_id,username,tel_id,credit from user where wechat_id LIKE '%${wechat_id}%' AND tel_id LIKE '%${tel_id}%' AND username LIKE '%${username}%'`;
    const result = await app.mysql.query(str);
    return result;
  }

  async updateCredit(id, credit){
    const {app} = this;
    const result = await app.mysql.update('user',{
      id: id,
      credit : credit
    });
    return result;
  }

}
module.exports = UserService;

















