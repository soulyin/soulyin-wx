const setItem = (key, value) => {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
const getItem = (key) => {
  try {
    const data = wx.getStorageSync(key);
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}
// 设置最近播放的歌曲列表
const setRecentPlayList = (songInfo) => {
  let list = getItem('recentList');
  if (list) {
    list.some((item, index) => {
      if (item.songId === songInfo.songId) {
        return list.splice(index, 1);
      }
    })
    list.unshift(songInfo);
  } else {
    list = [];
    list.unshift(songInfo);
  }
  list = list.slice(0, 5);
  setItem('recentList', list)
}

// 添加歌曲到播放列表
const addSongToPlayList = (o) => {
  let playList = getItem('playList');
  if (playList) {
    playList.push(o);
  } else {
    playList = [o];
  }
  console.log('o:', o)
  setItem('playList', playList);
}

// 设置最后一次播放的音乐到 localStorage 中
const setLastSongInfoToLocalStorage = songInfo => {
  setItem('lastSongInfo', songInfo)
}

// 获取播放列表
const getPlayList = () => {
  return getItem('playList')
}

// 从 0~n 获取一个随机正整数
const getRandomNum = (n) => {
  return Math.floor(Math.random()*n)
}

// 给 obj 添加歌曲信息（obj 为 audio 或 g.curPlay 对象）
const addSongInfoToObj = (obj, songInfo) => {
  obj.src = songInfo.src;
  obj.title = songInfo.title;
  obj.epname = songInfo.epname;
  obj.singer = songInfo.singer;
  obj.coverImgUrl = songInfo.coverImgUrl;
  obj.songId = songInfo.songId;
  obj.webUrl = songInfo.webUrl;
  obj.playStatus = songInfo.playStatus;
}

module.exports = {
  setItem,
  getItem,
  setRecentPlayList,
  addSongToPlayList,
  getPlayList,
  getRandomNum,
  addSongInfoToObj,
  setLastSongInfoToLocalStorage
}