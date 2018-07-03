const http = require('../../http.js');
const httpConfig = require('../../http.config.js');

const baseUrl = httpConfig.baseUrl;

const app = getApp()
const g = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: g.sVal,
    btnName: '搜索',
    playStatus: g.playStatus,
    songList: [], // 歌曲列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    http.get(baseUrl + 'song/search', {
      keywords: '起风了'
    }).then(data => {
      this.setData({
        songList: data.data.list.result.songs
      })
      console.log(data.data.list.result.songs)
    }).catch(err => {
      console.error(err);
    })

  },
  tapSong(e) {
    this.getSongUrl(e.detail.songId);
  },
  getSongUrl(songId) {
    http.get(baseUrl + 'song/music/url', {
      id: songId
    }).then(data => {
      const url = data.data.songUrl.data[0].url;
      this.play(url);
    }).catch(err => {
      console.error(err);
    })
  },
  play(url) {
    g.audio.src = url;
    
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