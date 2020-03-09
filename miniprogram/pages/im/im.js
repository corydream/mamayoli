import IndexService from './im.service';
const indexService = new IndexService()
Page({
  data: {
    current: 0,
    time: "09:00",
    priceName: "",
    priceNum: 0,
    priceThumbnail: "../../images/addpic.jpg",
    priceType: "entity",
    providerName: "",
    detail: "",
    lotteryTime: 0,
    attractingType: "public",
    attractingWeiXinId: "",
    priceContactId: "../../images/addpic.jpg",
    priceProvideType: "address",
    attractingPic: "../../images/addpic.jpg",
  },
  bindSwiperChange: function(e) {
    this.setData({
      current: e.detail.current
    })
  },
  nextPage: function(e) {
    console.log(this.data.current)
    this.setData({
      current: this.data.current < 2 ? this.data.current + 1 : 2
    })
    console.log(e)
  },
  uploadPrice: function(e) {
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
                  priceThumbnail: picUrl
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

  bindProviderNameInput: function(e) {
    this.setData({
      providerName: e.detail.value
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