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
      type:String,
      value: "1"
    },
    title:{
      type:String,
      value: ""
    },
    myCourse:{
      type: String,
      value: ""
    },
    isAdd:{
        type: Boolean,
        value: true
    },
    courseID:{
        type: String,
        value: ''
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
      text: "我的收藏"
    },{
      url: "/pages/myblist/index",
      text: "我的书单"
    },{
      url: "/pages/purchase/index",
      text: "我的订阅"
    }, {
        url: "/pages/wallet/index",
        text: "我的钱包"
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
    },
    submit:function(){
      const that = this;
      if (this.properties.title == ""){
        wx.showToast({
            title: '专业名不能为空',
            icon: 'none'
        })
        return;
      }
      if (this.properties.myCourse == ""){
          wx.showToast({
              title: '书单信息不能为空',
              icon: 'none'
          })
          return;
      }

      if(this.data.isAdd){
          // 添加  
          util.request("course/addCourse",
              {
                  title: this.properties.title,
                  myCourse: this.properties.myCourse
              }, 'POST').then(function (res) {
                  if (res.status === 0) {
                      wx.showToast({
                          title: '添加成功',
                          icon: 'success',
                          duration: 2000,
                          complete: function () {
                              wx.redirectTo({
                                  url: '../../pages/myblist/index',
                              })
                          }
                      })
                  }
              });
      }else{
        // 更新
        util.request("course/update",{
            courseID: this.properties.courseID,
            title: this.properties.title,
            myCourse: this.properties.myCourse 
        }).then(res=>{
            wx.showToast({
                title: res.result,
                icon: 'none',
                duration: 2000,
                complete: function(){
                    wx.redirectTo({
                        url: '../../pages/details/index?courseID=' + that.properties.courseID + '&title=' + that.properties.title,
                    })
                }
            });
        });
      }
    }
  }
})
