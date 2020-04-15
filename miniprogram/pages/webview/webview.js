//index.js

//index.js
import creatorPage from '../../utils/create';
import WebViewService from './webview.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    currentId: '1',
    currentData: '',
  };
  constructor() {
    this.ser = new WebViewService();
  }
  onLoad(options) {
    this.setData({
      currentId: options.id ? options.id : '235',
    });
    wx.createSelectorQuery()
      .select('#myCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this));
    this.getData();
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

  // 初始化画板
  init(res) {
    const width = res[0].width;
    const height = res[0].height;

    const canvas = res[0].node;
    const ctx = canvas.getContext('2d');

    const dpr = wx.getSystemInfoSync().pixelRatio;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, 100, 100);

    wx.getImageInfo({
      src: 'https://mamayouli.oss-cn-hangzhou.aliyuncs.com/oF6sp41J2F_dPezCL8a5S7-KOxbY/tmp_273cb69e30958f3dc1915cad08c56453.jpg',
      success (res) {
        console.log(res.path)
        console.log(res.height)
        const img = canvas.createImage();
        img.src = res.path;
        console.log(ctx)
        ctx.drawImage(img, 0, 150 - 25, 300, 300);
        // ctx.draw(true);
      },
      fail(err){
        console.log(err)
      }
    })
    // wx.downloadFile({
    //   url: 'https://mamayouli.oss-cn-hangzhou.aliyuncs.com/oF6sp41J2F_dPezCL8a5S7-KOxbY/tmp_273cb69e30958f3dc1915cad08c56453.jpg', //仅为示例，并非真实的资源
    //   success (res) {
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
    //       wx.playVoice({
    //         filePath: res.tempFilePath
    //       })
    //       const img = canvas.createImage();
    //       img.src = res.tempFilePath;
    //       console.log(ctx)
    //       ctx.drawImage(img, 0, 150 - 25, 300, 300);
    //       console.log(res)
    //     }
    //   }
    // })
    // img.src = 'https://mamayouli.oss-cn-hangzhou.aliyuncs.com/oF6sp41J2F_dPezCL8a5S7-KOxbY/tmp_273cb69e30958f3dc1915cad08c56453.jpg';
    // console.log(img);
  }
}
Page(creatorPage(Index));
