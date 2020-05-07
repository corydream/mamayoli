// miniprogram/pages/provide/provide.js
import UploadService from '../../service/upload.js';
const uploadService = new UploadService();
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: [{
      priceName: '',
      priceThumbnail: '',
      priceUrl: '',
      priceNum: 0,
      index: 0,
    }, ],
    lotteryTime: 0,
    provideType: {
      contactMe: false,
      contactType: 'phoneNum',
      phoneNum: '',
      qrCodeUrl: '',
      qrCodePath: ''
    },
    activityDetail: {
      detailText: '',
      detailPics: []
    },
    attract: {

    },
    startDate: '请选择日期',
    multiArray: [
      ['今天', '明天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20],
    ],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let provideType = wx.getStorageSync('provideType')
    if (provideType) {
      this.setData({
        provideType: JSON.parse(provideType)
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
  onShow(e) {
    console.log(this.data);
    if (this.data.cropRes) {
      wx.showLoading({
        title: '上传中',
      });
      let index = parseInt(this.data.cropIndex);
      let t = this;
      uploadService.uploadFile(this.data.cropRes,
        url => {
          wx.hideLoading();
          t.data.priceList[index].priceThumbnail = this.data.cropRes;
          t.data.priceList[index].priceUrl = url;
          t.setData({
            priceList: t.data.priceList,
            cropRes: '',
            cropIndex: 0,
          });
        },
        () => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败',
            duration: 1000,
          });
        }
      )
    }
  },
  selectProvideType(e) {
    wx.navigateTo({
      url: `./type/type?contactMe=${this.data.provideType.contactMe}&contactType=${this.data.provideType.contactType}&phoneNum=${this.data.provideType.phoneNum}&qrCodeUrl=${this.data.provideType.qrCodeUrl}&qrCodePath=${this.data.provideType.qrCodePath}`,
    })
  },
  setDetail(e) {
    wx.navigateTo({
      url: './detail/detail?activityDetail=' + JSON.stringify(this.data.activityDetail),
    })
  },
  setAttract(e) {
    wx.navigateTo({
      url: './attract/attract?checked=' + this.data.attractChecked,
    })
  },
  getPriceLevel(level) {
    switch (level) {
      case 0:
        return 'first';
      case 1:
        return 'second';
      case 2:
        return 'third';
      default:
        return 'extra';
    }
  },
  submit(e) {
    let pricemap = this.data.priceList.map((p) => {
      return {
        level: this.getPriceLevel(p.index),
        name: p.priceName,
        number: p.priceNum,
        thumbnail: p.priceUrl
      };
    });
    uploadService.add({
        priseList: pricemap,
        activity: {
          // providerName: this.data.providerName,
          detail: this.data.activityDetail.detailText,
          lotteryTime: this.data.lotteryTime,
          attractingType: this.data.attract.attractType,
          contactPhoneNum: this.data.provideType.phoneNum,
          priceProvideType: 'contact',
          priceContactId: this.data.provideType.qrCodeUrl,
          attractingPic: this.data.attract.attractImgUrl,
          detailPics: this.data.activityDetail.detailPics.map(pic => pic.url).join(','),
          // sharePic: this.data.sharePic,
          attractingText: this.data.attract.attractText,
        },
      })
      .then(res => {
        console.log(res)
        if (res.data) {
          wx.redirectTo({
            url: '/pages/provide/success/success',
          });
        } else {
          wx.showToast({
            title: '发布失败',
            duration: 1000,
          });
        }
      })
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

  },
  addPrice(e) {
    let len = this.data.priceList.length;
    if (len >= 3) {
      wx.showToast({
        title: '最多只能添加3个奖品',
        icon: 'none',
        duration: 500,
      });
      return;
    }
    this.data.priceList.push({
      priceType: 'entity',
      priceName: '',
      priceThumbnail: '',
      priceNum: 0,
      index: len,
    });
    this.setData({
      priceList: this.data.priceList,
    });
  },
  bindPriceNameInput: function(e) {
    let index = e.currentTarget.dataset['index'];
    this.data.priceList[index].priceName = e.detail.value;
    this.setData({
      priceList: this.data.priceList,
    });
  },
  bindPriceNumInput: function(e) {
    let index = e.currentTarget.dataset['index'];
    this.data.priceList[index].priceNum = e.detail.value;
    this.setData({
      priceList: this.data.priceList,
    });
  },
  uploadPrice: function(e) {
    let t = this;
    let index = e.currentTarget.dataset['index'];
    wx.chooseImage({
      count: 1,
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log('chooseImage success, temp path is: ', tempFilePaths[0]);
        wx.navigateTo({
          url: '../cropper/cropper-example?filePath=' +
            tempFilePaths[0] +
            '&index=' +
            index,
        });
      },
    });
  },
  deletePrice(e) {
    console.log(e);
    let index = e.currentTarget.dataset['index'];
    if (index >= this.data.priceList.length) {
      index = this.data.priceList.length - 1;
    }
    this.data.priceList.splice(index, 1);
    this.setData({
      priceList: this.data.priceList,
    });
  },
  pickerTap: function() {
    date = new Date();

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    // 月-日
    for (var i = 2; i <= 28; i++) {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + i);
      var md = date1.getMonth() + 1 + '-' + date1.getDate();
      monthDay.push(md);
    }

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
    };

    if (data.multiIndex[0] === 0) {
      if (data.multiIndex[1] === 0) {
        this.loadData(hours, minute);
      } else {
        this.loadMinute(hours, minute);
      }
    } else {
      this.loadHoursMinute(hours, minute);
    }

    data.multiArray[0] = monthDay;
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;

    this.setData(data);
  },

  bindMultiPickerColumnChange: function(e) {
    date = new Date();

    var that = this;

    var monthDay = ['今天', '明天'];
    var hours = [];
    var minute = [];

    currentHours = date.getHours();
    currentMinute = date.getMinutes();

    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
    };
    // 把选择的对应值赋值给 multiIndex
    data.multiIndex[e.detail.column] = e.detail.value;

    // 然后再判断当前改变的是哪一列,如果是第1列改变
    if (e.detail.column === 0) {
      // 如果第一列滚动到第一行
      if (e.detail.value === 0) {
        that.loadData(hours, minute);
      } else {
        that.loadHoursMinute(hours, minute);
      }

      data.multiIndex[1] = 0;
      data.multiIndex[2] = 0;

      // 如果是第2列改变
    } else if (e.detail.column === 1) {
      // 如果第一列为今天
      if (data.multiIndex[0] === 0) {
        if (e.detail.value === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
        // 第一列不为今天
      } else {
        that.loadHoursMinute(hours, minute);
      }
      data.multiIndex[2] = 0;

      // 如果是第3列改变
    } else {
      // 如果第一列为'今天'
      if (data.multiIndex[0] === 0) {
        // 如果第一列为 '今天'并且第二列为当前时间
        if (data.multiIndex[1] === 0) {
          that.loadData(hours, minute);
        } else {
          that.loadMinute(hours, minute);
        }
      } else {
        that.loadHoursMinute(hours, minute);
      }
    }
    data.multiArray[1] = hours;
    data.multiArray[2] = minute;
    this.setData(data);
  },

  loadData: function(hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = 0; i < 60; i += 10) {
        minute.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
      // 分
      for (var i = minuteIndex; i < 60; i += 10) {
        minute.push(i);
      }
    }
  },

  loadHoursMinute: function(hours, minute) {
    // 时
    for (var i = 0; i < 24; i++) {
      hours.push(i);
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  loadMinute: function(hours, minute) {
    var minuteIndex;
    if (currentMinute > 0 && currentMinute <= 10) {
      minuteIndex = 10;
    } else if (currentMinute > 10 && currentMinute <= 20) {
      minuteIndex = 20;
    } else if (currentMinute > 20 && currentMinute <= 30) {
      minuteIndex = 30;
    } else if (currentMinute > 30 && currentMinute <= 40) {
      minuteIndex = 40;
    } else if (currentMinute > 40 && currentMinute <= 50) {
      minuteIndex = 50;
    } else {
      minuteIndex = 60;
    }

    if (minuteIndex == 60) {
      // 时
      for (var i = currentHours + 1; i < 24; i++) {
        hours.push(i);
      }
    } else {
      // 时
      for (var i = currentHours; i < 24; i++) {
        hours.push(i);
      }
    }
    // 分
    for (var i = 0; i < 60; i += 10) {
      minute.push(i);
    }
  },

  bindStartMultiPickerChange: function(e) {
    let year = date.getFullYear();
    let month = 0;
    let day = 0;
    let monthDay = this.data.multiArray[0][e.detail.value[0]];
    let hour = this.data.multiArray[1][e.detail.value[1]];
    let minute = this.data.multiArray[2][e.detail.value[2]];
    if (monthDay === '今天') {
      month = date.getMonth() + 1;
      day = date.getDate();
      monthDay = month + '月' + day + '日';
    } else if (monthDay === '明天') {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      month = date1.getMonth() + 1;
      day = date1.getDate();

      // monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";
    } else {
      month = monthDay.split('-')[0]; // 返回月
      day = monthDay.split('-')[1]; // 返回日
      // monthDay = month + "月" + day + "日";
    }
    if (month < date.getMonth() + 1) {
      year = year + 1;
    }
    let startDate = month + '月' + day + '日' + ' ' + hour + ':' + minute;
    let timestamp = new Date(year, month - 1, day, hour, minute);
    this.setData({
      startDate: startDate,
      lotteryTime: timestamp.getTime(),
    });
  },
})