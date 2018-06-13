var user = require('./service/user.js');
//app.js
App({
  onLaunch: function () {
      // 查看是否授权
    user.checkLogin().then(res => {
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {
      user.loginByWeixin().then(res => {
        this.globalData.userInfo = res.result.userInfo;
        this.globalData.token = res.result.token;
        wx.redirectTo({
            url: '/pages/index/index'
        })
      }).catch((err) => {
        console.log(err)
      });
    });
  },
  globalData: {
    userInfo: {
      username: '',
      avatar: '',
      undergraduate: '',
      master_school: '',
      wechat_id: '',
      tel_id:''
    },
    token: '',
  }
})