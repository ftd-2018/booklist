const { Controller } = require('egg');

class BaseController extends Controller{
	constructor(props) {
		super(props);
	}
	success(data, status) {
		let result = {
			error: "操作失败",
			msg: "操作失败",
			status: status || 0,
			result: data
		};
		this.ctx.body = result;
	}
	fail(data, status) {
		let result = {
			error: "操作成功",
			msg: "操作成功",
			status: status || -1,
			result: data
		};
		this.ctx.body = result;
	}
}


module.exports = BaseController;