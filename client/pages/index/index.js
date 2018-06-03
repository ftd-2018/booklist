//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    booklist:[{
      text: "计算机1",
      isCollect: "1",
      bookid: '123'
    },{
      text: "计算机",
      isCollect: "0",
      bookid: '456'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../myblist/index'
    })
  },
  onLoad: function () {
    wx.request({
      url: 'http://localhost:7001/', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
      }
    })
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
