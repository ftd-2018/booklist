const app=getApp()

Page({
  data: {
    myCollection: []
  },
  goToWrite: function () {
    wx.navigateTo({
      url: '../editcourse/index'
    });
  }
})