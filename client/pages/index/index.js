//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    booklist:[{
      text: "计算机1",
      imgUrl: ""
    },{
      text: "计算机",
      imgUrl: ""
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
