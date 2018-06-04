// components/booklist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '计算机',
    },
    isCollect: {
      type: String,
      value: '0'
    },
    majorID:{
      type: String,
      value: ''
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
      if (this.data.userHasCollect == 1) {
        this.setData({
          'collectBackImage': this.data.hasCollectImage,
          'userHasCollect': 0
        });
      } else {
        this.setData({
          'collectBackImage': this.data.noCollectImage,
          'userHasCollect': 1
        });
      }
    }
  }
})