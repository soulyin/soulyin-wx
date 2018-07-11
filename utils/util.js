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

const setRencentPlayList = (o) => {
  const list = getItem('recentList');
  let arr = [];
  if (list) {
    arr = JSON.parse(list);
    arr.some((item, index) => {
      if (item.songId === o.songId) {
        return arr.splice(index, 1);
      }
    })
    arr.push(o);
  } else {
    arr.push(o);
  }
  setItem('recentList', JSON.stringify(arr))
}
module.exports = {
  setItem,
  getItem,
  setRencentPlayList
}