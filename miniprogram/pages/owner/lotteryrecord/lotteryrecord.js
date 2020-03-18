//index.js

//index.js
import creatorPage from '../../../utils/create';
import LotteryRecordService from './lotteryrecord.service';
import token from '../../../service/token.service';
import { formatTime } from '../../../utils/util';

const app = getApp();
class Index {
  data = {
    userData: {},
    active: 0,
    list: [{
      id:2,
      name:'data',
      currTime:'04月10日 18:00 自动开奖',
    },{
      id:3,
      name:'data1',
      currTime:'04月10日 18:00 自动开奖'
    }]
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
  _formatListData(list) {
    return list.map(item => {
      item.currTime = formatTime(item.lotteryTime);
      return item;
    });
  }
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });

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
      pageSize: 200,
      pageIndex: 1,
      type:type
    };
    this.ser.getList(`/activity/myLotteryList?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&type=${params.type}`).then(res => {
      this.setData({
        list: this._formatListData(res.data)
      });
    });
  }
  change(ev){
    wx.navigateTo({
      url:`../../index/detail/detail?id=${ev.currentTarget.dataset.id}`
    })
  }
}
Page(creatorPage(Index));
