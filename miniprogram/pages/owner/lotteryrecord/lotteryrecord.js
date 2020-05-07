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
    currentTab: 0,
    list: [
      {
        id: 2,
        name: 'data',
        currTime: '04月10日 18:00 自动开奖',
      },
      {
        id: 3,
        name: 'data1',
        currTime: '04月10日 18:00 自动开奖',
      },
    ],
    nav: [
      {
        id: 0,
        name: '待开奖',
        active: true,
      },
      {
        id: 1,
        name: '中奖记录',
        active: false,
      },
    ],
  };
  constructor() {
    this.ser = new LotteryRecordService();
  }
  onLoad() {
    this.getDataList('running');
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
    if (e.currentTarget.dataset.index){
      this.getDataList('win');
    }else{
      this.getDataList('running');
    }
  }
  _formatListData(list) {
    return list.map((item) => {
      item.currTime = formatTime(item.lotteryTime);
      return item;
    });
  }
  getDataList(type) {
    let params = {
      pageSize: 200,
      pageIndex: 1,
      type: type,
    };
    this.ser
      .getList(
        `/activity/myLotteryList?pageSize=${params.pageSize}&pageIndex=${params.pageIndex}&type=${params.type}`
      )
      .then((res) => {
        this.setData({
          list: this._formatListData(res.data),
        });
      });
  }
  change(ev) {
    wx.navigateTo({
      url: `../../index/detail/detail?id=${ev.currentTarget.dataset.id}`,
    });
  }
}
Page(creatorPage(Index));
