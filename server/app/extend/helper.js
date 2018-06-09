const jwt = require('jsonwebtoken');
const secret = 'FTD#@HBJRR@@gf';


exports.token = {
	async create(userInfo){
		const token = jwt.sign(userInfo, secret);
		return token;
	},

	async parse() {
	  if (this.app.token) {
	    try {
	      return jwt.verify(this.app.token, secret);
	    } catch (err) {
	      return null;
	    }
	  }
	  return null;
	},

	async getUserId(){
	  const token = this.app.token;
	  if (!token) {
	    return 0;
	  }

	  const result = await this.parse();
	  if (think.isEmpty(result) || result.user_id <= 0) {
	    return 0;
	  }

	  return result.user_id;
	}
}