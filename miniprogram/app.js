App({

  /** 全局store */
  globalData: {
    userInfoData: {},
    _tabbar:false,
    data:{}
  },

  /** 监听函数的对象数组 */
  watchBack: function (value) {  //这里的value 就是 app.js 中 watch 方法中的 set, 返回整个 globalData
    this.setData({
      _tabbar: value._tabbar
    });
  },

  /** 监听列表 */
  watchingKeys: [ ],

  /** 初始化 */
  init: function( ) {
    // 全局数据
  },
  onLaunch: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  },
  /** watch函数 */
  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "data", {  //这里的 data 对应 上面 globalData 中的 data
      configurable: true,
      enumerable: true,
      set: function (value) {  //动态赋值，传递对象，为 globalData 中对应变量赋值
        this._tabbar = value._tabbar;
        method(value);
      },
      get: function () {  //获取全局变量值，直接返回全部
        return this.globalData;
      }
    })
  },

});