//index.js

//index.js
import creatorPage from '../../utils/create';
import OwnerService from './owner.service';
import token from '../../service/token.service';
import { formatTime } from '../../utils/util';

const app = getApp()
class Index {
  data = {
    userData:{},
    dataObj:{}
  }
  constructor() {
    this.ser = new OwnerService();
    
  }
  onLoad() {
    this.getUserInfo();
    this.getData();
  }
  onShow(){
    this.getData();
    console.log(app.globalData.userInfoData)
//     lotteryTimes: 36
// nickName: "DDDDDDesignBuff"
// openId: "oF6sp41J2F_dPezCL8a5S7-KOxbY"
// phoneNum: null
// province: null
// realName: null
// status: null
// totalWishCard: 36
// unionId: null
// winTimes: 14
  }
  getData(){
    this.setData({
      dataObj:app.globalData.userInfoData
    })
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
    wx.navigateTo({
      url:'./center/center'
    })
  }
  
}
Page(creatorPage(Index));
