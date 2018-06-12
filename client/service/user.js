const api = require('./api.js');
const util = require('../utils/util.js');

/**
 * 调用微信登录
 */
const loginByWeixin = ()=> {
	let code = null;
	return new Promise(function (resolve, reject) {
	  return util.login().then((res) => {
	    code = res.code;
	    return util.getUserInfo();
	  }).then((userInfo) => {
	    //登录远程服务器
      util.request("auth/loginByWeixinAction", { code: code, userInfo: userInfo }, 'POST').then(res => {
        if (res.status === 0) {
	        //存储用户信息
	        wx.setStorageSync('userInfo', res.result.userInfo);
          wx.setStorageSync('token', res.result.token);
	        resolve(res);
	      } else {
	        reject(res);
	      }
	    }).catch((err) => {
	      reject(err);
	    });
	  }).catch((err) => {
	    reject(err);
	  })
	});
}


/**
 * 判断用户是否登录
 */
const checkLogin = ()=> {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}

module.exports = {
  loginByWeixin,
  checkLogin,
};