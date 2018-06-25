const util = require('../../utils/util.js');
// pages/wallet/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listPurchase: [],
    credit: '',
    page: 1,
    size: 30,
    hasMore: false,
    loading: false
  },
  loadMore:function(){
      const that = this;
      if (!this.data.hasMore) return;
      util.request('purchase/listMyPurchaseAboutMe', { page: this.data.page++, size: this.data.size }).then(res => {
          if (res.status === 0) {
              let result = res.result;
              if (result.list.length) {
                  that.setData({
                      listPurchase: that.data.listPurchase.concat(result.list),
                      loading: false
                  });
              } else {
                  that.setData({ hasMore: false })
              }
              that.setData({
                  credit: result.credit
              });
          }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({ hasMore: true, loading: true })
      this.loadMore();
  },
  onReachBottom: function () {
      this.setData({
          loading: true
      })
      this.loadMore();
  },
  showCue:function(){
      wx.showModal({
        content: "加客服微信「 fcsboy 」，再进行充值",
        confirmText: "确定",
        showCancel: false
      });
  }
})