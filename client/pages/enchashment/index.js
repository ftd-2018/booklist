const util = require('../../utils/util.js');
// pages/enchashment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      credit: options.credit
    });
  },
  bindSave:function(e){
    const wechat = e.detail.value.wechat || "";
    const credit = e.detail.value.credit || "";
    if(wechat == ""){
      wx.showToast({
        title: '微信号不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if(credit == ""){
      wx.showToast({
        title: '积分不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (!/^[0-9]*$/.test(credit)) {
      wx.showToast({
        title: '积分为数字类型',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if(credit < 100){
      wx.showToast({
        title: '积分不能少于100',
        icon: 'none',
        duration: 2000
      });
      return;
    } 

    if (credit > parseInt(this.data.credit)){
      wx.showToast({
        title: '超过了可提现积分',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    const that = this;
    const param = {
      credit: credit,
      wechat: wechat
    }
    util.request('enchashment/add', param).then(res => {
      if (res.status === 0) {
        wx.showToast({
          title: res.result,
          icon: 'success',
          duration: 5000,
          complete:function(){
            wx.navigateTo({
              url: '../wallet/index',
            })
          }
        });
      }
    });
  }  
})