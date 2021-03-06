const http = require('../../http.js');
const httpConfig = require('../../http.config.js');
const {
  getItem,
  addSongInfoToObj,
} = require('../../utils/util.js')
const baseUrl = httpConfig.baseUrl;

// 应用实例
const app = getApp();
const g = app.globalData;


Page({
  onReady: function(e) {
    // 检查微信 session 是否过期
    wx.checkSession({
      // 未过期：更新用户信息
      success: () => {
        console.log('小程序 session 未过期')
        this.wxUpdateUserInfo()
      },
      // 过期：重新登录
      fail: () => {
        console.log('小程序 session 已过期')
        this.wxLogin();
      }
    })
    this.initPlayBarStatus();
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    isAuth: true,
    isAuthModalVisible: true,

    recentList: [],
    hotList: [],
    curPlay: g.curPlay
  },
  // 初始化播放栏状态
  initPlayBarStatus() {
    const lastSongInfo = getItem('lastSongInfo');
    if (lastSongInfo) {
      lastSongInfo.playStatus = 'stop';
      this.setData({
        curPlay: lastSongInfo
      })
      addSongInfoToObj(g.curPlay, lastSongInfo);
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toMy: function() {
    wx.navigateTo({
      url: '../My/my',
    })
  },
  onLoad() {
    this.getRecentList();
  },
  // 获取最近播放列表
  getRecentList() {
    const list = getItem('recentList');
    if (list) {
      list.slice(0, 5);
      this.setData({
        recentList: list
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取用户信息
  bindGetUserInfo: function(userinfo) {
    // 允许
    if (userinfo.detail.userInfo) {
      wx.showToast({
        title: '授权成功！',
        icon: 'none'
      })
      http.post(baseUrl + 'sy/wx/update-user-info', userinfo.detail.userInfo)
        .then(data => {
          console.log('更新用户信息成功')
        }).catch(err => {
          console.error(err);
        });
      // 拒绝
    } else {
      wx.showToast({
        title: '您拒绝了授权，将使用系统默认用户名和头像',
        icon: 'none'
      })
    }
    this.setData({
      isAuthModalVisible: false
    })
  },
  // 微信登录
  wxLogin() {
    const ctx = this;
    wx.login({
      success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log(res.code)
          http.post(baseUrl + 'sy/wx/login', {
            code: res.code
          }).then(data => {
            try {
              wx.setStorageSync('skey', data.data)
            } catch (err) {
              console.error(err.message);
            }
            ctx.wxUpdateUserInfo();
          }).catch(err => {
            console.error(err.message);
          });
        } else {
          console.log('获取 code 失败');
        }
      }
    })
  },
  // 检查微信用户信息是否已授权
  // 已授权：更新微信登录的用户信息（昵称、头像等）
  // 未授权：显示授权弹窗
  wxUpdateUserInfo() {
    const ctx = this;
    // 更新用户信息
    wx.getSetting({
      success(res) {
        // 已授权
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已授权')

          wx.getUserInfo({
            success: res => {
              http.post(baseUrl + 'sy/wx/update-user-info', res.userInfo)
                .then(data => {
                  console.log('更新用户信息成功')
                }).catch(err => {
                  console.error(err);
                });
            }
          })
          // 未授权
        } else {
          console.log('未授权')
          ctx.setData({
            isAuth: false
          });
        }
      }
    })
  },
  toMy() {
    wx.navigateTo({
      url: '../my/my'
    })
  },

  // 开始播放
  play() {
    const curPlay = g.curPlay,
      audio = g.audio;
    curPlay.playStatus = 'play';

    // 当前 src 为空（新打开 app 时）
    if (!audio.src) {
      addSongInfoToObj(audio, curPlay)
    } else {
      audio.play();
    }
    this.setData({
      curPlay
    });
  },

  // 停止播放
  stop() {
    g.audio.pause();
    const curPlay = g.curPlay;
    curPlay.playStatus = 'stop';
    this.setData({
      curPlay
    })
  },
  bindKeyInput(e) {
    g.searchVal = e.detail.value;
  },
  toSearch() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  onShow: function() {
    this.setData({
      curPlay: g.curPlay
    });
    this.getRecentList();
  },
  // 播放最近搜索的音乐
  playRecent(e) {
    const songInfo = e.target.dataset.songinfo;

    addSongInfoToObj(g.audio, songInfo);
    addSongInfoToObj(g.curPlay, songInfo);

    this.setData({
      curPlay: songInfo
    })
  }
})