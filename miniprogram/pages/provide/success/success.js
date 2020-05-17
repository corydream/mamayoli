
Page({


  data: {
    options: {}
  },

  onLoad: function (options) {

  },
  create(e) {
    wx.redirectTo({
      url: '/pages/provide/provide',
    })
  }
})