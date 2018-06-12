const util = require('../../utils/util.js');
const app=getApp()
Page({
  data: {
    myCollection: []
  },
  onLoad: function(){
    const that = this;
    util.request('collect/listMyCollect').then(res => {
        if (res.status === 0) {
            let result = res.result;
            that.setData({
              myCollection: result
            });
        }
    });
  },
  goToWrite: function () {
    wx.navigateTo({
      url: '../editcourse/index'
    });
  }
})