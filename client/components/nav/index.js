var appInstance = getApp();
// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type:String,
      value: "1"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "写书单",
    src : "/images/head.png",
    penimg: "/images/pen.png",
    navItems:[{
      url: "/pages/collection/index",
      text: "我的收藏"
    },{
      url: "/pages/myblist/index",
      text: "我的书单"
    },{
      url: "/pages/setting/index",
      text: "我的设置"
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

    this.setData({
      src: appInstance.globalData.userInfo.avatar,
    });
    // this.setData({
    //   src: appInstance.globalData.userInfo.avatar
    // })
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
    },
    submit:function(){
      console.log(111111)
    }
  }
})
