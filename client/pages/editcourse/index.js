const app=getApp()

Page({
    data:{
      titleInp:'',
      nameInp:'',
      authorInp:'',
      courseList:[],
      author:''
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
    addBtnClick(){
      var list=this.data.courseList;
      list.push({name:this.data.nameInp+' '+this.data.authorInp})
      this.setData({
        courseList:list
      })
    },
})