//index.js

//index.js
import creatorPage from '../../utils/create';
import IndexService from './index.service';
const app = getApp()
class Index {
  data = {
    logged: false,
    takeSession: false,
    requestResult: '',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    show: false,
    nav: [{
      id: 0,
      name: '每日精选',
      active: true
    }, {
      id: 1,
      name: '热门福利',
      active: false
    }],
    currentTab: 0,
    mock_list: [{
      advance: '雅诗兰黛',
      name: '雅诗兰黛粉底精华眼霜',
      date: '03月31日',
      time: '18:00'
    }, {
      advance: '雅诗兰黛',
      name: '雅诗兰黛粉底精华眼霜',
      date: '03月31日',
      time: '18:00'
    }]
  }
  constructor() {
    this.ser = new IndexService();
  }
  onLoad() {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://101.132.68.233/user/login',
            data: {
              code: res.code
            },
            header: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'post'
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  onClose() {
    this.setData({ show: false });
  }
  onGotUserInfo(e) {
    // 获取用户信息
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  }
  goMerchant(e) {

  }
  goHeart(e) {
    console.log(this)

    wx.navigateTo({
      url: '../heartCard/heartCard'
    })
  }
  navTab(e) {
    this.data.nav.map(v => v.id === e.currentTarget.dataset.index ? v.active = true : v.active = false)
    this.setData({
      nav: this.data.nav,
      currentTab: e.currentTarget.dataset.index
    })
    console.log(this.data.currentTab);
  }
}
Page(creatorPage(Index));
// const app = getApp()

// Page({
//   data: {
//     userInfo: {},
//     logged: false,
//     takeSession: false,
//     requestResult: '',
//     background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
//     indicatorDots: true,
//     vertical: false,
//     autoplay: true,
//     interval: 2000,
//     duration: 500,
//     show: false,
//     nav: [{
//       id: 0,
//       name: '每日精选',
//       active: true
//     }, {
//       id: 1,
//       name: '热门福利',
//       active: false
//     }],
//     currentTab: 0,
//     mock_list: [{
//       advance: '雅诗兰黛',
//       name: '雅诗兰黛粉底精华眼霜',
//       date: '03月31日',
//       time: '18:00'
//     }, {
//       advance: '雅诗兰黛',
//       name: '雅诗兰黛粉底精华眼霜',
//       date: '03月31日',
//       time: '18:00'
//     }]
//   },
//   onload(){

//   }
//   // // 上传图片
//   // doUpload: function () {
//   //   // 选择图片
//   //   wx.chooseImage({
//   //     count: 1,
//   //     sizeType: ['compressed'],
//   //     sourceType: ['album', 'camera'],
//   //     success: function (res) {

//   //       wx.showLoading({
//   //         title: '上传中',
//   //       })

//   //       const filePath = res.tempFilePaths[0]

//   //       // 上传图片
//   //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
//   //       wx.cloud.uploadFile({
//   //         cloudPath,
//   //         filePath,
//   //         success: res => {
//   //           console.log('[上传文件] 成功：', res)

//   //           app.globalData.fileID = res.fileID
//   //           app.globalData.cloudPath = cloudPath
//   //           app.globalData.imagePath = filePath

//   //           wx.navigateTo({
//   //             url: '../storageConsole/storageConsole'
//   //           })
//   //         },
//   //         fail: e => {
//   //           console.error('[上传文件] 失败：', e)
//   //           wx.showToast({
//   //             icon: 'none',
//   //             title: '上传失败',
//   //           })
//   //         },
//   //         complete: () => {
//   //           wx.hideLoading()
//   //         }
//   //       })

//   //     },
//   //     fail: e => {
//   //       console.error(e)
//   //     }
//   //   })
//   // },

// })
