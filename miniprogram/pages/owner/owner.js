//index.js

//index.js
import creatorPage from '../../utils/create';
import OwnerService from './owner.service';
import token from '../../service/token.service';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

const app = getApp();
class Index {
  data = {
    isAddress: false,
    isLayoutPopup: false,
    userData: {
      avatarUrl: '../../images/0419/avatar.png',
      nickName: '登陆/注册',
    },
    dataObj: {
      totalWishCard: 0,
      lotteryTimes: 0,
      winTimes: 0,
    },
    isLogin: true,
    isUsers: true,
  };
  constructor() {
    this.ser = new OwnerService();
  }
  onLoad() {
    this.getUserInfoSucc();
  }
  onShow() {
    this.getUserInfoSucc();
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2,
      });
    }
  }
  // 获得领奖信息
  goAddressInfo(){
    if(this.data.isAddress){
      return 
    }
    wx.navigateTo({
      url: './address/add/add',
    })
  }
  async getAddr() {
    const res = await this.ser.getTodo('/address/list');
    console.log(res);
    if(res.data && res.data.length>0){
      this.setData({
        isAddress: true
      })
    }else{
      this.setData({
        isAddress: false
      })
    }

  }
  loginBtn() {
    this.setData({
      isLogin: false,
    });
  }
  unloginBtn() {
    this.setData({
      isLogin: true,
    });
  }
  coop() {
    wx.navigateTo({
      url: '../coopheader/coopheader',
    });
  }
  getData() {
    this.ser.getUserInfo('/user/getUserInfo').then((resGetUserInfo) => {
      this.setData({
        isLogin: true,
        isUsers: true,
        dataObj: resGetUserInfo.data,
      });
      // this.getList();
    });
    // this.setData({
    //   dataObj:app.globalData.userInfoData
    // })
  }
  getUserInfoSucc() {
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          _this.getData();
          _this.setData({
            isLogin: true,
            isUsers: true,
            userData: res.data,
          });
        }
      },
      fail(err) {
        _this.setData({
          isLogin: false,
          isUsers: false,
        });
      },
    });
  }
  // 授权登录
  onGotUserInfo(e) {
    // 获取用户信息
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    });
    this.getLogin(e.detail.userInfo);
  }
  // 打开
  async getUserInfoData(e) {
    if (e.detail.userInfo) {
      this.onGotUserInfo(e);
    }
  }
  // 登陆
  getLogin(obj) {
    let _this = this;
    const params = {
      nickName: obj.nickName,
      avatarUrl: obj.avatarUrl,
    };
    _this.setData({
      userData: params,
      isLayoutPopup: true,
    });
    setTimeout(() => {
      _this.setData({
        isLayoutPopup: false,
      });
    }, 3000);
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          _this.ser.login({ code: res.code }).then((result) => {
            token.set(result.data);
            // 更新用户信息
            _this.ser.updateInfo(params);
            _this.getAddr();
            _this.getData();
            // 获取用户信息
          });
        }
      },
    });
  }
  // 商城
  shop() {
    Toast('此模块正在研发中');
  }
  // 跳转页面
  record() {
    wx.navigateTo({
      url: './lotteryrecord/lotteryrecord',
    });
  }
  launch(){
    wx.navigateTo({
      url: './lotterymanage/lotterymanage'
    });
  }
  setting() {
    wx.navigateTo({
      url: './config/config',
    });
  }
  center() {
    wx.navigateTo({
      url: './center/center',
    });
  }
}
Page(creatorPage(Index));
