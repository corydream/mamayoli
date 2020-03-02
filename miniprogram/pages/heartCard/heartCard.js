const app = getApp()

Page({
  data: {
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showShareMenu();
  },
  gohome() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
  }
})
