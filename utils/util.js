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
const setRencentPlayList = (o) => {
  let list = getItem('recentList');
  if (list) {
    list.some((item, index) => {
      if (item.songId === o.songId) {
        return list.splice(index, 1);
      }
    })
    list.push(o);
  } else {
    list = [];
    list.push(o);
  }
  setItem('recentList', list)
}



module.exports = {
  setItem,
  getItem,
  setRencentPlayList
}