const app=getApp()

Page({
    data:{
      titleInp:'',
      nameInp:'',
      authorInp:''
    },
    titleInp(e){
      this.setData({
        titleInp:e.detail.value
      })
    },
    nameInp(e){
      this.setData({
        nameInp:e.detail.value
      })
    },
    authorInp(e){
      this.setData({
        authorInp:e.detail.value
      })
    },
    loginBtnClick(){

    },
})