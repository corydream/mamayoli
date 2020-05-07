// miniprogram/pages/provide/type/index.js
import UploadService from '../../../service/upload.js';
const uploadService = new UploadService();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactMe: 'false',
    contactType: 'phoneNum',
    phoneNum: '',
    qrCodeUrl: '',
    qrCodePath: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData(options)
  },
  onContactChange(e) {
    this.setData({
      contactType: e.detail.value,
    });
  },
  onTypeChange(e) {
    console.log(e)
    this.setData({
      contactMe: 'true',
    });
  },
  uploadQrCode(e) {
    uploadService.choseImgAndUpload(1, res => {
      console.log(res)
      this.setData({
        qrCodePath: res[0].filePath,
        qrCodeUrl: res[0].url
      })
    });
  },
  submit(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      provideType: this.data
    })
    wx.setStorage({
      key: 'provideType',
      data: JSON.stringify(this.data),
    })
    //返回上一页
    wx.navigateBack();
  }
})