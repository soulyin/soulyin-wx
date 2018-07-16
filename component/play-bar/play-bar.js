// component/paly-bar/play-bar.js

const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    coverImgUrl: {// 歌曲图片地址
      type: String,
    },
    title: {// 歌曲名称
      type: String,
      value: '好听的音乐'
    },
    src: { // 歌曲url
      type: String
    },
    playStatus: { // 播放状态
      type: String,
      value: 'stop'
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
        src: this.data.src
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
