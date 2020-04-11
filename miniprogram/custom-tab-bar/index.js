let app = getApp();
Component({
  data: {
    tabbar:false,
    selected: 0,
    color: "#666666",
    selectedColor: "#f66400",
    list: [{
        "pagePath": "/pages/index/index",
        "text": "抽奖",
        "iconPath": "/images/icon_home_gray.png",
        "selectedIconPath": "/images/icon_home_light.png"
      },
      {
        "pagePath": "/pages/blank/blank",
        "text": "发起抽奖",
        "iconPath": "/images/icon_initiate_gray.png",
        "selectedIconPath": "/images/icon_initiate_light.png"
      },
      {
        "pagePath": "/pages/owner/owner",
        "text": "我的",
        "iconPath": "/images/icon_owner_gray.png",
        "selectedIconPath": "/images/icon_owner_light.png"
      }
    ]
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      console.log(this.data.tabbar)
    },
    hide: function () {
      console.log(this.data.tabbar)
     },
    resize: function () { },
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      this.setData({
        selected: data.index
      })
      if (data.index == 1) {
        wx.navigateTo({
          url: '/pages/im/im'
        }) 
        return
      }
      const url = data.path
      wx.switchTab({
        url
      })
    }
  }
})