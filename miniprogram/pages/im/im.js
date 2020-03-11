import IndexService from './im.service';
const indexService = new IndexService()
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
    attractingWeiXinId: "",
    priceContactId: "../../images/addpic.jpg",
    priceProvideType: "address",
    attractingPic: "../../images/addpic.jpg",
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
    // var items = this.data.priceTypeItems;
    // for (var i = 0; i < items.length; ++i) {
    //   items[i].checked = items[i].value == e.detail.value
    // }
    // console.log('onPriceTypeChange', e.detail.value)
    // this.setData({
    //   priceType: e.detail.value,
    //   priceTypeItems: items
    // })
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
    let attractingType = 'weixin'
    if (this.data.attractingType == '公众号') {
      attractingType = 'public'
    } else if (this.data.attractingType == '微信号') {} else {
      attractingType = 'app'
    }
    let pricemap = this.data.priceList.map(
      p => {
        return {
          level: p.index,
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