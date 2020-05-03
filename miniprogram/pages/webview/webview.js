//index.js

//index.js
import creatorPage from '../../utils/create';
import WebViewService from './webview.service';
import { formatTime } from '../../utils/util';

const app = getApp();
class Index {
  data = {
    userInfo: {},
    currentId: '1',
    currentData: {},
    canvasW: '',
    canvasH: '',
    previewImage: '',
    canvasObj: null,
  };
  constructor() {
    this.ser = new WebViewService();
  }
  onLoad(options) {
    let _this = this;
    _this.setData({
      currentId: options.id ? options.id : '235',
    });
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          _this.setData({
            userInfo: res.data,
          });
          _this.getData();
        }
      },
    });
  }
  // 获取详情数据
  async getData() {
    const res = await this.ser.getTodo(
      `/activity/detail?id=${this.data.currentId}`
    );

    res.data.currTime = formatTime(res.data.lotteryTime);
    this.setData({
      currentData: res.data,
    });
    const query = wx.createSelectorQuery();
    query
      .select('#myCanvas')
      .fields({ node: true, size: true })
      .exec(async (result) => {
        this.init(result);
      });
  }

  init(res) {
    console.log(res);
    const width = res[0].width;
    const height = res[0].height;
    const canvas = res[0].node;
    const ctx = canvas.getContext('2d');
    const dpr = wx.getSystemInfoSync().pixelRatio;
    this._dpr = dpr;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    this.data.canvasH = canvas.height;
    this.data.canvasW = canvas.width;
    ctx.scale(dpr, dpr);
    // 渲染图层
    this.drawBg(canvas, ctx);
    this.drawAvatarFont(canvas, ctx);
    this.drawAvatar(canvas, ctx);
    this.drawBrand(canvas, ctx);
    // this.drawBottomFont(canvas, ctx);
    this.drawQRcode(canvas, ctx);
  }

  // 绘制背景
  drawBg(canvas, ctx) {
    ctx.fillStyle = '#F66400';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  drawAvatarFont(canvas, ctx) {
    const dpr = this._dpr;
    const fontNameLeft = canvas.width / dpr / 2;
    const fontNameTop = (canvas.height / dpr) * (106 / 667);
    const nameFontSize = `${(canvas.height / dpr) * (14 / 667)}px`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = `${nameFontSize} SourceHanSansCN-Medium,SourceHanSansCN`;
    ctx.fillText(this.data.userInfo.nickName, fontNameLeft, fontNameTop);
  }
  // 绘制头像
  drawAvatar(canvas, ctx) {
    const dpr = this._dpr;
    // 图片实际半径
    const radius = (canvas.height / dpr) * (25 / 667);
    const offsetLeft = canvas.width / dpr / 2 - radius; // 图片左侧距离
    const avatarTop = (canvas.height / dpr) * (28 / 667);
    const img = canvas.createImage();
    img.src = this.data.userInfo.avatarUrl;
    img.onload = () => {
      ctx.save();
      ctx.arc(offsetLeft + radius, avatarTop + radius, radius, 0, Math.PI * 2, false);
      ctx.clip();
      ctx.drawImage(img, offsetLeft, avatarTop, radius *2, radius *2);
      ctx.restore();
    };
  }
  // 绘制商品
  drawBrand(canvas, ctx) {
    let _this = this;
    const dpr = this._dpr;
    const fontNameLeft = canvas.width / dpr / 2;
    const fontNameTop = (canvas.height / dpr) * (134 / 667);
    const offsetTop = (canvas.height / dpr) * (156.5 / 667);
    const offsetLeft = 15; // 商品框左侧距离
    const rectWidth = canvas.width / dpr - 30; // 白色矩形宽度
    const rectHeight = (canvas.height / dpr) * (495.5 / 667); // 白色矩形高度
    const imageHeight = (canvas.height / dpr) * (184 / 667); // 图片高度


    const mamaFontSize = `${(canvas.height / dpr) * (18 / 667)}px`;
    const advFontSize = `${(canvas.height / dpr) * (14 / 667)}px`;
    const titleFontSize = `${(canvas.height / dpr) * (20 / 667)}px`;
    const timeFontSize = `${(canvas.height / dpr) * (12 / 667)}px`;

    const fontTextHeight = (canvas.height / dpr) * (340.5 / 667);
    // 渲染引导文案
    const text = '邀请你来参加抽奖';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = `${mamaFontSize} SourceHanSansCN-Medium,SourceHanSansCN`;
    ctx.fillText(text, fontNameLeft, fontNameTop);
    // 渲染白色矩形
    ctx.fillRect(offsetLeft, offsetTop, rectWidth, rectHeight);
    // 获取网络图片
    wx.getImageInfo({
      src: _this.data.currentData.thumbnail,
      success(res) {
        const imgbrand = canvas.createImage();
        imgbrand.src = res.path;
        imgbrand.onload = () => {
          ctx.save();
          ctx.drawImage(
            imgbrand,
            offsetLeft,
            offsetTop,
            rectWidth,
            imageHeight
          );
          ctx.restore();
        };
      },
    });
    // 渲染赞助商
    ctx.fillStyle = '#F66400';
    ctx.font = `${advFontSize} SourceHanSansCN-Medium,SourceHanSansCN`;
    ctx.textAlign = 'left';
    const advText = `${_this.data.currentData.providerName} 赞助`;
    ctx.fillText(
      advText,
      15 + 15,
      fontTextHeight + (canvas.height / dpr) * (20 / 667)
    );

    // 标题
    ctx.fillStyle = '#333';
    ctx.font = `${titleFontSize} SourceHanSansCN-Medium,SourceHanSansCN`;
    const titleText = `${_this.data.currentData.name} X ${_this.data.currentData.lotteryNum}`;
    ctx.fillText(
      titleText,
      15 + 15,
      fontTextHeight + (canvas.height / dpr) * (48 / 667)
    );

    // 时间
    ctx.fillStyle = '#999';
    ctx.font = `${timeFontSize} SourceHanSansCN-Medium,SourceHanSansCN`;
    const timeText = `${_this.data.currentData.currTime} 自动开奖`;
    ctx.fillText(
      timeText,
      15 + 15,
      fontTextHeight + (canvas.height / dpr) * (78 / 667)
    );
  }
  drawBottomFont(canvas, ctx) {
    const dpr = this._dpr;
    const fontNameLeft = canvas.width / dpr / 2;
    const fontNameBottom =
      canvas.height / dpr - (canvas.height / dpr) * (16 / 667);
    ctx.fillStyle = '#fff';
    ctx.font = '12px SourceHanSansCN-Medium,SourceHanSansCN';
    ctx.textAlign = 'center';
    const bottomText = `百万妈妈福利抽奖工具`;
    ctx.fillText(bottomText, fontNameLeft, fontNameBottom);
  }
  // 绘制二维码
  drawQRcode(canvas, ctx) {
    let _this = this;
    const dpr = this._dpr;
    const qrSize = (canvas.height / dpr) * (50 / 667)
    const offsetTop = (canvas.height / dpr) * (454 / 667);
    const offsetLeft = canvas.width / dpr / 2 - qrSize; // 图片左侧距离
    const offsetNameTop = (canvas.height / dpr) * (603 / 667);
    const fontNameLeft = canvas.width / dpr / 2;

    // 获取网络图片
    wx.getImageInfo({
      src: `https://www.ecocyclone.com/api/activity/getShareWxCode?id=${this.data.currentId}`,
      success(res) {
        const imgCode = canvas.createImage();
        imgCode.src = res.path;
        imgCode.onload = () => {
          ctx.save();
          ctx.drawImage(imgCode, offsetLeft, offsetTop, qrSize*2, qrSize*2);
          ctx.restore();
        };
      },
    });

    ctx.fillStyle = '#666';
    ctx.font = `${(canvas.height / dpr) * (14 / 667)}px SourceHanSansCN-Medium,SourceHanSansCN`;
    ctx.textAlign = 'center';
    const bottomText = `长按识别小程序，参与抽奖`;
    ctx.fillText(bottomText, fontNameLeft, offsetNameTop);
  }
  /**
   * 获取用户保存相册权限
   */
  getPhotosAuthorize() {
    let self = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功');
              self.saveImg();
            },
            //用户拒绝
            fail() {
              console.log('用户再次拒绝');
            },
          });
        } else {
          self.saveImg();
        }
      },
    });
  }
  async saveImg() {
    let self = this;
    const query = wx.createSelectorQuery();
    const canvasObj = await new Promise((resolve, reject) => {
      query
        .select('#myCanvas')
        .fields({ node: true, size: true })
        .exec(async (res) => {
          resolve(res[0].node);
        });
    });
    wx.canvasToTempFilePath(
      {
        //fileType: 'jpg',
        //canvasId: 'posterCanvas', //之前的写法
        canvas: canvasObj, //现在的写法
        success: (res) => {
          console.log(res);
          //保存图片
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '已保存到相册',
                icon: 'success',
                duration: 2000,
              });
            },
            fail: function (err) {
              console.log(err);
              if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                console.log('当初用户拒绝，再次发起授权');
              } else {
                // util.showToast('请截屏保存分享');
              }
            },
            complete(res) {
              // wx.hideLoading();
              console.log(res);
            },
          });
        },
        fail(res) {
          console.log(res);
        },
      },
      this
    );
  }
  // async setImage() {
  //   let self = this;
  //   const query = wx.createSelectorQuery();
  //   const canvasObj = await new Promise((resolve, reject) => {
  //     query
  //       .select('#myCanvas')
  //       .fields({ node: true, size: true })
  //       .exec(async (result) => {
  //         resolve(result[0].node);
  //       });
  //   });
  //   wx.canvasToTempFilePath(
  //     {
  //       canvas: self.data.canvasObj, //现在的写法
  //       success: (res) => {
  //         self.setData({
  //           previewImage: res.tempFilePath,
  //         });
  //         console.log(res.tempFilePath, self.data);
  //       },
  //       fail(res) {
  //         console.log(res);
  //       },
  //     },
  //     this
  //   );
  // }
  // saveImg() {
  //   //保存图片
  //   let _this = this;
  //   console.log(_this.data);
  //   wx.saveImageToPhotosAlbum({
  //     filePath: _this.data.previewImage,
  //     success: function (data) {
  //       wx.showToast({
  //         title: '已保存到相册',
  //         icon: 'success',
  //         duration: 3500,
  //       });
  //     },
  //     fail: function (err) {
  //       console.log(err);
  //       if (err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
  //         console.log('当初用户拒绝，再次发起授权');
  //       }
  //     },
  //     complete(res) {
  //       wx.hideLoading();
  //       console.log(res);
  //     },
  //   });
  // }
}
Page(creatorPage(Index));
