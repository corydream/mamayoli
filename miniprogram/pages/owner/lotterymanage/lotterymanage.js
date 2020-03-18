//index.js

//index.js
import creatorPage from '../../../utils/create';
import LotteryManageService from './lotterymanage.service';
import token from '../../../service/token.service';
import { formatTime } from '../../../utils/util';

const app = getApp();
class Index {
  data = {
    userData: {},
    active: 0,
    list: [{
      id:2,
      priceName:'data',
      currTime:'04月10日 18:00 自动开奖',
    },{
      id:3,
      priceName:'data1',
      currTime:'04月10日 18:00 自动开奖'
    }]
  };
  constructor() {
    this.ser = new LotteryManageService();
    console.log(app.globalData);
  }
  onLoad() {
    this.getDataList('audit');
  }
  getUserInfo() {
    let _this = this;
  }
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });

    if (event.detail.index === 0) {
      this.getDataList('audit');
    } else if (event.detail.index === 1) {
      this.getDataList('finish');
    } else if(event.detail.index === 2) {
      this.getDataList('finish');
    }else if(event.detail.index === 3) {
      this.getDataList('finish');
    }else if(event.detail.index === 4) {
      this.getDataList('finish');
    }
  }
  getDataList(type) {
    let params = {
      pageSize: 200,
      pageIndex: 1,
      type:type
    };
    this.ser.getList(`/activity/myProvideList?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&type=${params.type}`).then(res => {
      this.setData({
        list: this._formatListData(res.data)
      });
    });
  }
  change(ev){
    // wx.navigateTo({
    //   url:`../../index/detail/detail?id=${ev.currentTarget.dataset.id}`
    // })
  }
  goLottery(){
    wx.reLaunch({
      url:`../../im/im`
    })
  }
  _formatListData(list) {
    return list.map(item => {
      item.currTime = formatTime(item.lotteryTime);
      return item;
    });
  }
}
Page(creatorPage(Index));
