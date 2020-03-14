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
    this.getDataList('running');
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
      this.getDataList('running');
    } else if (event.detail.index === 1) {
      this.getDataList('finish');
    } else {
      this.getDataList('win');
    }
  }
  getDataList(type) {
    let params = {
      pageSize: 20,
      pageIndex: 1,
      type:type
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
