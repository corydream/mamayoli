//index.js

//index.js
import creatorPage from '../../../utils/create';
import LotteryDetailService from './lotterydetail.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    winnerObj: {}, // 中奖者名单列表
    priceId: '237',
    id: '',
  };
  constructor() {
    this.ser = new LotteryDetailService();
  }
  onLoad(option) {
    this.setData({
      activityId: option.activityId ? option.activityId : '210',
      id: option.id ? option.id : '276',
    });
    this.getAwardResult(option);
  }
  getAwardResult(opt) {
    this.ser.getTodo(`/activity/winnerList?id=${opt.activityId}`).then((res) => {
      const allPrice = [...res.data.first?res.data.first:[], ...res.data.second?res.data.second:[], ...res.data.third?res.data.third:[]]
      console.log(allPrice, opt.id+'ids', opt.activityId+'actid');
      allPrice.map(v=>{
        if(v.id == opt.id){
          if(v.priceLevel == 'first'){
            v.priceLevelName = '一等奖'
          }else if(v.priceLevel == 'second'){
            v.priceLevelName = '二等奖'
          }else if(v.priceLevel == 'third'){
            v.priceLevelName = '三等奖'
          }
          v.addressInfo? v.addressInfoItem = JSON.parse(v.addressInfo):''
          this.setData({
            winnerObj: v
          });
        }
      })
      console.log(this.data.winnerObj)
    });
  }
}
Page(creatorPage(Index));
