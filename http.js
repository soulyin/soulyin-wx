
const http = {
  get(url, data) {
    const skey = wx.getStorageSync('skey');
    let d = {};
    if (skey) {
      d.skey = skey;
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: Object.assign(d, data),
        method: 'GET',
        dataType: 'json',
        success: (data) => {
          if (data.data.code !== 1) {
            reject(data.data.message);
          } else {
            resolve(data.data);
          }
        },
        fail: (err) => {
          resolve(err);
        }
      })
    })
  },
  post(url, data) {
    const skey = wx.getStorageSync('skey');
    let d = {};
    if (skey) {
      d.skey = skey;
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: Object.assign(d, data),
        method: 'POST',
        dataType: 'json',
        success: (data) => {
          if (data.data.code !== 1) {
            reject(data.data.message);
          } else {
            resolve(data.data);
          }
        },
        fail: (err) => {
          resolve(err);
        }
      })
    });
  }
}

module.exports = http;
