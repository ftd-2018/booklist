const user = require('../../service/user.js');
const app = getApp();
// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
      user.loginByWeixin().then(res => {
          app.globalData.userInfo = res.result.userInfo;
          app.globalData.token = res.result.token;
          if (!app.globalData.userInfo.undergraduate || !app.globalData.userInfo.username || !app.globalData.userInfo.wechat_id || !app.globalData.userInfo.tel_id){
              wx.redirectTo({
                  url: '/pages/setting/index'
              })
          }else{
              wx.redirectTo({
                  url: '/pages/index/index'
              })
          }
      }).catch((err) => {
          console.log(err)
      });
  },

})