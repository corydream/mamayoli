//index.js

//index.js
import creatorPage from '../../../utils/create';
import LotteryRecordService from './lotteryrecord.service';
import token from '../../../service/token.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    active: 0,
    list: []
  };
  constructor() {
    this.ser = new LotteryRecordService();
    console.log(app.globalData);
  }
  onLoad() {
    this.getDataList();
  }
  getUserInfo() {
    let _this = this;
  }
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });

    if (event.detail.index === 0) {
    } else if (event.detail.index === 1) {
    } else {
    }
  }
  getDataList() {
    let params = {
      pageSize: 20,
      pageNum: 1
    };
    this.ser.getList(params).then(res => {
      console.log(res);
      this.setData({
        // list
      });
    });
  }
}
Page(creatorPage(Index));
