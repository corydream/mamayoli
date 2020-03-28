const app = getApp()

Page({
  data: {
    cards: 0,
    openId: ''
  },

  onLoad: function (options) {
    if (app.globalData.userInfoData.openId) {
      this.setData({
        openId: app.globalData.userInfoData.openId,
        cards: options.num ? options.num : this.data.cards
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.showShareMenu();
  },
  back() {
    wx.reLaunch({
      url: `../index/index`
    })
  },
  bindload(e){
    console.log(e)
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'Mama有礼',
      path: '/pages/heartCard/heartCard',
      imageUrl: '../../images/share-image.jpg'
    }
  }
})
