// component/paly-bar/play-bar.js

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curPlay: { // 当前播放歌曲的信息
      type: Object
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
    play() {
      this.triggerEvent('play', {
        curPlay: this.data.curPlay
      });
    },
    stop() {
      this.triggerEvent('stop')
    },
    toPlay() {
      wx.navigateTo({
        url: '../play/play'
      })
    }
  }
})
