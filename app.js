const {
  setItem,
  getPlayList,
  getRandomNum,
  setLastSongInfoToLocalStorage
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
        wx.showToast({
          title: '开始播放',
        })
        setTimeout(() => {
          setLastSongInfoToLocalStorage(g.curPlay)
        }, 500)
      })

      // 停止回调
      audio.onStop((data) => {
        console.log('audio onStop:', data)
      })

      // 结束回调
      audio.onEnded((data) => {
        switch (g.playMode) {
          case 'single':
            {
              const curPlay = g.curPlay;
              audio.src = curPlay.src;
              audio.title = curPlay.title;
              audio.epname = curPlay.epname;
              audio.singer = curPlay.singer;
              audio.coverImgUrl = curPlay.coverImgUrl;
              audio.songId = curPlay.songId;
              audio.webUrl = curPlay.webUrl;

              break;
            }
          case 'list':
            {
              let list = g.playList,
                curPlay = g.curPlay,
                nextPlay;
              list.some((item, index) => {
                if (item.songId === curPlay.songId) {
                  if (index === list.length - 1) {
                    nextPlay = list[0];
                  } else {
                    nextPlay = list[index + 1];
                  }
                  return true;
                }
              });

              audio.src = nextPlay.src;
              audio.title = nextPlay.title;
              audio.epname = nextPlay.epname;
              audio.singer = nextPlay.singer;
              audio.coverImgUrl = nextPlay.coverImgUrl;
              audio.songId = nextPlay.songId;
              audio.webUrl = nextPlay.webUrl;

              g.curPlay = nextPlay;
              break;
            }
          case 'random':
            {
              const list = g.playList,
                n = getRandomNum(),
                nextPlay = list[n];

              audio.src = nextPlay.src;
              audio.title = nextPlay.title;
              audio.epname = nextPlay.epname;
              audio.singer = nextPlay.singer;
              audio.coverImgUrl = nextPlay.coverImgUrl;
              audio.songId = nextPlay.songId;
              audio.webUrl = nextPlay.webUrl;
            }
        }

      })

      // 播放进度更新回调
      audio.onTimeUpdate((data) => {
        // console.log('audio onTimeUpdate:', data)
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
        const code = err.errCode;
        let title;
        switch (code) {
          case 10001:
            {
              title = '系统错误';
              break;
            }
          case 10002:
            {
              title: '网络错误';
              break;
            }
          case 10003:
            {
              title: '文件错误';
              break;
            }
          case 10004:
            {
              title: '格式错误';
              break;
            }
          case -1:
            {
              title: '未知错误';
            }
        }
        wx.showToast({
          title
        })
      })
    }, 500)
  },
  globalData: {
    audio: wx.getBackgroundAudioManager(), // 背景音频对象

    searchVal: '', // 搜索值

    // 音频相关的全局变量
    duration: 0, // 当前音频长度（单位：s）
    currentTime: 0, // 当前音频的播放位置（单位：s）

    // 当前播放音乐的信息
    curPlay: {
      src: '',
      title: '好听的音乐',
      epname: '',
      singer: '',
      coverImgUrl: '',
      songId: '',
      webUrl: '',
      playStatus: 'stop'
    },

    playMode: '', // 播放模式

    src: '', // 音频地址
    title: '好听的音乐', // 音频标题
    epname: '', // 专辑名
    singer: '', // 歌手名
    coverImgUrl: '', // 封面图
    songId: '', // 歌曲id

    playList: getPlayList(), // 播放列表
  },

})