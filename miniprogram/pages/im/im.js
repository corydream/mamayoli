import IndexService from './im.service';
const indexService = new IndexService()
var date = new Date();
var currentHours = date.getHours();
var currentMinute = date.getMinutes();
Page({
  data: {
    priceList: [{
      priceType: "entity",
      priceName: "",
      priceThumbnail: "../../images/addpic.jpg",
      priceNum: 0,
      index: 0
    }],
    current: 0,
    time: "09:00",
    providerName: "",
    detail: "",
    lotteryTime: 0,
    attractingType: "公众号",
    contactPhoneNum: 0,
    priceContactId: "../../images/addpic.jpg",
    priceProvideType: "address",
    attractingPic: "../../images/addpic.jpg",
    startDate: "请选择日期",
    multiArray: [
      ['今天', '明天', '3-2', '3-3', '3-4', '3-5'],
      [0, 1, 2, 3, 4, 5, 6],
      [0, 10, 20]
    ],
    multiIndex: [0, 0, 0],
  },
  addPrice(e) {
    let len = this.data.priceList.length
    this.data.priceList.push({
      priceType: "entity",
      priceName: "",
      priceThumbnail: "../../images/addpic.jpg",
      priceNum: 0,
      index: len
    })
    this.setData({
      priceList: this.data.priceList
    })
  },
  deletePrice(e) {
    console.log(e)
    let index = e.currentTarget.dataset['index']
    this.data.priceList.splice(index, 1)
    this.setData({
      priceList: this.data.priceList
    })
  },
  bindSwiperChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  nextPage: function(e) {
    console.log(this.data.current)
    console.log(this.data)
    this.setData({
      current: this.data.current < 2 ? this.data.current + 1 : 2
    })
    console.log(e)
  },
  uploadPrice: function(e) {
    let t = this
    let index = e.currentTarget.dataset['index']
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        console.log('chooseImage success, temp path is: ', tempFilePaths[0])
        wx.showLoading({
          title: '上传中',
        })
        indexService
          .sts()
          .then(sts => {
            console.log(sts)
            wx.uploadFile({
              url: 'https://' + sts.data.host,
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                name: tempFilePaths[0],
                key: sts.data.dir + "/${filename}",
                policy: sts.data.policy,
                OSSAccessKeyId: sts.data.accessid,
                success_action_status: "200",
                signature: sts.data.signature,
              },
              success: function(res) {
                console.log(res)
                let picUrl = 'https://' + sts.data.host + '/' + sts.data.dir + tempFilePaths[0].substring(tempFilePaths[0].lastIndexOf('/'))
                console.log('chooseImage success, temp path is: ', picUrl)
                wx.hideLoading()
                wx.showToast({
                  title: "上传成功",
                  icon: 'success',
                  duration: 1000
                })
                t.data.priceList[index].priceThumbnail = picUrl
                t.setData({
                  priceList: t.data.priceList
                })
              },
              fail: function({
                errMsg
              }) {
                console.log('upladImage fail, errMsg is: ', errMsg)
                wx.hideLoading()
                wx.showToast({
                  title: "上传失败",
                  duration: 1000
                })
              },
            })
          })
          .catch(
            e => wx.hideLoading()
          )
      }
    })
  },
  uploadProvideImg: function(e) {
    let t = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        console.log('chooseImage success, temp path is: ', tempFilePaths[0])
        wx.showLoading({
          title: '上传中',
        })
        indexService
          .sts()
          .then(sts => {
            console.log(sts)
            wx.uploadFile({
              url: 'https://' + sts.data.host,
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                name: tempFilePaths[0],
                key: sts.data.dir + "/${filename}",
                policy: sts.data.policy,
                OSSAccessKeyId: sts.data.accessid,
                success_action_status: "200",
                signature: sts.data.signature,
              },
              success: function(res) {
                console.log(res)
                let picUrl = 'https://' + sts.data.host + '/' + sts.data.dir + tempFilePaths[0].substring(tempFilePaths[0].lastIndexOf('/'))
                console.log('chooseImage success, temp path is: ', picUrl)
                wx.hideLoading()
                wx.showToast({
                  title: "上传成功",
                  icon: 'success',
                  duration: 1000
                })
                t.setData({
                  priceContactId: picUrl
                })
              },
              fail: function({
                errMsg
              }) {
                console.log('upladImage fail, errMsg is: ', errMsg)
                wx.hideLoading()
                wx.showToast({
                  title: "上传失败",
                  duration: 1000
                })
              },
            })
          })

      }
    })
  },
  uploadAttractingImg: function(e) {
    let t = this
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(res)
        console.log('chooseImage success, temp path is: ', tempFilePaths[0])
        wx.showLoading({
          title: '上传中',
        })
        indexService
          .sts()
          .then(sts => {
            console.log(sts)
            wx.uploadFile({
              url: 'https://' + sts.data.host,
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                name: tempFilePaths[0],
                key: sts.data.dir + "/${filename}",
                policy: sts.data.policy,
                OSSAccessKeyId: sts.data.accessid,
                success_action_status: "200",
                signature: sts.data.signature,
              },
              success: function(res) {
                console.log(res)
                let picUrl = 'https://' + sts.data.host + '/' + sts.data.dir + tempFilePaths[0].substring(tempFilePaths[0].lastIndexOf('/'))
                console.log('chooseImage success, temp path is: ', picUrl)
                wx.hideLoading()
                wx.showToast({
                  title: "上传成功",
                  icon: 'success',
                  duration: 1000
                })
                t.setData({
                  attractingPic: picUrl
                })
              },
              fail: function({
                errMsg
              }) {
                console.log('upladImage fail, errMsg is: ', errMsg)
                wx.hideLoading()
                wx.showToast({
                  title: "上传失败",
                  duration: 1000
                })
              },
            })
          })

      }
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onPriceTypeChange: function(e) {
    let index = e.currentTarget.dataset['index']
    this.data.priceList[index].priceType = e.detail.value;
    this.setData({
      priceList: this.data.priceList
    })
  },
  onPriceProvideTypeChange: function(e) {
    console.log('onPriceProvideTypeChange', e.detail.value)
    this.setData({
      priceProvideType: e.detail.value
    })
  },
  onAttractingTypeChange: function(e) {
    console.log('onAttractingTypeChange', e)
    console.log('onAttractingTypeChange', e.detail.value)
    this.setData({
      attractingType: e.detail.value
    })
  },
  bindPriceNameInput: function(e) {
    let index = e.currentTarget.dataset['index']
    this.data.priceList[index].priceName = e.detail.value;
    this.setData({
      priceList: this.data.priceList
    })
  },
  bindPriceNumInput: function(e) {
    let index = e.currentTarget.dataset['index']
    this.data.priceList[index].priceNum = e.detail.value;
    this.setData({
      priceList: this.data.priceList
    })
  },
  bindPriceContactIdInput: function(e) {
    this.setData({
      priceContactId: e.detail.value
    })
  },
  bindDetailInput: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  bindAttractingWeiXinIdInput: function(e) {
    this.setData({
      contactPhoneNum: e.detail.value
    })
  },

  bindProviderNameInput: function(e) {
    this.setData({
      providerName: e.detail.value
    })
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
      var md = (date1.getMonth() + 1) + "-" + date1.getDate();
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
    if (monthDay === "今天") {
      month = date.getMonth() + 1;
      day = date.getDate();
      monthDay = month + "月" + day + "日";
    } else if (monthDay === "明天") {
      var date1 = new Date(date);
      date1.setDate(date.getDate() + 1);
      month = (date1.getMonth() + 1);
      day = date1.getDate();

      // monthDay = (date1.getMonth() + 1) + "月" + date1.getDate() + "日";

    } else {
      month = monthDay.split("-")[0]; // 返回月
      day = monthDay.split("-")[1]; // 返回日
      // monthDay = month + "月" + day + "日";
    }
    if (month < date.getMonth() + 1) {
      year = year + 1
    }
    let startDate = month + "月" + day + "日" + " " + hour + ":" + minute;
    let timestamp = new Date(year, month - 1, day, hour, minute)
    this.setData({
      startDate: startDate,
      lotteryTime: timestamp.getTime()
    })
  },
  getPriceLevel(level) {
    switch (level) {
      case 0:
        return "first"
      case 1:
        return "second"
      case 2:
        return "third"
      default:
        return "extra"
    }
  },
  submit: function(e) {
    console.log(this.data)
    let attractingType = 'weixin'
    if (this.data.attractingType == '公众号') {
      attractingType = 'public'
    } else if (this.data.attractingType == '微信号') {} else {
      attractingType = 'app'
    }
    let pricemap = this.data.priceList.map(
      p => {
        return {
          level: this.getPriceLevel(p.index),
          name: p.priceName,
          number: p.priceNum,
          thumbnail: p.priceThumbnail,
          priceType: p.priceType
        }
      }
    )
    console.log(pricemap)
    new IndexService()
      .add({
        priseList: pricemap,
        "activity": {
          "providerName": this.data.providerName,
          "detail": this.data.detail,
          "lotteryTime": 1587350475000,
          "attractingType": attractingType,
          "contactPhoneNum": this.data.contactPhoneNum,
          "priceProvideType": this.data.priceProvideType,
          "priceContactId": this.data.priceContactId
        }
      })
      .then(
        res => {
          console.log(res)
          if (res.data) {
            wx.showToast({
              title: "发布成功,请等待审核",
              icon: 'success',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: "发布失败",
              duration: 1000
            })
          }
        }

      )
  }
})