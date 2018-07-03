// component/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: String,
      value: '搜索'
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
    toHome() {
      this.triggerEvent('searchTap');
    },
    toMy() {
      this.triggerEvent('myTap')
    }
  }
})
