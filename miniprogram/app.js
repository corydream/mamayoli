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