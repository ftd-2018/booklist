// components/tip/index.js
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
    isShow: '',
    isGo: false,
    y:300+"px"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showTip(){
      const that = this;
      if(this.data.isGo == false){
        this.setData({
          isGo: true,
          isShow: 'animated bounceInRight'
        });

        setTimeout(function(){
          that.setData({
            isGo: false,
            isShow: 'animated fadeInLeft'
          });
        },4000);
      }else{
    
      }
    },
    dragTip(e){
      this.setData({
        y: e.touches[0].clientY+"px"
      });
    }
  }
})
