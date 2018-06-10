var api = require('../../service/api.js');
const util = require('../../utils/util.js');
//index.js
//获取应用实例
const app = getApp() 

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    booklist:[]
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function (options) {
    const that = this;
    wx.setNavigationBarTitle({
        title: options.title,
    })
    util.request(api.baseURL + 'course/listCourseDetail', {id: options.courseID}).then(res => {
      if (res.status === 0) {
        let arr = [];
        let result = res.result;
        result = util.splitStr(result.my_course);
        for (let index in result) {
          arr.push({
            text: result[index]
          })
        }
        that.setData({
          booklist: arr
        });
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
