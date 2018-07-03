const setItem = (key, val) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data: val,
      success: (data) => {
        console.log('setItem:')
        console.log(data)
      }
    })
  })
}

const getItem = (key) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: function(data) {
        console.log('getItem', data)
      },
    })
  })
}

module.exports = {
  setItem,
  getItem
}