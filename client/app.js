var user = require('./service/user.js');
//app.js
App({
  onLaunch: function () {
    user.checkLogin().then(res => {
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
    user.loginByWeixin().then(res => {
      this.globalData.userInfo = res.result.userInfo;
      this.globalData.token = res.result.token;
    }).catch((err) => {
      console.log(err)
    });
    });
  },
  globalData: {
    userInfo: {
      username: '',
      avatar: ''
    },
    token: '',
  }
})