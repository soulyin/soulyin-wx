// component/song-item/song-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songName: {
      type: String
    },
    songAuthors: {
      type: Array
    },
    songId: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapSong() {
      const myEventDetail = {
        songId: this.data.songId
      };
      this.triggerEvent('tapSong', myEventDetail)
    }
  }
})