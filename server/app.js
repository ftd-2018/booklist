const Util = require('./utils/util');
const Token = require('./utils/token');
// app.js
module.exports = app => {
  // 使用 app 对象‘
  app.util = new Util();
  app.tokenService = new Token();
  app.token = '';
};
