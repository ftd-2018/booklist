const util = require('../../utils/util.js');
// components/booklist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '',
    },
    isCollect: {
      type: String,
      value: '0'
    },
    courseID:{
      type: String,
      value: ''
    },
    payCount:{
      type: String,
      value: "0"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    noCollectImage: "/images/collect2.png",
    hasCollectImage: "/images/collect1.png",
    collectBackImage: "/images/collect2.png",
    userHasCollect: 1
  },
  ready(){
    if(this.properties.isCollect == 1){
      this.setData({
        "collectBackImage": this.data.hasCollectImage,
        "userHasCollect": 0
      });
    }else{
      this.setData({
        "collectBackImage": this.data.noCollectImage,
        "userHasCollect": 1
      });
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    collectBookList(){
        util.request('collect/addOrDeleteCollect', { courseID: this.properties.courseID }).then(res => {
            if (res.status === 0) {
               if(res.result == 0){
                    // 取消
                   this.setData({
                       'collectBackImage': this.data.noCollectImage
                   });
               }else{
                    // 收藏
                   this.setData({
                       'collectBackImage': this.data.hasCollectImage
                   });
               }
            }
        });  
    }
  }
})
