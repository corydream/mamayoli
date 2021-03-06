//index.js

//index.js
import creatorPage from '../../utils/create';
import LotteryRecordService from './lotteryrecord.service';
import token from '../../service/token.service';
import { formatTime } from '../../utils/util';

const app = getApp()
class Index {
  data = {
    userData:{}
  }
  constructor() {
    this.ser = new LotteryRecordService();
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
          _this.setData({
            userData:res.data
          })
        }
      }
    })
  }
  
}
Page(creatorPage(Index));
