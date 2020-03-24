import IndexService from './im.service';
const indexService = new IndexService();
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
Page({
  data: {
    priceList: [
      {
        priceType: 'entity',
        priceName: '',
        priceThumbnail: '',
        priceNum: 0,
        index: 0
      }
    ],
    current: 0,
    time: '09:00',
    providerName: '',
    detail: '',
    lotteryTime: 0,
    attractingType: '公众号',
    contactPhoneNum: 0,
    priceContactId: '',
    priceProvideType: 'address',
    attractingPic: '',
    startDate: '请选择日期',
    multiArray: [
      ['今天', '明天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20]
    ],
    multiIndex: [0, 0, 0],
    top_num: 0,
    touchStart: {}
  },
  checkFirst() {
    for (let price of this.data.priceList) {
      if (!price.priceThumbnail) {
        wx.showToast({
          title: '请上传奖品图片',
          icon: 'none',
          duration: 500
        });
        return false;
      }
      if (!price.priceName) {
        wx.showToast({
          title: '请填写奖品名称',
          icon: 'none',
          duration: 500
        });
        return false;
      }
      if (!price.priceNum) {
        wx.showToast({
          title: '请填写奖品数量',
          icon: 'none',
          duration: 500
        });
        return false;
      }
    }
    return true;
  },
  checkSecond() {
    if (!this.data.lotteryTime) {
      wx.showToast({
        title: '请填写开奖时间',
        icon: 'none',
        duration: 500
      });
      return false;
    }
    if (
      this.data.priceProvideType === 'contract' &&
      !this.data.priceContactId
    ) {
      wx.showToast({
        title: '请上传发奖人联系方式',
        icon: 'none',
        duration: 500
      });
      return false;
    }
    return true;
  },
  checkThird() {
    if (!this.data.providerName) {
      wx.showToast({
        title: '请填写赞助方名称',
        icon: 'none',
        duration: 500
      });
      return false;
    }
    if (!this.data.contactPhoneNum) {
      wx.showToast({
        title: '请输入对接人联系方式',
        icon: 'none',
        duration: 500
      });
      return false;
    }
    if (!this.data.attractingPic) {
      wx.showToast({
        title: '请上传' + this.data.attractingType + '二维码图片',
        icon: 'none',
        duration: 500
      });
      return false;
    }
    return true;
  },
  addPrice(e) {
    let len = this.data.priceList.length;
    if (len >= 3) {
      wx.showToast({
        title: '最多只能添加3个奖品',
        icon: 'none',
        duration: 500
      });
      return;
    }
    this.data.priceList.push({
      priceType: 'entity',
      priceName: '',
      priceThumbnail: '',
      priceNum: 0,
      index: len
    });
    this.setData({
      priceList: this.data.priceList
    });
  },

  stopTouchMove(e) {
    console.log('onSWipperMove', e, this.data.top_num);
    let y = e.touches[0].clientY - this.data.touchStart.clientY;
    this.setData({
      top_num: this.data.top_num - y > 0 ? this.data.top_num - y : 0
    });
    return true;
    // if (e.target.offsetLeft<e.target.offsetTop){
    //   return true;
    // }

    // return false;
  },
  bindtouchmove(e) {
    console.log('bindtouchmove', e);
    // this.setData({
    //   top_num: this.data.top_num + e.target.offsetTop
    // })
  },
  bindtouchstart(e) {
    console.log('bindtouchstart', e);
    this.setData({
      touchStart: e.touches[0]
    });
    return true;
  },
  deletePrice(e) {
    console.log(e);
    let index = e.currentTarget.dataset['index'];
    if (index >= this.data.priceList.length) {
      index = this.data.priceList.length - 1;
    }
    this.data.priceList.splice(index, 1);
    this.setData({
      priceList: this.data.priceList
    });
  },
  bindSwiperChange: function(e) {
    if (e.detail.source != 'touch') {
      return;
    }
    let swipe = e.detail.current;
    console.log(e);
    if (!this.checkFirst() && swipe == 1) {
      this.setData({
        current: 0
      });
    } else if (!this.checkSecond() && swipe == 2) {
      this.setData({
        current: 1
      });
    } else {
      this.setData({
        current: e.detail.current
      });
    }
  },
  nextPage: function(e) {
    let first =
      this.data.current === 0 ? this.checkFirst() : this.checkSecond();
    if (!first) {
      return;
    }
    this.setData({
      current: this.data.current < 2 ? this.data.current + 1 : 2
    });
  },
  prePage: function(e) {
    this.setData({
      current: this.data.current - 1
    });
  },
  onShow(e) {
    console.log(this.data);
    if (this.data.cropRes) {
      wx.showLoading({
        title: '上传中'
      });
      let index = parseInt(this.data.cropIndex);
      let t = this;
      indexService
        .sts()
        .then(sts => {
          console.log(sts);
          wx.uploadFile({
            url: 'https://' + sts.data.host,
            filePath: this.data.cropRes,
            name: 'file',
            formData: {
              name: this.data.cropRes,
              key: sts.data.dir + '/${filename}',
              policy: sts.data.policy,
              OSSAccessKeyId: sts.data.accessid,
              success_action_status: '200',
              signature: sts.data.signature
            },
            success: function(res) {
              console.log(res);
              let picUrl =
                'https://' +
                sts.data.host +
                '/' +
                sts.data.dir +
                t.data.cropRes.substring(t.data.cropRes.lastIndexOf('/'));
              console.log('chooseImage success, temp path is: ', picUrl);
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              });
              t.data.priceList[index].priceThumbnail = picUrl;
              t.setData({
                priceList: t.data.priceList,
                cropRes: '',
                cropIndex: 0
              });
            },
            fail: function({ errMsg }) {
              console.log('upladImage fail, errMsg is: ', errMsg);
              t.setData({
                cropRes: '',
                cropIndex: 0
              });
              wx.hideLoading();
              wx.showToast({
                title: '上传失败',
                duration: 1000
              });
            }
          });
        })
        .catch(e => wx.hideLoading());
      this.data.priceList[this.data.cropIndex].thumbnail;
    }
  },
  uploadPrice: function(e) {
    let t = this;
    let index = e.currentTarget.dataset['index'];
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res);
        console.log('chooseImage success, temp path is: ', tempFilePaths[0]);
        wx.navigateTo({
          url:
            '../cropper/cropper-example?filePath=' +
            tempFilePaths[0] +
            '&index=' +
            index
        });
      }
    });
  },
  uploadProvideImg: function(e) {
    let t = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res);
        console.log('chooseImage success, temp path is: ', tempFilePaths[0]);
        wx.showLoading({
          title: '上传中'
        });
        indexService.sts().then(sts => {
          console.log(sts);
          wx.uploadFile({
            url: 'https://' + sts.data.host,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              name: tempFilePaths[0],
              key: sts.data.dir + '/${filename}',
              policy: sts.data.policy,
              OSSAccessKeyId: sts.data.accessid,
              success_action_status: '200',
              signature: sts.data.signature
            },
            success: function(res) {
              console.log(res);
              let picUrl =
                'https://' +
                sts.data.host +
                '/' +
                sts.data.dir +
                tempFilePaths[0].substring(tempFilePaths[0].lastIndexOf('/'));
              console.log('chooseImage success, temp path is: ', picUrl);
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              });
              t.setData({
                priceContactId: picUrl
              });
            },
            fail: function({ errMsg }) {
              console.log('upladImage fail, errMsg is: ', errMsg);
              wx.hideLoading();
              wx.showToast({
                title: '上传失败',
                duration: 1000
              });
            }
          });
        });
      }
    });
  },
  uploadAttractingImg: function(e) {
    let t = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(res);
        console.log('chooseImage success, temp path is: ', tempFilePaths[0]);
        wx.showLoading({
          title: '上传中'
        });
        indexService.sts().then(sts => {
          console.log(sts);
          wx.uploadFile({
            url: 'https://' + sts.data.host,
            filePath: tempFilePaths[0],
            name: 'file',
            formData: {
              name: tempFilePaths[0],
              key: sts.data.dir + '/${filename}',
              policy: sts.data.policy,
              OSSAccessKeyId: sts.data.accessid,
              success_action_status: '200',
              signature: sts.data.signature
            },
            success: function(res) {
              console.log(res);
              let picUrl =
                'https://' +
                sts.data.host +
                '/' +
                sts.data.dir +
                tempFilePaths[0].substring(tempFilePaths[0].lastIndexOf('/'));
              console.log('chooseImage success, temp path is: ', picUrl);
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000
              });
              t.setData({
                attractingPic: picUrl
              });
            },
            fail: function({ errMsg }) {
              console.log('upladImage fail, errMsg is: ', errMsg);
              wx.hideLoading();
              wx.showToast({
                title: '上传失败',
                duration: 1000
              });
            }
          });
        });
      }
    });
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      time: e.detail.value
    });
  },
  onPriceTypeChange: function(e) {
    let index = e.currentTarget.dataset['index'];
    this.data.priceList[index].priceType = e.detail.value;
    this.setData({
      priceList: this.data.priceList
    });
  },
  onPriceProvideTypeChange: function(e) {
    console.log('onPriceProvideTypeChange', e.detail.value);
    this.setData({
      priceProvideType: e.detail.value
    });
  },
  onAttractingTypeChange: function(e) {
    console.log('onAttractingTypeChange', e);
    console.log('onAttractingTypeChange', e.detail.value);
    this.setData({
      attractingType: e.detail.value
    });
  },
  bindPriceNameInput: function(e) {
    let index = e.currentTarget.dataset['index'];
    this.data.priceList[index].priceName = e.detail.value;
    this.setData({
      priceList: this.data.priceList
    });
  },
  bindPriceNumInput: function(e) {
    let index = e.currentTarget.dataset['index'];
    this.data.priceList[index].priceNum = e.detail.value;
    this.setData({
      priceList: this.data.priceList
    });
  },
  bindPriceContactIdInput: function(e) {
    this.setData({
      priceContactId: e.detail.value
    });
  },
  bindDetailInput: function(e) {
    this.setData({
      detail: e.detail.value
    });
  },
  bindAttractingWeiXinIdInput: function(e) {
    this.setData({
      contactPhoneNum: e.detail.value
    });
  },

  bindProviderNameInput: function(e) {
    this.setData({
      providerName: e.detail.value
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
      multiIndex: this.data.multiIndex
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
      multiIndex: this.data.multiIndex
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
      lotteryTime: timestamp.getTime()
    });
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
  submit: function(e) {
    console.log(this.data);
    let check = this.checkThird();
    if (!check) {
      return;
    }
    let attractingType = 'weixin';
    if (this.data.attractingType == '公众号') {
      attractingType = 'public';
    } else if (this.data.attractingType == '微信号') {
    } else {
      attractingType = 'app';
    }
    let pricemap = this.data.priceList.map(p => {
      return {
        level: this.getPriceLevel(p.index),
        name: p.priceName,
        number: p.priceNum,
        thumbnail: p.priceThumbnail,
        priceType: p.priceType
      };
    });
    console.log(pricemap);
    new IndexService()
      .add({
        priseList: pricemap,
        activity: {
          providerName: this.data.providerName,
          detail: this.data.detail,
          lotteryTime: this.data.lotteryTime,
          attractingType: attractingType,
          contactPhoneNum: this.data.contactPhoneNum,
          priceProvideType: this.data.priceProvideType,
          priceContactId: this.data.priceContactId
        }
      })
      .then(res => {
        console.log(res);
        if (res.data) {
          wx.redirectTo({
            url: '/pages/im/publish/publish'
          });
          // wx.showToast({
          //   title: "发布成功,请等待审核",
          //   icon: 'success',
          //   duration: 1000
          // })
        } else {
          wx.showToast({
            title: '发布失败',
            duration: 1000
          });
        }
      });
  }
});
