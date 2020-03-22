//index.js

//index.js
import creatorPage from '../../../../utils/create';
import AddRecordService from './add.service';
import area from '../../../../utils/area';

const app = getApp();
class Index {
  data = {
    addressObj: {},
    areaList: [],
    radio: '1',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  };
  constructor() {
    this.ser = new AddRecordService();
  }
  onLoad() {

    this.setData({
      areaList: area
    })
  }
}
Page(creatorPage(Index));
