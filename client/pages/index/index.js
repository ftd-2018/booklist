//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    majorList:[{
      name: "计算机1",
      isCollect: "1",
      majorID: '123'
    },{
      name: "计算机",
      isCollect: "0",
      majorID: '456'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../myblist/index'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
