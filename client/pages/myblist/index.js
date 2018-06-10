const app=getApp()
const util = require('../../utils/util.js');
const api = require('../../service/api.js');

Page({
  data:{
    booklist:[]
  },
  onLoad: function(){
    const that = this;
    util.request(api.baseURL + 'course/listMyCourse').then(res => {
      if (res.status === 0){
        let result = res.result;
        that.setData({
          booklist: result
        });
      }
    });
  },
  goToWrite: function(){
    wx.navigateTo({
      url: '../setting/index',
      url: '../editcourse/index'
    });
  }
})