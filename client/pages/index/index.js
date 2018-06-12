const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    courseList:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../myblist/index'
    })
  },
  onLoad: function () {
      const that = this;
      util.request( 'course/listAllCourse').then(res => {
            if (res.status === 0) {
                that.setData({
                   courseList: res.result
                });
                console.log(123, that.data.courseList);
            }
      });
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
