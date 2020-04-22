//index.js

//index.js
import creatorPage from '../../utils/create';
import WebViewService from './webview.service';
import { formatTime } from '../../utils/util';

const app = getApp();
class Index {
  data = {
    userData: {},
    currentId: '1',
    currentData: {},
  };
  constructor() {
    this.ser = new WebViewService();
  }
  onLoad(options) {
    this.setData({
      currentId: options.id ? options.id : '235',
    });
    this.getData().then((res) => {
      wx.createSelectorQuery()
        .select('#myCanvas')
        .fields({
          node: true,
          size: true,
        })
        .exec(this.init.bind(this));
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
  }

  init(res) {
    const width = res[0].width;
    const height = res[0].height;
    const canvas = res[0].node;
    const ctx = canvas.getContext('2d');

    const dpr = wx.getSystemInfoSync().pixelRatio;
    this._dpr = dpr;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    // 渲染图层
    this.render(canvas, ctx);
  }

  render(canvas, ctx) {
    this.drawBg(canvas, ctx);
    this.drawBrand(canvas, ctx);
    this.drawAvatar(canvas, ctx);
    this.drawBottomFont(canvas, ctx);
    this.drawQRcode(canvas, ctx);
  }
  // 绘制背景
  drawBg(canvas, ctx) {
    ctx.fillStyle = '#F66400';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  // 绘制头像
  drawAvatar(canvas, ctx) {
    const dpr = this._dpr;
    const offsetLeft = canvas.width / dpr / 2 - 25; // 图片左侧距离
    const fontNameLeft = canvas.width / dpr / 2;
    const avatarTop = (canvas.height / dpr) * (56 / 667) - 25;
    const fontNameTop = (canvas.height / dpr) * (105 / 667);
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          const img = canvas.createImage();
          img.src = res.data.avatarUrl;
          img.onload = () => {
            ctx.arc(offsetLeft + 25, avatarTop + 25, 25, 0, Math.PI * 2, false);
            ctx.clip();
            ctx.drawImage(img, offsetLeft, avatarTop, 50, 50);
            ctx.restore();
          };
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.font = '14px PingFangSC-Medium,PingFang SC';
          ctx.fillText(res.data.nickName, fontNameLeft, fontNameTop);
        }
      },
    });
  }
  // 绘制商品
  drawBrand(canvas, ctx) {
    let _this = this;
    const dpr = this._dpr;
    const fontNameLeft = canvas.width / dpr / 2;
    const fontNameTop = (canvas.height / dpr) * (137 / 667);
    const offsetTop = (canvas.height / dpr) * (162 / 667);
    const offsetLeft = 15; // 商品框左侧距离
    const rectWidth = canvas.width / dpr - 30; // 白色矩形宽度
    const rectHeight = (canvas.height / dpr) * (462 / 667); // 白色矩形高度
    console.log(rectHeight);
    const imageHeight = rectWidth * 0.4; // 图片高度

    // 渲染引导文案
    const text = '邀请你来参加抽奖';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '20px PingFangSC-Medium,PingFang SC';
    ctx.fillText(text, fontNameLeft, fontNameTop);
    // 渲染白色矩形
    ctx.fillRect(offsetLeft, offsetTop, rectWidth, rectHeight);
    ctx.save();
    // 获取网络图片
    wx.getImageInfo({
      src: _this.data.currentData.thumbnail,
      success(res) {
        const imgbrand = canvas.createImage();
        console.log(imgbrand);
        imgbrand.src = res.path;
        imgbrand.onload = () => {
          ctx.drawImage(
            imgbrand,
            offsetLeft,
            offsetTop,
            rectWidth,
            imageHeight
          );
        };
      },
      fail(err) {
        console.log(err);
      },
    });
    ctx.restore();
    ctx.save();
    // 渲染赞助商
    ctx.fillStyle = '#F66400';
    ctx.font = '14px PingFangSC-Medium,PingFang SC';
    ctx.textAlign = 'left';
    const advText = `${_this.data.currentData.providerName} 赞助`;
    ctx.fillText(advText, 15 + 15, fontNameTop + imageHeight + 50);

    // 标题
    ctx.fillStyle = '#333';
    ctx.font = '20px PingFangSC-Medium,PingFang SC';
    const titleText = `${_this.data.currentData.name} X ${_this.data.currentData.lotteryNum}`;
    ctx.fillText(titleText, 15 + 15, fontNameTop + imageHeight + 83);

    // 时间
    ctx.fillStyle = '#999';
    ctx.font = '12px PingFangSC-Regular,PingFang SC';
    const timeText = `${_this.data.currentData.currTime} 自动开奖`;
    ctx.fillText(timeText, 15 + 15, fontNameTop + imageHeight + 114);
  }
  drawBottomFont(canvas, ctx) {
    const dpr = this._dpr;
    const fontNameLeft = canvas.width / dpr / 2;
    const fontNameBottom =
      canvas.height / dpr - (canvas.height / dpr) * (16 / 667);
    ctx.fillStyle = '#fff';
    ctx.font = '14px SourceHanSansCN-Medium,SourceHanSansCN';
    ctx.textAlign = 'center';
    const bottomText = `百万妈妈福利抽奖工具`;
    ctx.fillText(bottomText, fontNameLeft, fontNameBottom);
  }
  // 绘制二维码
  drawQRcode(canvas, ctx) {
    let _this = this;
    const dpr = this._dpr;
    const offsetTop = (canvas.height / dpr) * (444 / 667);
    const offsetLeft = canvas.width / dpr / 2 - 50; // 图片左侧距离
    const offsetNameTop = (canvas.height / dpr) * (594 / 667);
    const fontNameLeft = canvas.width / dpr / 2;
    const qrSize = 100; // 白色矩形宽度

    ctx.fillStyle = '#666';
    ctx.font = '14px PingFangSC-Medium,PingFang SC';
    ctx.textAlign = 'center';
    const bottomText = `长按识别小程序，参与抽奖`;
    ctx.fillText(bottomText, fontNameLeft, offsetNameTop);

    ctx.save();
    // 获取网络图片

    wx.getImageInfo({
      src: _this.data.currentData.attractingPic,
      success(res) {
        const imgbrand = canvas.createImage();
        imgbrand.src = res.path;
        imgbrand.onload = () => {
          ctx.arc(offsetLeft + 50, offsetTop + 50, 50, 0, Math.PI * 2, false);
          ctx.clip();
          ctx.drawImage(imgbrand, offsetLeft, offsetTop, qrSize, qrSize);
          ctx.restore();
        };
      },
      fail(err) {
        console.log(err);
      },
    });
    ctx.save();
  }
  drawTest(canvas, ctx) {
    const imgbg = canvas.createImage();
    imgbg.src = './../../images/account_flow.png';
    imgbg.onload = () => {
      ctx.drawImage(imgbg, 100, 100, 50, 50);
    };
    ctx.restore();
  }
}
Page(creatorPage(Index));
