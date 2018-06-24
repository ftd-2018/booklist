// components/booklistnav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    collections:{
      type:Array,
      value:[]
    },
    hasMore:{
      type:Boolean,
      value: false
    },
    loading:{
      type: Boolean,
      value: false
    }
  },
  ready(){
    console.log(this.properties.collections);
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

  }
})
