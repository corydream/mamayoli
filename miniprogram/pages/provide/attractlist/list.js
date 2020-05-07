// miniprogram/pages/provide/attractlist/list.js
import UploadService from '../../../service/upload.js';
const uploadService = new UploadService();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        attractType: 'public',
        attractName: '公众号',
        attractText: '',
        attractDetail: '',
        attractImg: '',
        attractImgUrl: ''
      },
      {
        attractType: 'weixin',
        attractName: '微信号',
        attractText: '',
        attractDetail: '',
        attractImg: '',
        attractImgUrl: ''
      },
      {
        attractType: 'weixinqun',
        attractName: '微信群',
        attractText: '',
        attractDetail: '',
        attractImg: '',
        attractImgUrl: ''
      },
      {
        attractType: 'app',
        attractName: '小程序',
        attractText: '',
        attractDetail: '',
        attractImg: '',
        attractImgUrl: ''
      },
    ],
    checked: 0,
  },
  onTypeChange(e) {
    this.setData({
      checked: parseInt(e.detail.value)
    })
  },
  bindTextInput(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    this.data.list[index].attractText = e.detail.value;
    this.setData(this.data)
  },
  bindDetailInput(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index;
    this.data.list[index].attractDetail = e.detail.value;
    this.setData(this.data)
  },
  uploadImg(e) {
    let index = e.currentTarget.dataset.index;
    uploadService.choseImgAndUpload(1, (res) => {
      console.log(res)
      this.data.list[index].attractImg = res[0].filePath;
      this.data.list[index].attractImgUrl = res[0].url;
      this.setData(this.data);
    });
  },
  submit(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.data.list.push(this.data.list[this.data.checked])
    wx.setStorage({
      key: 'attarctList',
      data: JSON.stringify(prevPage.data.list),
    })
    prevPage.setData(prevPage.data)
    //返回上一页
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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