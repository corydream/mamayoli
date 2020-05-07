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
    currentTab: 0,
    list: [],
    nav: [
      {
        id: 0,
        name: '待开奖',
        active: true,
      },
      {
        id: 1,
        name: '已结束',
        active: false,
      },
    ],
  };
  constructor() {
    this.ser = new LotteryManageService();
  }
  onLoad() {
    this.getDataList('progress');
  }
  getUserInfo() {
    let _this = this;
  }
  async navTab(e) {
    this.data.nav.map((v) =>
      v.id === e.currentTarget.dataset.index
        ? (v.active = true)
        : (v.active = false)
    );
    this.setData({
      nav: this.data.nav,
      currentTab: e.currentTarget.dataset.index,
    });
    if (e.currentTarget.dataset.index) {
      this.getDataList('progress');
    } else {
      this.getDataList('done');
    }
  }
  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.index + 1}`,
    //   icon: 'none'
    // });
    this.setData({
      list: [],
    });
    if (event.detail.index === 0) {
      //   this.getDataList('audit');
      // } else if (event.detail.index === 1) {
      //   this.getDataList('auditFailed');
      this.getDataList('progress');
      // } else if(event.detail.index === 2) {
      //   this.getDataList('progress');
    } else if (event.detail.index === 1) {
      this.getDataList('done');
    }
  }
  getDataList(type) {
    let params = {
      pageSize: 200,
      pageIndex: 1,
      status: type,
    };
    this.ser
      .getList(
        `/activity/myProvideList?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&status=${params.status}`
      )
      .then((res) => {
        if (res && res.data) {
          this.setData({
            list: this._formatListData(res.data),
          });
        }
      });
  }
  linkDetail(ev) {
    wx.navigateTo({
      url: `../../index/detail/detail?id=${ev.currentTarget.dataset.id}`,
    });
  }
  linkaward(ev) {
    wx.navigateTo({
      url: `../lotteryaward/lotteryaward?id=${ev.currentTarget.dataset.id}`,
    });
  }
  goLottery() {
    wx.reLaunch({
      url: `../../im/im`,
    });
  }
  _formatListData(list) {
    return list.map((item) => {
      item.currTime = formatTime(item.lotteryTime);
      return item;
    });
  }
}
Page(creatorPage(Index));
