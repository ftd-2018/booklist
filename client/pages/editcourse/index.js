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
      courseID: '',
      type: false
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

      this.goSetting();
    },
    goSetting: function () {
      if (!app.globalData.userInfo.undergraduate || !app.globalData.userInfo.username || !app.globalData.userInfo.wechat_id || !app.globalData.userInfo.tel_id) {
        wx.showToast({
          title: '先完善个人信息',
          icon: 'none',
          duration: 2000,
          complete:function(){
            setTimeout(function(){
              wx.redirectTo({
                url: '/pages/setting/index',
              });
            },2000);
          }
        })
        
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
    },
    submitHandle(){
      const that = this;
      if (this.data.courseList.length <= 0)
        return;
      if (this.data.titleInp == "") {
        wx.showToast({
          title: '专业名不能为空',
          icon: 'none'
        })
        return;
      }
      if (this.data.allCourse == "") {
        wx.showToast({
          title: '书单信息不能为空',
          icon: 'none'
        })
        return;
      }

      if (this.data.isAdd) {
        // 添加  
        util.request("course/addCourse",
          {
            title: this.data.titleInp,
            myCourse: this.data.allCourse
          }, 'POST').then(function (res) {
            if (res.status === 0) {
              wx.showToast({
                title: '添加成功',
                icon: 'none',
                duration: 2000,
                complete: function () {
                  setTimeout(function(){
                    wx.redirectTo({
                      url: '../../pages/myblist/index',
                    });
                  },2000);
                }
              })
            }
          });
      } else {
        // 更新
        util.request("course/update", {
          courseID: this.data.courseID,
          title: this.data.titleInp,
          myCourse: this.data.allCourse
        }).then(res => {
          wx.showToast({
            title: res.result,
            icon: 'none',
            duration: 2000,
            complete: function () {
              setTimeout(function () {
                wx.redirectTo({
                  url: '../../pages/details/index?courseID=' + that.data.courseID + '&title=' + that.data.titleInp,
                });
              }, 2000);
              
            }
          });
        });
      }
    }
})