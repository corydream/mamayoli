//index.js

//index.js
import creatorPage from '../../../utils/create';
import ShareService from './share.service';
import token from '../../../service/token.service';

const app = getApp();
class Index {
  data = {
    userData: {},
  };
  constructor() {
    this.ser = new ShareService();
    console.log(app.globalData);
  }
  onLoad() {
    this.getUserInfo();
    // this.getImg();
  }
  getImg() {
    wx.canvasToTempFilePath({
      x: 100,
      y: 200,
      width: 50,
      height: 50,
      destWidth: 100,
      destHeight: 100,
      canvasId: 'myCanvas',
      success(res) {
        console.log(res)
        console.log(res.tempFilePath);
      },
    });
  }
  getUserInfo() {
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          console.log(res.data);
          _this.setData({
            userData: res.data,
          });
        }
      },
    });
  }
}
Page(creatorPage(Index));
