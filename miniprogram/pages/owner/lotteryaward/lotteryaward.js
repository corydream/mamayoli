//index.js

//index.js
import creatorPage from '../../../utils/create';
import LotteryAwardService from './lotteryaward.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    winnerObj: {}, // 中奖者名单列表
    currentId: '2',
  };
  constructor() {
    this.ser = new LotteryAwardService();
  }
  onLoad(option) {
    this.setData({
      currentId: option.id ? option.id : '',
    });
    this.getAwardResult(option.id);
  }
  getAwardResult(id) {
    this.ser
      .getTodo(`/activity/winnerList?id=${id}`)
      .then((res) => {
        this.setData({
          winnerObj: res.data,
        });
      });
  }
  detail(ev){
    wx.navigateTo({
      url:`../lotterydetail/lotterydetail?activityId=${this.data.currentId}&id=${ev.currentTarget.dataset.id}`
    })
  }
}
Page(creatorPage(Index));
