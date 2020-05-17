// miniprogram/pages/provide/detail/detail.js
import UploadService from '../../../service/upload.js';
const uploadService = new UploadService();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      attractType: 'none',
      attractName: '不设置',
      attractText: '',
      attractDetail: '',
      attractImg: '',
      attractImgUrl: ''
    }],
    checked: 0
  },
  onSelectChange(e) {
    this.setData({
      checked: parseInt(e.detail.value)
    })
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
  addAttract(e) {
    wx.navigateTo({
      url: '../attractlist/list',
    })
  },
  submit(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      attract: this.data.list[this.data.checked],
      attractChecked: this.data.checked
    })
    //返回上一页
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let list = wx.getStorageSync('attarctList')
    if (list) {
      this.setData({
        list: JSON.parse(list)
      })
    }
    if (options.checked) {
      this.setData({
        checked: parseInt(options.checked)
      })
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