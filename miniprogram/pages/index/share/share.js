//index.js

//index.js
import creatorPage from '../../../utils/create';
import ShareService from './share.service';
import token from '../../../service/token.service';

const app = getApp();
class Index {
  data = {
    userData: {},
  };
  constructor() {
    this.ser = new ShareService();
  }
  onLoad() {
    this.getUserInfo();
    const query = wx.createSelectorQuery();
    query
      .select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');

        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        ctx.fillRect(0, 0, 100, 100);
      });
      this.saveImg();
  }
  async saveImg() {
    let self = this;
    //这里是重点  新版本的type 2d 获取方法
    const query = wx.createSelectorQuery();
    const canvasObj = await new Promise((resolve, reject) => {
      query.select('#myCanvas')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          resolve(res[0].node);
        })
    });
    console.log(canvasObj);
    wx.canvasToTempFilePath({
      //fileType: 'jpg',
      //canvasId: 'posterCanvas', //之前的写法
      canvas: canvasObj, //现在的写法
      success: (res) => {
        console.log(res.tempFilePath);
        //保存图片
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '已保存到相册',
              icon: 'success',
              duration: 2000
            })
            // setTimeout(() => {
            //   self.setData({show: false})
            // }, 6000);
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
            } else {
              util.showToast("请截屏保存分享");
            }
          },
          complete(res) {
            wx.hideLoading();
            console.log(res);
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    }, this)
  }
  getUserInfo() {
    let _this = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          console.log(res.data);
          _this.setData({
            userData: res.data,
          });
        }
      },
    });
  }
}
Page(creatorPage(Index));
