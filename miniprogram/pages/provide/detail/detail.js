// miniprogram/pages/provide/detail/detail.js
import UploadService from '../../../service/upload.js';
const uploadService = new UploadService();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailPics: [],
    detailText: ''
  },
  bindDetailInput: function (e) {
    this.setData({
      detailText: e.detail.value,
    });
  },
  uploadDetail(e) {
    if (this.data.detailPics.length > 6) {
      wx.showToast({
        title: '图片数量超限',
      });
      return;
    }
    uploadService.choseImgAndUpload(6 - this.data.detailPics.length, (res) => {
      console.log(res)
      this.setData({
        detailPics: this.data.detailPics.concat(res)
      });
    });
  },
  deleteDetail(e) {
    console.log(e);
    let index = e.currentTarget.dataset['index'];
    if (index >= this.data.detailPics.length) {
      index = this.data.detailPics.length - 1;
    }
    this.data.detailPics.splice(index, 1);
    this.setData({
      detailPics: this.data.detailPics,
    });
  },

  submit(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      activityDetail: this.data
    })
    //返回上一页
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.activityDetail) {
      this.setData(JSON.parse(options.activityDetail))
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})