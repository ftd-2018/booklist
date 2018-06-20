const Service = require('egg').Service;

class EnchashmentService extends Service {
	 async newAndSave(credit, wechat){
	 	const {app, ctx} = this;
	 	const result = await app.mysql.insert("enchashment", {
	 		user_id: app.userId,
	 		enchashment_credit: credit,
	 		verify: 0,
	 		wechat: wechat,
	 		verify_time: ctx.helper.timest()
	 	});	
	 	return result;
	 }
}

module.exports = EnchashmentService;