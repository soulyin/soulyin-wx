const http = require('../../http.js');
const httpConfig = require('../../http.config.js');
const {
  setItem,
  setRecentPlayList,
  addSongToPlayList,
  addSongInfoToObj,
  setLastSongInfoToLocalStorage
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

    curPlay: g.curPlay,

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
      const src = data.data.data[0].url;
      // 获取歌曲详细信息
      this.getSongDetail(songId, src)
    }).catch(err => {
      console.error(err);
    })
  },
  // 获取歌曲详情（封面等...）
  getSongDetail(songId, src) {
    http.get(baseUrl + 'song/detail', {
      ids: songId
    }).then(data => {
      console.log('data:', data)
      const coverImgUrl = data.data.songs[0].al.picUrl;
      const epname = data.data.songs[0].al.name;
      const singers = data.data.songs[0].ar;
      let singer = '';
      singers.forEach((item, index) => {
        index === 0 ? singer += item.name : singer += ' ' + item.name;
      });
      const songName = data.data.songs[0].name;
      g.coverImgUrl = coverImgUrl;
      g.title = songName;
      this.setData({
        coverImgUrl,
        title: songName
      })
      const curPlay = {
        src,
        title: songName,
        epname,
        singer: singers,
        coverImgUrl,
        songId,
        webUrl: '',
        playStatus: 'play'
      }
      addSongInfoToObj(g.audio, curPlay);
      addSongInfoToObj(g.curPlay, curPlay);

      this.setData({
        curPlay
      })
      // 将歌曲信息存入 localStorage
      setRecentPlayList(curPlay);
      // 加入播放列表
      addSongToPlayList(curPlay)

    }).catch(err => {
      console.error(err);
    })
  },
  // 开始播放
  play() {
    const audio = g.audio;
    g.curPlay.playStatus = 'play';
    if (!audio.src) {
      addSongInfoToObj(audio, g.curPlay);
    } else {
      audio.play();
    }
    this.setData({
      curPlay: g.curPlay
    })
  },
  // 停止播放
  stop() {
    g.audio.pause();
    const curPlay = g.curPlay;
    curPlay.playStatus = 'stop'
    this.setData({
      curPlay
    })
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
    this.setData({
      curPlay: g.curPlay
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