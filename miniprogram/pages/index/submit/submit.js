const app = getApp();

Page({
  data: {},

  onLoad: function (options) {},
  nextLottery() {
    wx.reLaunch({
      url: '/pages/index/index',
    });
  },
});
