const app=getApp()

Page({
  data:{
    booklist:[{
      text: "计算机专业",
      bookid: "123"
    },{
      text: "计算机专业",
      bookid: "123"
    }]
  },
  goToWrite: function(){
    wx.navigateTo({
      url: '../setting/index',
      url: '../editcourse/index'
    });
  }
})