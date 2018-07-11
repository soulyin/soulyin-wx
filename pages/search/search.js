const http = require('../../http.js');
const httpConfig = require('../../http.config.js');
const {
  setRencentPlayList
} = require('../../utils/util.js')


const baseUrl = httpConfig.baseUrl;

const app = getApp()
const g = app.globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: g.searchVal,
    btnName: '搜索',
    playStatus: g.playStatus,
    coverImgUrl: '', // 封面图地址
    songList: [], // 歌曲列表
    title: g.title, // 歌名

    noSongListTip: false, // 搜索不到歌曲时显示文本提示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSongList(g.searchVal);
  },
  // 获取歌曲列表
  getSongList(songName) {
    wx.showLoading({
      title: '搜索中...'
    })
    http.get(baseUrl + 'song/search', {
      keywords: songName
    }).then(data => {
      // 搜索到的歌曲为0
      if (data.data.code === 400 || data.data.result.songCount === 0) {
        this.setData({
          noSongListTip: true
        })
        wx.hideLoading()
        return;
      }
      this.setData({
        songList: data.data.result.songs
      })
      wx.hideLoading()

    }).catch(err => {
      console.error(err);
      wx.hideLoading()
    })
  },
  // 点击歌曲
  tapSong(e) {
    const songId = e.detail.songId;
    this.getSongUrl(songId);
  },
  // 获取歌曲播放地址
  getSongUrl(songId) {
    http.get(baseUrl + 'song/music/url', {
      id: songId
    }).then(data => {
      console.log('url:', data);
      const url = data.data.data[0].url;
      g.audio.src = url;
      g.src = url;
      g.playStatus = 'play';
      g.songId = songId;
      this.setData({
        playStatus: 'play'
      })
      // 获取歌曲详细信息
      this.getSongDetail(songId)

    }).catch(err => {
      console.error(err);
    })
  },
  // 获取歌曲详情（封面等...）
  getSongDetail(songId) {
    http.get(baseUrl + 'song/detail', {
      ids: songId
    }).then(data => {
      const coverImgUrl = data.data.songs[0].al.picUrl;
      const songName = data.data.songs[0].name;
      g.coverImgUrl = coverImgUrl;
      g.title = songName;
      this.setData({
        coverImgUrl,
        title: songName
      })
      // 将歌曲信息存入 localStorage
      setRencentPlayList({
        songId: g.songId,
        src: g.src,
        coverImgUrl: g.coverImgUrl,
        title: g.title
      })
    }).catch(err => {
      console.error(err);
    })
  },
  // 开始播放
  play(url) {
    g.audio.play();
    this.setData({
      playStatus: 'play'
    })
    g.playStatus = 'play';
  },
  // 停止播放
  stop() {
    g.audio.pause();
    this.setData({
      playStatus: 'stop'
    })
    g.playStatus = 'stop'
  },
  // bindinput
  bindinput(e) {
    this.setData({
      searchVal: e.detail.value
    })
  },
  // 点击搜索按钮
  search() {
    this.setData({
      noSongListTip: false,
      songList: []
    })
    this.getSongList(this.data.searchVal);
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
    console.log('onShow:', g)
    this.setData({
      playStatus: g.playStatus,
      coverImgUrl: g.coverImgUrl,
      title: g.title
    })
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