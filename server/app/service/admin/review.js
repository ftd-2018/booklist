const Service = require('egg').Service;

class ReviewService extends Service{
	async search(param){
		const {app} = this;
		const wechat_id = param.wechat_id || '';
		const tel_id = param.tel_id || '';
		const title = param.title || '';
		const publish = param.publish || 0;
		let str = `select u.username,u.wechat_id,u.tel_id,u.credit,c.title,c.my_course,c.publish,c.id from user as u left join course as c on u.id=c.user_id where u.wechat_id LIKE '%${wechat_id}%' AND u.tel_id LIKE '%${tel_id}%' AND c.title LIKE '%${title}%' AND c.publish LIKE '%${publish}%'`;
		const result = await app.mysql.query(str);
		return result;
	}

	async isPublish(courseID, type){
		const {app} = this;
		console.log(courseID, type);
		const  result = await app.mysql.update('course', {
			id: courseID,
			publish: type
		});
		return result;
	}
}

module.exports = ReviewService;