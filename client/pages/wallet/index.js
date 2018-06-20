const util = require('../../utils/util.js');
// pages/wallet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listPurchase: [],
    credit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const that = this;
      util.request('purchase/listMyPurchaseAboutMe').then(res => {
          if (res.status === 0) {
              let result = res.result;
              that.setData({
                  listPurchase: result.list,
                  credit: result.credit
              });
          }
      });
  },
  
  showCue:function(){
      wx.showModal({
          content: "请加管理员「 微信号 fcsboy 」，再进行充值",
          confirmText: "确定",
          cancelText: "取消"
      });
  }
})