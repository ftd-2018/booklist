const Base = require('./base');
const bcrypt = require('bcrypt');

class AdminController extends Base {
	async add(){
		const {ctx} = this;
		const username = "admin";
    	const password = "888888";
    	const addTime = ctx.helper.timest();

    	// 密码加盐操作
    	const saltRounds = 10;
    	const salt = bcrypt.genSaltSync(saltRounds);
		const hash = bcrypt.hashSync(password, salt);

		if(!username || !password || !salt || !hash){
			return this.fail("参数无效");
		}

		// 把 salt 和 hash 存入数据库
		const result = await ctx.service.admin.admin.insert({
			username: username,
			password_hash: hash,
			password_salt: salt,
			add_time: addTime
		});

		if(result.affectedRows === 1){
			return this.success("插入成功");
		}else{
			return this.fail("插入失败");
		}
	}
}

module.exports = AdminController;