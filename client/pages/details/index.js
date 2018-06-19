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
    booklist:[],
    isPay: 1,
    price: '',
    courseID: ''
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function (options) {
    this.setData({
        courseID: options.courseID
    });
    wx.setNavigationBarTitle({
        title: options.title,
    });
    this.getMode();
  },
  getMode:function(){
    const that = this;
    util.request('course/listCourseDetail', { id: this.data.courseID }).then(res => {
      if (res.status === 0) {
        let arr = [];
        let result = res.result;
        let resultList = util.splitStr(result.my_course);
        for (let index in resultList) {
          arr.push({
            text: resultList[index]
          })
        }
        that.setData({
          booklist: arr,
          userInfo: {
            username: result.username,
            undergraduate: result.undergraduate,
            avatar: result.avatar
          },
          isPay: result.isPay,
          price: result.price
        });
      }
    });
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  hasPay:function(){
    this.getMode();
  }
})
