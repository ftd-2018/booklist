const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    page: 1,
    size: 30,
    courseList:[],
    hasMore: false,
    loading: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../myblist/index'
    })
  },
  loadMore: function () {
    const that = this;
    if (!this.data.hasMore) return;
    util.request('course/listAllCourse', { page:this.data.page++, size: this.data.size}).then(res => {
      if (res.status === 0) {
        wx.stopPullDownRefresh();
        if (res.result.length) {
          that.setData({
            courseList: that.data.courseList.concat(res.result),
            loading: false
          });
        }else{
          that.setData({ hasMore: false }) 
        }
        
      }
    });
  },
  onLoad: function () {
      this.setData({ hasMore: true, loading:true})
      this.loadMore();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  onReachBottom() {
    this.setData({
      loading: true
    })
    this.loadMore()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.setData({
      courseList:[],
      page: 1
    });
    this.setData({
      hasMore:true,
      loading: true
    });
    this.loadMore();
  }
})
