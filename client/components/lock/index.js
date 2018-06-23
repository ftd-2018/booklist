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
          const that = this;
          util.request('purchase/addPurchase', { courseID: this.properties.courseID }).then(res => {
            if(res.status == 0){
              wx.showToast({
                  title: res.result,
                  icon: 'success',
                  duration: 2000,
                  complete: function () {
                    that.triggerEvent("evenPay");
                  }
              })
            }else{
              wx.showModal({
                title: "订阅失败",
                content: res.result,
                showCancel: false
              })
            }
          });
      }
  }
})
