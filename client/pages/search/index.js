const util = require('../../utils/util.js');
// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    courseList: [],
    showTip: false,
    page: 1,
    size: 30,
    hasMore: false,
    loading:false
  },

  loadMore:function(){
    const that = this;
    if (!this.data.hasMore) return;
    util.request("course/listSearchCourse", { title: that.data.inputValue, page: this.data.page++, size: this.data.size}).then(res => {
      if (res.status === 0) {
        if (res.result.length){
          that.setData({
            courseList: that.data.courseList.concat(res.result),
            loading:false
          });
        }else{
          that.setData({ hasMore: false })
        }  
        if (that.data.courseList.length == 0){
          that.setData({
            showTip: true
          });
        }
      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loading: true
    })
    this.loadMore();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput: function(e){
    this.setData({
      inputValue: e.detail.value
    });
  },
  search: function(){
    this.setData({
      courseList: [],
      page: 1
    });
    this.setData({
      hasMore: true,
      loading:true,
      showTip: false
    });
    this.loadMore();
  }
})