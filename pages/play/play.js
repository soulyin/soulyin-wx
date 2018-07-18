const {
  addSongInfoToObj,
} = require('../../utils/util.js')

const app = getApp();
const g = app.globalData;

let startX, startY;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 播放模式：single | list | random
    playMode: g.playMode,

    // 是否有旋转动画
    isAnimation: g.curPlay.playStatus === 'play' ? true : false,

    // 当前播放的歌曲信息
    curPlay: g.curPlay,

    pointLeft: '0rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isAnimation: g.curPlay.playStatus === 'play' ? true : false,
    })
  },

  // 停止播放
  stop() {
    const audio = g.audio;
    audio.pause();
    const curPlay = g.curPlay;
    curPlay.playStatus = 'stop';

    this.setData({
      curPlay,
      isAnimation: false
    })
    console.log('duration:', audio.duration)
  },

  // 开始播放
  play() {
    const audio = g.audio;
    const curPlay = g.curPlay;
    curPlay.playStatus = 'play';
    if (!audio.src) {
      addSongInfoToObj(audio, g.curPlay);
    } else {
      audio.play();
    }
    this.setData({
      isAnimation: true,
      curPlay
    })
  },
  // 切换播放模式
  switchPlayMode(e) {
    const mode = e.target.dataset.mode;
    let nextMode;
    if (mode === 'list') {
      nextMode = 'random';
    } else if (mode === 'random') {
      nextMode = 'single';
    } else {
      nextMode = 'list';
    }
    g.playMode = nextMode;
    this.setData({
      playMode: nextMode
    })
  },
  touchstart(e) {
    console.log('start e:', e)
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
  },
  touchmove(e) {
    console.log('move e:', e)
  },
  touchend(e) {
    console.log('end e:', e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})