import IndexService from './im.service';

Page({
  data: {
    current: 0,
    time: "09:00",
    priceName: "",
    priceNum: 0,
    priceThumbnail: "",
    priceType: "entity",
    providerName: "",
    detail: "",
    lotteryTime: 0,
    attractingType: "public",
    attractingWeiXinId: "",
    priceContactId: "",
    priceProvideType: "address",

    // "priseList": [{
    //   "level": "first",
    //   "name": "elizabeth arden",
    //   "number": 1,
    //   "thumbnail": "https://mamayouli.oss-cn-hangzhou.aliyuncs.com/price/1.jpg",
    //   "priceType": "entity"
    // }],
    // "activity": {
    //   "banner": "https://mamayouli.oss-cn-hangzhou.aliyuncs.com/price/1.jpg",
    //   "providerName": "yuyue",
    //   "detail": "香水",
    //   "lotteryTime": 1587350475000,
    //   "attractingType": "weixin",
    //   "attractingWeiXinId": "Data_lab",
    //   "providerWeiXinId": "1235",
    //   "providerWeiXinDetail": "aabbcc",
    //   "priceProvideType": "address"
    // }
  },
  nextPage: function(e) {
    this.setData({
      current: this.data.current + 1
    })
    console.log(e)
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onPriceTypeChange: function(e) {
    console.log('onPriceTypeChange', e.detail.value)
    this.setData({
      priceType: e.detail.value
    })
  },
  onPriceProvideTypeChange: function(e) {
    console.log('onPriceProvideTypeChange', e.detail.value)
    this.setData({
      priceProvideType: e.detail.value
    })
  },
  onAttractingTypeChange: function(e) {
    console.log('onAttractingTypeChange', e.detail.value)
    this.setData({
      attractingType: e.detail.value
    })
  },
  bindPriceNameInput: function(e) {
    this.setData({
      priceName: e.detail.value
    })
  },
  bindPriceNumInput: function(e) {
    this.setData({
      priceNum: e.detail.value
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
      attractingWeiXinId: e.detail.value
    })
  },
  submit: function(e) {
    console.log(this.data)
    new IndexService()
      .add({
        priseList: [{
          "level": "first",
          "name": this.data.priceName,
          "number": this.data.priceNum,
          "thumbnail": this.data.priceThumbnail,
          "priceType": this.data.priceType
        }],
        "activity": {
          "providerName": this.data.providerName,
          "detail": this.data.detail,
          "lotteryTime": 1587350475000,
          "attractingType": this.data.attractingType,
          "attractingWeiXinId": this.data.attractingWeiXinId,
          "priceProvideType": this.data.priceProvideType,
          "priceContactId": this.data.priceContactId
        }
      })
      .then(
        res => console.log(res)
      )
  }
})