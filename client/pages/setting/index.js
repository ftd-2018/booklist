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
        const that = this;
        let param = {};
        if (this.data.userInp == ''){
            wx.showToast({
                title: '用户名不能为空',
                icon: 'none'
            });
            return; 
        }
        console.log(123,this.data.collegesInp)
        if (this.data.collegesInp == ''){
            wx.showToast({
                title: '本科院校不能为空',
                icon: 'none'
            });
            return;
        }

        if (this.data.weiChatInp == ''){
            wx.showToast({
                title: '微信号不能为空',
                icon: 'none'
            });
            return;
        }

        if (this.data.mobileInp == ''){
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none'
            });
            return;
        }
        param.username = this.data.userInp;
        param.undergraduate = this.data.collegesInp;
        param.master_school = this.data.graduateInp;
        param.wechat_id = this.data.weiChatInp;
        param.tel_id = this.data.mobileInp;
        util.request('user/setInfo', param).then(res => {
            if (res.status === 0) {
                wx.showToast({
                    title: res.result,
                    icon: 'success',
                    duration: 2000,
                    complete: function(){
                        if(!that.data.isStyle){
                            wx.redirectTo({
                                url: '/pages/index/index',
                            });
                        }
                    }
                });
                Object.assign(app.globalData.userInfo, param);
                wx.setStorageSync("userInfo", app.globalData.userInfo);
            }
        });
    },
})