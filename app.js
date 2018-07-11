App({
  onLaunch: function() {
    // const audio = wx.getBackgroundAudioManager();
    // audio.src = 'http://m10.music.126.net/20180702195036/98500fa9812846c461627314405492e7/ymusic/96c5/507f/12cf/3de773142bac9bc6c3fb646c00dadd0d.mp3'
  },
  globalData: {
    isAuth: true,
    userInfo: null,
    // 音频相关的全局变量
    playStatus: 'stop', // 音乐播放状态：stop 暂停 | play 播放
    audio: wx.getBackgroundAudioManager(), // 背景音频对象
    duration: 0, // 当前音频长度（单位：s）
    currentTime: 0, // 当前音频的播放位置（单位：s）
    src: '', // 音频地址
    title: '好听的音乐', // 音频标题
    epname: '', // 专辑名
    singer: '', // 歌手名
    coverImgUrl: '', // 封面图
    songId: '', // 歌曲id
    searchVal: '' // 搜索值
  },

})