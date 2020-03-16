Component({
  data: {
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
  attached() {},
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.currentTarget.dataset
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
      this.setData({
        selected: data.index
      })
    }
  }
})