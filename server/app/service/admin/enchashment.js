const Service = require('egg').Service;

class EnchashmentService extends Service{
	async search(param){
		const {app} = this;
		const wechat_id = param.wechat_id || '';
		const tel_id = param.tel_id || '';
		const username = param.username || '';
		const verify = param.verify || 0;
		let str = `select u.username,u.wechat_id,u.tel_id,u.credit,e.points,e.verify,e.id from user as u left join enchashment as e on u.id=e.user_id where u.wechat_id LIKE '%${wechat_id}%' AND u.tel_id LIKE '%${tel_id}%' AND u.username LIKE '%${username}%' AND e.verify LIKE '%${verify}%'`;
		const result = await app.mysql.query(str);
		return result;
	}

	async isEnchashment(enchasmentID, type){
		const {app} = this;
		const  result = await app.mysql.update('enchashment', {
			id: enchasmentID,
			verify: type
		});
		return result;
	}
}

module.exports = EnchashmentService;