//index.js

//index.js
import creatorPage from '../../utils/create';
import IndexService from './index.service';
import token from '../../service/token.service';
import { formatTime } from '../../utils/util';

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
    ser: null,
    showLoginLayer: false,
    userData: {},
    bannerList: [],
    dailyList: [],
    hotList: [],
    currentList: [],
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
    let _this = this;
    // 获取用户登录信息
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          _this.setData({ showLoginLayer: false });
          _this.getLogin(res.data);
        }
      },
      fail() {
        _this.setData({
          showLoginLayer: true
        })
      }
    })
  }
  // 跳转详情页
  goDetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: `./detail/detail?id=${e.currentTarget.dataset.id}`
    })
  }
  // 获取登陆
  getLogin(obj) {
    console.log(obj)
    let _this = this;
    const params = {
      nickName: obj.nickName,
      avatarUrl: obj.avatarUrl
    }
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          _this.ser.login({ code: res.code }).then(result => {
            token.set(result.data)
            // 更新用户信息
            _this.ser.updateInfo(params);
            // 获取用户信息
            _this.ser.getUserInfo('/user/getUserInfo').then(resGetUserInfo => {
              _this.setData({
                userData: resGetUserInfo.data
              })
              app.globalData.userInfoData = resGetUserInfo.data;
              // 调用商品list
              _this.getList();
            })
          })
        }
      }
    })
  }
  onClose() {
    this.setData({ show: false });
  }
  async getList() {
    const params = {
      pageSize: 15,
      pageIndex: 1
    }
    // banner 列表
    const banner = await this.ser.list(Object.assign(params, { 'type': 'banner' }));

    this.setData({
      bannerList: this._formatListData(banner.data)
    })

    //每日精选列表 
    const daily = await this.ser.list(Object.assign(params, { 'type': 'dailySelection' }));

    this.dailyList = this._formatListData(daily.data);

    // 热门福利
    const hot = await this.ser.list(Object.assign(params, { 'type': 'hot' }));

    this.hotList = this._formatListData(hot.data);

    this.setData({
      currentList: this.dailyList
    })
  }
  // 时间转化
  _formatListData(list) {
    return list.map((item) => {
      item.currTime = formatTime(item.lotteryTime);
      return item;
    })
  }
  onGotUserInfo(e) {
    this.setData({
      showLoginLayer: false
    })
    // 获取用户信息
    wx.setStorage({
      key: "userInfo",
      data: e.detail.userInfo
    })
    this.getLogin(e.detail.userInfo);
  }
  // 合作商户
  goMerchant(e) {

  }
  closeHomeLoginLayout() {
    this.setData({ showLoginLayer: false });
  }
  goHeart() {
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
    if (e.currentTarget.dataset.index) {
      this.setData({
        currentList: this.hotList
      })
    } else {
      this.setData({
        currentList: this.dailyList
      })
    }
  }
}
Page(creatorPage(Index));
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
