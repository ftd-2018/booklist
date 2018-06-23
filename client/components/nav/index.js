var appInstance = getApp();
var util = require("../../utils/util.js");
var api = require("../../service/api.js");
// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "写书单",
    src : "/images/head.png",
    penimg: "/images/pen.png",
    logo: "/images/logo.png",
    navItems:[{
      url: "/pages/collection/index",
      text: "我的收藏",
      imgUrl: "/images/1.png"
    },{
      url: "/pages/myblist/index",
      text: "我的书单",
      imgUrl: "/images/2.png"
    },{
      url: "/pages/purchase/index",
      text: "我的订阅",
      imgUrl: "/images/3.png"
    }, {
        url: "/pages/wallet/index",
        text: "我的钱包",
        imgUrl: "/images/4.png"
    },{
      url: "/pages/setting/index",
      text: "我的设置",
      imgUrl: "/images/5.png"
    }],
    isShowNav: false
  },
  ready:function(){
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
    if (userInfo && token) {
      appInstance.globalData.userInfo = userInfo;
      appInstance.globalData.token = token;
    }

    if (appInstance.globalData.userInfo.avatar){
        this.setData({
            src: appInstance.globalData.userInfo.avatar,
        });
    }
  },
  moved:function(){
    console.log(123123);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showNav:function(){
      if(this.data.isShowNav){
        this.setData({
          isShowNav: false
        })
      }else{
        this.setData({
          isShowNav: true
        })
      }
    }
  }
})
