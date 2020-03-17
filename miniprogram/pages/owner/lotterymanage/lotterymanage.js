//index.js

//index.js
import creatorPage from '../../../utils/create';
import LotteryManageService from './lotterymanage.service';
import token from '../../../service/token.service';

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
    this.ser = new LotteryManageService();
    console.log(app.globalData);
  }
  onLoad() {
    this.getDataList('running');
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
    this.ser.getList(`/activity/myProvideList?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&type=${params.type}`).then(res => {
      console.log(res);
      this.setData({
        // list
      });
    });
  }
  change(ev){
    wx.navigateTo({
      url:`../../index/detail/detail?id=${ev.currentTarget.dataset.id}`
    })
  }
  goLottery(){
    console.log(123)
    wx.reLaunch({
      url:`../../im/im`
    })
  }
}
Page(creatorPage(Index));
