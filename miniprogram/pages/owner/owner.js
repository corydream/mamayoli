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
  }
  getData(){
    this.ser.getUserInfo('/user/getUserInfo').then(resGetUserInfo => {
      this.setData({
        dataObj: resGetUserInfo.data
      });
      // this.getList();
    });
    // this.setData({
    //   dataObj:app.globalData.userInfoData
    // })
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
