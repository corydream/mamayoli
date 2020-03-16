//index.js

//index.js
import creatorPage from '../../../../utils/create';
import AddRecordService from './add.service';

const app = getApp();
class Index {
  data = {
    addressObj: {},
    areaList:[],
    radio:'1'
  };
  constructor() {
    this.ser = new AddRecordService();
  }
  onLoad() {
    const db = wx.cloud.database();

    db.collection('region')
      .limit(1)
      .get()
      .then(res => {
        if (res.data && res.data.length > 0) {
          this.setData({
            areaList: res.data[0]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  defaultAddr(event){
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
  }
}
Page(creatorPage(Index));
