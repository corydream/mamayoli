import DetailService from './detail.service';
import creatorPage from '../../../utils/create';
import { formatTime } from '../../../utils/util';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
import token from '../../../service/token.service';

const app = getApp();

class Detail {
  data = {
    list: [],
    isUserInfo: false,
    showLoginLayer: false,
    hasMore: true,
    page_index: 1,
    total_count: 0,
    currentId: '247',
    showNotHeart: false, // 心愿卡用完
    show: false, // 显示弹窗
    currInfos: {},
    awardList: [],
    awardObj:{},
    activeResult: '',
    addrText: '点击添加配送信息',
    getWinner: false, //是否中奖
    getWinnerLayer: false, // 是否中奖弹窗
    clickLucky: false,
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 5000,
    showAddr: false,
    duration: 500,
    btnLight: false,
    addrId: '',
    winnerObj: {}, // 中奖者名单列表
    showShare: false, // 分享弹窗
    priceList: [],
    addrObj:{}
  };
  ser = null;
  constructor() {
    this.ser = new DetailService();
  }
  onLoad(options) {
    let _this = this;
    if (options && options.scene) {
      _this.setData({
        currentId: options.scene,
      });
    } else if (options && options.id) {
      _this.setData({
        currentId: options.id ? options.id : '247',
      });
    }
    this.getPriceList();
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          _this.getAddr(options);
          _this.getAwardList();
          _this.setData({
            isUserInfo: true,
          });
          _this.getInfo('/activity/detail');
        }
      },
      fail() {
        _this.setData({
          isUserInfo: false,
        });
        _this.getInfo('/activity/detail2');
      },
    });
  }
  // 自定义转发样式
  onShareAppMessage(e) {
    this.getShare();
    return {
      title: `${this.data.currInfos.providerName} 赞助`,
      path: `/pages/index/detail/detail?id=${this.data.currentId}`,
      imageUrl: this.data.currInfos.thumbnail,
    };
  }
  getPriceList(id) {
    this.ser
      .getTodo(`/activity/priceList?id=${id ? id : this.data.currentId}`)
      .then((res) => {
        console.log(res);
        this.setData({
          priceList: res.data,
        });
      });
  }
  getLogin(obj, type) {
    let _this = this;
    const params = {
      nickName: obj.nickName,
      avatarUrl: obj.avatarUrl,
    };
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          _this.ser.login({ code: res.code }).then((result) => {
            token.set(result.data);
            // 更新用户信息
            _this.ser.updateInfo(params);
            _this.getInfo('/activity/detail');
            _this.getAwardList();
            // 获取用户信息
            if (type && type.type == 'heart') {
              _this.checkHeart();
            } else if (type && type.type == 'webview') {
              _this.goView();
            } else if (type && type.type == 'find') {
              _this.findLotteryRes();
            }
          });
        }
      },
    });
  }
  // 获取领奖地址
  getAddr(options) {
    if (options && options.addrId) {
      this.setData({
        showAddr: true,
      });
      this.ser.getTodo(`/address/get?id=${options.addrId}`).then((res) => {
        if (res.data) {
          const addr = res.data;
          this.setData({
            btnLight: true,
            addrId: options.addrId,
            addrText: `${addr.province}  ${addr.city}  ${addr.area} ${addr.detail}`,
          });
        }
      });
    }
  }
  // 确认领奖
  submitLottery() {
    if (!this.data.btnLight) {
      return false;
    }
    this.ser
      .getTodo(
        `/activity/confirmAddress?activityId=${this.data.currentId}&addressId=${this.data.addrId}`
      )
      .then((res) => {
        if (res.data) {
          wx.navigateTo({
            url: `../submit/submit?id=${this.data.currentId}`,
          });
        }
      });
  }
  // 显示地址信息
  showAddr() {
    this.setData({
      showAddr: true,
    });
  }
  // 去领奖
  goLottery() {
    wx.navigateTo({
      url: `../../owner/address/address?productId=${this.data.currentId}`,
    });
  }
  lucky() {
    let _this = this;
    // if (
    //   _this.data.currInfos.status == 'audit' ||
    //   _this.data.currInfos.status == 'auditFailed'
    // ) {
    //   Toast('预览模式，无法抽奖哦');
    //   return;
    // }
    console.log(_this.data.currInfos);
    // const reg =抽奖模版 ｜
    if (_this.data.currInfos.providerName.indexOf('抽奖模板') > -1) {
      Toast('模板不能抽奖');
      return;
    }
    wx.requestSubscribeMessage({
      tmplIds: ['FIVR7Amk_8EBLPSvBhO4K0ZupxHkfts7YfsvRhv8ATA'],
      success(res) {
        if (res['FIVR7Amk_8EBLPSvBhO4K0ZupxHkfts7YfsvRhv8ATA'] == 'accept') {
          _this.checkLottery();
          _this.getInfo('/activity/detail');
          _this.setData({
            show: true,
          });
        }
      },
    });
  }
  checkLottery() {
    let _this = this;
    _this.ser
      .getTodo(`/activity/lottery?id=${_this.data.currentId}`)
      .then((res) => {
        if (res.data) {
          _this.setData({
            clickLucky: true,
          });
        } else if (res.code == -4) {
          _this.setData({
            showNotHeart: true,
          });
        } else {
          Toast(res.msg);
        }
        _this.setData({
          activeResult: res.code,
        });
      });
  }
  close() {
    this.setData({
      show: false,
    });
  }
  // 关闭弹窗
  closeWinnerLayer() {
    this.setData({
      getWinnerLayer: false,
    });
  }
  // 查看是否中奖
  findLotteryRes(res) {
    if (
      this.data.currInfos.status === 'done' ||
      (res && res.status === 'done')
    ) {
      this.setData({
        getWinnerLayer: true,
      });
    }
    this.ser
      .getTodo(`/activity/isWinner?id=${this.data.currentId}`)
      .then((res) => {
        if (res.data) {
          this.getAddress();
          this.setData({
            getWinner: true,
            winnerObj: res.data
          });
        } else {
          this.setData({
            getWinner: false,
          });
          this.getAwardResult();
        }
      });
  }
  // 获取下一页
  async getShare() {
    const res = await this.ser.getTodo(
      `/user/share?action=activity&id=${this.data.currentId}`
    );
  }
  // 获取默认收货地址
  async getAddress(){
    const res = await this.ser.getTodo('/address/list');
    if(res.data&& res.data.length>0){
      const obj = res.data.filter(v=>v.isFirst == true)[0];
      this.setData({
        btnLight: true,
        addrId: obj.id,
        addrText: `${obj.province}  ${obj.city}  ${obj.area} ${obj.detail}`,
      })
    } 
  }
  // onReachBottom() {
  //   this.loadData();
  // }
  onPullDownRefresh(e) {
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    //模拟加载
    this.loadData();
    wx.hideNavigationBarLoading(); //完成停止加载
    wx.stopPullDownRefresh(); //停止下拉刷新
  }
  // 上滑刷新
  loadData() {
    this.ser.getTodo(`/activity/next?id=${this.data.currentId}`).then((res) => {
      res.data.currTime = formatTime(res.data.lotteryTime);
      this.setData({
        currInfos: res.data,
        currentId: res.data.id,
        clickLucky: false,
      });
      this.data.currentId = res.data.id;
      this.getAwardList(res.data.id);
      this.getPriceList(res.data.id);
      this.setData({ show: false });
    });
  }
  // 点击推广的类别
  attractType(e) {
    // 打开小程序
    wx.navigateToMiniProgram({
      appId:
        this.data.currInfos.providerName == '美盈严选'
          ? 'wx33937497a1a8a074'
          : this.data.currInfos.attractingAppId,
      path: this.data.currInfos.attractingAppPath,
      extraData: {
        id: this.data.currInfos.id,
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      },
    });
  }
  getInfo(url) {
    this.ser.getTodo(`${url}?id=${this.data.currentId}`).then((res) => {
      if (res.code === -1) {
        Toast('该活动已下架，解释权归平台所有');
        return;
      }
      if (res.data.addressInfo && res.data.addressInfo.id) {
        wx.navigateTo({
          url: `../submit/submit?id=${this.data.currentId}`,
        });
      }
      res.data.currTime = formatTime(res.data.lotteryTime);
      res.data.lotteryList = res.data.lotteryList.slice(0, 5);
      this.setData({
        currInfos: res.data,
        clickLucky: false,
      });
      this.findLotteryRes(res.data);
    });
  }
  getAwardList(ids) {
    this.ser
      .getTodo(`/activity/priceList?id=${ids ? ids : this.data.currentId}`)
      .then((res) => {
        res.data.map((v) => {
          if (v.level == 'first') {
            v.levelName = '一等奖';
          } else if (v.level == 'second') {
            v.levelName = '二等奖';
          } else {
            v.levelName = '三等奖';
          }
        });
        this.setData({
          awardList: res.data,
        });
      });
  }
  // 获得中奖结果
  getAwardResult() {
    this.ser
      .getTodo(`/activity/winnerList?id=${this.data.currentId}`)
      .then((res) => {
        this.setData({
          winnerObj: res.data,
        });
      });
  }

  // 授权登录
  onGotUserInfo(e, type) {
    // 获取用户信息
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    });
    this.setData({
      isUserInfo: true,
    });
    this.getLogin(e.detail.userInfo, type);
  }
  // 打开
  async getUserInfoData(e) {
    if (e.detail.userInfo) {
      this.onGotUserInfo(e, e.currentTarget.dataset);
    }
  }

  // 打开分享弹窗
  shareOpen() {
    this.setData({
      showShare: true,
    });
  }
  shareClose() {
    this.setData({
      showShare: false,
    });
  }
  // 去生成分享图页面
  goView() {
    wx.navigateTo({
      url: `../../webview/webview?id=${this.data.currentId}`,
    });
  }
}

Page(creatorPage(Detail));
