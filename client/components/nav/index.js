// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "写书单",
    src : "../../images/head.png",
    penimg: "../../images/pen.png",
    navItems:[{
      url: "",
      text: "我的收藏"
    },{
      url: "",
      text: "我的书单"
    }],
    isShowNav: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showNav() {
      if(this.data.isShowNav){
        this.setData({
          isShowNav: false
        })
      }else{
        this.setData({
          isShowNav: true
        })
      }
      
    }
  }
})
