//index.js

//index.js
import creatorPage from '../../utils/create';
import WebViewService from './webview.service';

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
    // this.drawTest(canvas, ctx);
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
    const fontNameTop = 90 + 14;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if (res.data && res.data.nickName) {
          const img = canvas.createImage();
          img.src = res.data.avatarUrl;
          img.onload = () => {
            ctx.arc(offsetLeft + 25, 28 + 25, 25, 0, Math.PI * 2, false);
            ctx.clip();
            ctx.drawImage(img, offsetLeft, 28, 50, 50);
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
    const fontNameTop = 232 / 2 + 20;
    const offsetTop = 313 / 2;
    const offsetLeft = 15; // 商品框左侧距离
    const rectWidth = canvas.width / dpr - 30; // 白色矩形宽度
    const rectHeight = rectWidth * 1.33; // 白色矩形高度
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
          ctx.drawImage(imgbrand, offsetLeft, offsetTop, rectWidth, imageHeight);
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
    const advText = `${_this.data.currentData.providerName} 赞助`;
    // ctx.textAlign = 'left';
    ctx.fillText(advText,fontNameLeft+ 15, fontNameTop+ 180);
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
