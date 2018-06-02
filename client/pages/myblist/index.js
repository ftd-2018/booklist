const app=getApp()

Page({
    data:{
        courseFlag:false,
        courseData:[{name:'设计学'},{name:'Java'},{name:'JavaScript'}]
    },
    goToWrite:function(){
        // wx.navigateTo({
        //  url: '../editcourse/index'
        // })
        wx.navigateTo({
            url: '../setting/index'
        })
    }
})