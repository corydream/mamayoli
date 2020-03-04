
import DetailService from './detail.service';
import creatorPage from '../../../utils/create';
import { formatTime } from '../../../utils/util';
class Detail {
    data = {
        list: [],
        hasMore: true,
        page_index: 1,
        total_count: 0,
        currentId: '2',
        currInfos: {},
        awardList: [],
        activeResult:''
    }
    ser = null;
    constructor() {
        this.ser = new DetailService();
    }
    onLoad(options) {
        console.log(options)
        this.currentId = options.id ? options.id : '2';
        this.getAwardList();
        this.getInfo();
    }
    lucky() {
        this.ser.getTodo(`/activity/lottery?id=${this.currentId}`).then(res => {
            console.log(res)
            this.setData({
                activeResult: res.code
            })
        })
    }
    // 自定义转发样式
    onShareAppMessage(e) {
        return {
            title: 'share',
            path: '/page/user?id=123',
            imageUrl:'../../../images/icon 商家合作.png'
        }
    }
    lower(e) {
        console.log(e)
    }
    upper(e) {
        console.log(e)
    }
    // 点击推广的类别
    attractType(e) {
        // 打开小程序
        wx.navigateToMiniProgram({
            appId: this.currInfos.providerAppId,
            path: this.currInfos.providerAppPath,
            extraData: {
                id: this.currInfos.id
            },
            envVersion: 'develop',
            success(res) {
                // 打开成功
            }
        })
    }
    getInfo() {
        this.ser.getTodo(`/activity/detail?id=${this.currentId}`).then(res => {
            res.data.currTime = formatTime(res.data.lotteryTime);
            res.data.attractingType = 'xcx';
            this.setData({
                currInfos: res.data
            });
        })
    }
    getAwardList() {
        this.ser.getTodo(`/activity/priceList?id=${this.currentId}`).then(res => {
            this.setData({
                awardList: res.data
            });
        })
    }
}

Page(creatorPage(Detail));
