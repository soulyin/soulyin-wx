const app = getApp();
const g = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImgUrl: '', // 封面图
    playMode: 'list', // 播放模式：single | list | random
    playStatus: '', // 播放状态
    isAnimation: false, // 是否有旋转动画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      coverImgUrl: g.coverImgUrl,
      playStatus: g.playStatus,
      isAnimation: g.playStatus === 'play' ? true : false
    })
  },
  stop() {
    const audio = g.audio;
    audio.pause();

    g.playStatus = 'stop';
    this.setData({
      playStatus: 'stop',
      isAnimation: false
    })
  },
  play() {
    const audio = g.audio;
    g.playStatus = 'play';

    this.setData({
      playStatus: 'play',
      isAnimation: true
    })
    if (audio.src) {
      audio.play();
    } else {
      audio.src = g.src;
      audio.title = 'hello'
    }
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