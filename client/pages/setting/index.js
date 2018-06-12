const util = require('../../utils/util.js');
const app=getApp()

Page({
    data:{
      userInp:'',
      collegesInp:'',
      graduateInp:'',
      weiChatInp:'',
      mobileInp:''
    },
    onLoad:function(){
        console.log(111, app.globalData.userInfo);
      this.setData({
          userInp: app.globalData.userInfo.username,
          collegesInp: app.globalData.userInfo.undergraduate,
          graduateInp: app.globalData.userInfo.master_school,
          weiChatInp: app.globalData.userInfo.wechat_id,
          mobileInp: app.globalData.userInfo.tel_id
      });    
    },
    userInp(e){
      this.setData({
        userInp:e.detail.value
      })
    },
    myAvatar(e){
      this.setData({
        myAvatar:e.detail.value
      })
    },
    collegesInp(e){
      this.setData({
        collegesInp:e.detail.value
      })
    },
    graduateInp(e){
      this.setData({
        graduateInp:e.detail.value
      })
    },
    weiChatInp(e){
      this.setData({
        weiChatInp:e.detail.value
      })
    },
    mobileInp(e){
      this.setData({
        mobileInp:e.detail.value
      })
    },
    loginBtnClick(){
        let param = {};
        if (this.data.userInp){
            param.username = this.data.userInp;
        }
        if (this.data.collegesInp) {
            param.undergraduate = this.data.collegesInp;
        }
        if (this.data.graduateInp) {
            param.master_school = this.data.graduateInp;
        }
        if (this.data.weiChatInp) {
            param.wechat_id = this.data.weiChatInp;
        }
        if (this.data.mobileInp) {
            param.tel_id = this.data.mobileInp;
        }
        util.request('user/setInfo', param).then(res => {
            if (res.status === 0) {
                wx.showToast({
                    title: res.result,
                    icon: 'success',
                    duration: 2000
                });
                Object.assign(app.globalData.userInfo, param);
                wx.setStorageSync("userInfo", app.globalData.userInfo);
            }
        });
    },
})