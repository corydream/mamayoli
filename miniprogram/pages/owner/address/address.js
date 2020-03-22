//index.js

//index.js
import creatorPage from '../../../utils/create';
import AddressRecordService from './address.service';

const app = getApp()
class Index {
  data = {
    userData:{}
  }
  constructor() {
    this.ser = new AddressRecordService();
  }
  onLoad() {
    this.getAddress();
  }
  onShow(){
    this.getAddress();
  }
  async getAddress(){
    const res = await this.ser.getTodo('/address/list');
  }
  add(){
    wx.navigateTo({
      url:'./add/add'
    })
  }
  
}
Page(creatorPage(Index));
