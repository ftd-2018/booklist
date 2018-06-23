var user = require('./service/user.js');
//app.js
App({
  onLaunch: function () {
   const that = this;   
      // 查看是否授权
    user.checkLogin().then(res => {
        that.globalData.userInfo = wx.getStorageSync('userInfo');
        that.globalData.token = wx.getStorageSync('token');
        // if (that.employIdCallback) {
        //     that.employIdCallback(wx.getStorageSync('userInfo'));
        // }
    }).catch(() => {
      user.loginByWeixin().then(res => {
          that.globalData.userInfo = res.result.userInfo;
          that.globalData.token = res.result.token;
      }).catch((err) => {
        console.log(err);
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