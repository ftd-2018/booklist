const util = require('../../utils/util.js');
// components/purchase/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
        type: Number,
        value: 1
    },
    price:{
        type: Number,
        value: 0
    },
    addTime:{
        type:Number,
        value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    time: ''
  },
  ready:function(){
    console.log(123,this.properties.addTime);
    this.setData({
      time: util.formatTime(new Date(this.properties.addTime*1000))
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
