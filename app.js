const {
  setItem
} = require('./utils/util.js')

App({
  onLaunch: function() {
    setTimeout(() => {
      const g = getApp().globalData;
      // audio 实例
      const audio = g.audio;

      // 暂停回调
      audio.onPause((data) => {
        console.log('audio onPause:', data)
      })

      // 播放回调
      audio.onPlay(() => {
        setTimeout(() => {
          setItem('last', {
            songId: g.songId,
            title: g.title,
            coverImgUrl: g.coverImgUrl,
            src: g.src
          })
        }, 500)
      })

      // 停止回调
      audio.onStop((data) => {
        console.log('audio onStop:', data)
      })

      // 结束回调
      audio.onEnded((data) => {
        console.log('audio onEnded:', data)
      })

      // 播放进度更新回调
      audio.onTimeUpdate((data) => {
        console.log('audio onTimeUpdate:', data)
      })

      // 上一首回调（ios）
      audio.onPrev((data) => {
        console.log('audio onPrev:', data)
      })

      // 下一首回调（ios）
      audio.onNext((data) => {
        console.log('audio onNext:', data)
      })

      // 音频加载回调
      audio.onWaiting((data) => {
        console.log('audio onWaiting:', data)
      })

      // 出错回调
      audio.onError((err) => {
        console.log('audio onError:', err);
      })
    }, 1000)
  },
  globalData: {
    audio: wx.getBackgroundAudioManager(), // 背景音频对象

    searchVal: '', // 搜索值

    // 音频相关的全局变量
    playStatus: 'stop', // 音乐播放状态：stop 暂停 | play 播放
    duration: 0, // 当前音频长度（单位：s）
    currentTime: 0, // 当前音频的播放位置（单位：s）

    src: '', // 音频地址
    title: '好听的音乐', // 音频标题
    epname: '', // 专辑名
    singer: '', // 歌手名
    coverImgUrl: '', // 封面图
    songId: '', // 歌曲id
    playMode: '', // 播放模式
  },

})