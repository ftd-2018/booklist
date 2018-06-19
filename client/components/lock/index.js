const util = require('../../utils/util.js');
// components/lock/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      price: {
          type: String,
          value:  ""
      },
      courseID:{
          type: String,
          value: ""
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      pay:function(){
          util.request('purchase/addPurchase', { courseID: this.properties.courseID }).then(res => {
            if(res.status == 0){
                wx.showToast({
                    title: res.result,
                    icon: 'success',
                    duration: 2000,
                    complete: function () {
                        
                    }
                })
            }else{
                wx.showToast({
                    title: res.result,
                    icon: 'fail',
                    duration: 2000,
                    complete: function () {
                       
                    }
                })
            }
          });
      }
  }
})
