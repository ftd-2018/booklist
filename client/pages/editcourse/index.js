const util = require("../../utils/util.js");
const app=getApp()

Page({
    data:{
      titleInp:'',
      nameInp:'',
      authorInp:'',
      courseList:[],
      author:'',
      allCourse: '',
      isAdd: true,
      courseID: ''
    },
    onLoad(options){
      if(options.myCourse && options.title){
          let resultList = util.splitStr(options.myCourse);
          let arr = [];
          for (let index in resultList) {
              arr.push({
                  name: resultList[index]
              })
          }
          this.setData({
              courseList: arr,
              titleInp: options.title,
              isAdd: false,
              courseID: options.courseID
          });

          this.setData({
              allCourse: this.regroup()
          });
      }
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
      if (this.data.nameInp == '' || this.data.authorInp == ''){
        wx.showToast({
            title: '书单信息不能为空',
            icon: 'none'
        });
        return;
      }
      list.push({name: "《"+this.data.nameInp+"》"+' '+this.data.authorInp+"著"});
      this.setData({
        courseList:list
      });
      this.setData({
        allCourse: this.regroup(),
        nameInp: '',
        authorInp:''
      })
    },
    regroup(){
        var list = this.data.courseList;
        var concatStr = '';
        for (var i = 0; i < list.length; i++) {
            concatStr += list[i].name + ',';
        }
        return util.leaveLastStr(concatStr);
    },
    deleteCourse(e){
        this.data.courseList.splice(e.target.dataset.itemIndex, 1);
        this.setData({
            courseList: this.data.courseList,
            allCourse: this.regroup() 
        }); 
    }
})