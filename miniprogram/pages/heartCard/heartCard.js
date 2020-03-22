//index.js
import creatorPage from '../../utils/create';
import heartCardService from './heartCard.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    active: 0,
    cards:0
  };
  constructor() {
    this.ser = new heartCardService();
  }
  onLoad(options) {
    console.log(options)
    if (app.globalData.userInfoData.openId) {
      this.setData({
        openId: app.globalData.userInfoData.openId,
        cards: options.num ? options.num : cards
      });
    }
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.showShareMenu();
  }
  gohome() {
    wx.switchTab({
      url: '../index/index'
    });
  }
  async getShare(){
      const res = await this.ser.getTodo(`/user/share?action=app`);
    //  /user/share
  }
  onShareAppMessage(res) {
    this.getShare();
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: '妈妈酉礼',
      path: '/pages/heartCard/heartCard',
      imageUrl: '../../images/share-image.jpg'
    };
  }
}
Page(creatorPage(Index));
