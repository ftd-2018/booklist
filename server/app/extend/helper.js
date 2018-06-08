const jwt = require('jsonwebtoken');
const secret = 'FTD#@HBJRR@@gf';


exports.token = {
	create: function(userInfo){
		const token = jwt.sign(userInfo, secret);
		return token;
	},

	parse : function() {
	  if (this.app.token) {
	    try {
	      return jwt.verify(this.app.token, secret);
	    } catch (err) {
	      return null;
	    }
	  }
	  return null;
	}
}