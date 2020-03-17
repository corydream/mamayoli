//index.js

//index.js
import creatorPage from '../../utils/create';
import OwnerService from './owner.service';
import token from '../../service/token.service';
import { formatTime } from '../../utils/util';

const app = getApp()
class Index {
  data = {
    userData:{}
  }
  constructor() {
    this.ser = new OwnerService();
    console.log(app.globalData)
  }
  onLoad() {
    this.getUserInfo();
  }
  getUserInfo(){
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          console.log(res.data)
          _this.setData({
            userData:res.data
          })
        }
      }
    })
  }
  record(){
    wx.navigateTo({
      url:'./lotteryrecord/lotteryrecord'
    })
  }
  setting(){
    wx.navigateTo({
      url:'./config/config'
    })
  }
  center(){

  }
  
}
Page(creatorPage(Index));
