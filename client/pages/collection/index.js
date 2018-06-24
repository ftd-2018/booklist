const util = require('../../utils/util.js');
const app=getApp()
Page({
  data: {
    myCollection: [],
    page: 1,
    size: 14,
    hasMore: false,
    loading: false
  },
  loadMore:function(){
    const that = this;
    if (!this.data.hasMore) return;
    util.request('collect/listMyCollectRange', { page: this.data.page++, size: this.data.size}).then(res => {
      if (res.status === 0) {
        if (res.result.length) {
          that.setData({
            myCollection: that.data.myCollection.concat(res.result),
            loading: false
          });
        }else{
          that.setData({ hasMore: false })
        }
      }
    });
  },
  onLoad: function(){
    this.setData({ hasMore: true, loading: true })
    this.loadMore();
  },
  onReachBottom: function () {
    this.setData({
      loading: true
    })
    this.loadMore();
  },
  goToWrite: function () {
    wx.navigateTo({
      url: '../editcourse/index'
    });
  }
})