import DetailService from './detail.service';
import creatorPage from '../../../utils/create';
import { formatTime } from '../../../utils/util';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
class Detail {
  data = {
    list: [],
    hasMore: true,
    page_index: 1,
    total_count: 0,
    currentId: '2',
    show:false, // 显示弹窗
    currInfos: {},
    awardList: [],
    activeResult: '',
    getWinner: false, //是否中奖
    getWinnerLayer: false, // 是否中奖弹窗
    clickLucky: false,
    winnerObj: {

    } // 中奖者名单列表
  };
  ser = null;
  constructor() {
    this.ser = new DetailService();
  }
  onLoad(options) {
    this.currentId = options.id ? options.id : '193';
    this.getAwardList();
    this.getInfo();
  }
  // onShow(){
  //   this.checkLottery();
  // }
  
  // 去领奖
  goLottery() {
    wx.navigateTo({
      url: '../../owner/address/address'
    });
  }
  lucky() {
    let _this = this;
    wx.requestSubscribeMessage({
      tmplIds: ['FIVR7Amk_8EBLPSvBhO4K0ZupxHkfts7YfsvRhv8ATA'],
      success(res) {
        _this.checkLottery();
        _this.setData({
          show:true
        })
      }
    });
  }
  checkLottery() {
    let _this = this;
    _this.ser.getTodo(`/activity/lottery?id=${_this.currentId}`).then(res => {
      if (res.data) {
        _this.setData({
          clickLucky: true
        });
      }
      _this.setData({
        activeResult: res.code
      });
    });
  }
  close(){
    this.setData({
      show: false
    }); 
  }
  // 关闭弹窗
  closeWinnerLayer() {
    this.setData({
      getWinnerLayer: false
    });
  }
  // 查看是否中奖
  findLotteryRes(e) { 
    this.ser.getTodo(`/activity/isWinner?id=${this.currentId}`).then(res => {
      console.log(res)
      if (res.data) {
        this.setData({
          getWinner: true,
        });
      } else {
        this.setData({
          getWinner: false,
        });
        this.getAwardResult();
      }
      if(this.data.currInfos.status === 'done'){
        this.setData({
          getWinnerLayer: true
        });
      }
    });
  }
  // 获取下一页

  // 自定义转发样式
  onShareAppMessage(e) {
    return {
      title: 'MaMa有礼',
      path: `/pages/index/detail/detail?id=${this.currentId}`,
      imageUrl: this.data.currInfos.thumbnail
    };
  }
  onReachBottom() {
    console.log(e);
  }
  onPullDownRefresh(e) {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    //模拟加载
    this.loadData();
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  }
  // 上滑刷新
  loadData(){
    this.ser.getTodo(`/activity/next?id=${this.currentId}`).then(res => {
      res.data.currTime = formatTime(res.data.lotteryTime);
      // console.log(res.data)
      this.setData({
        currInfos: res.data,
        currentId: res.data.id,
        clickLucky: false
      });
      this.currentId = res.data.id;
      // this.lucky(res.data.id);
      this.getAwardList(res.data.id);
      this.setData({show:false})
    });
  }
  // 点击推广的类别
  attractType(e) {
    // 打开小程序
    wx.navigateToMiniProgram({
      appId: this.data.currInfos.providerName == '美盈严选'?"wx33937497a1a8a074":this.data.currInfos.attractingAppId,
      path: this.data.currInfos.attractingAppPath,
      extraData: {
        id: this.data.currInfos.id
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    });
  }
  getInfo() {
    this.ser.getTodo(`/activity/detail?id=${this.currentId}`).then(res => {
      res.data.currTime = formatTime(res.data.lotteryTime);
      res.data.lotteryList = res.data.lotteryList.slice(0,5);
      this.setData({
        currInfos: res.data,
        clickLucky: false
      });
    });
    this.findLotteryRes();
  }
  getAwardList(ids) {
    this.ser
      .getTodo(`/activity/priceList?id=${ids ? ids : this.currentId}`)
      .then(res => {
        res.data.map(v => {
          if (v.level == 'first') {
            v.levelName = '一等奖';
          } else if (v.level == 'second') {
            v.levelName = '二等奖';
          } else {
            v.levelName = '三等奖';
          }
        });
        console.log(res.data)
        this.setData({
          awardList: res.data
        });
      });
  }
  // 获得中奖结果
  getAwardResult() {
    this.ser.getTodo(`/activity/winnerList?id=${this.currentId}`).then(res => {
      this.setData({
        winnerObj: res.data
      })
    });
  }
}

Page(creatorPage(Detail));
