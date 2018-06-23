const app = getApp()
const util = require('../../utils/util.js');

Page({
  data: {
    myPurchase: []
  },
  onLoad: function () {
    const that = this;
    util.request('purchase/listMyPurchase').then(res => {
      if (res.status === 0) {
        let result = res.result;
        that.setData({
          myPurchase: result
        });
      }
    });
  },
  goToWrite: function () {
    wx.reLaunch({
      url: '../index/index'
    });
  }
})