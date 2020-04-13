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
    list: []
  };
  constructor() {
    this.ser = new LotteryManageService();
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
      this.getDataList('auditFailed');
    } else if(event.detail.index === 2) {
      this.getDataList('progress');
    }else if(event.detail.index === 3) {
      this.getDataList('done');
    }else if(event.detail.index === 4) {
      this.getDataList('finish');
    }
  }
  getDataList(type) {
    let params = {
      pageSize: 200,
      pageIndex: 1,
      status:type
    };
    this.ser.getList(`/activity/myProvideList?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&status=${params.status}`).then(res => {
        if(res && res.data){
          this.setData({
            list: this._formatListData(res.data)
          });
        }
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
