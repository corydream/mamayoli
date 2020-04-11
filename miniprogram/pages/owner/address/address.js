//index.js

//index.js
import creatorPage from '../../../utils/create';
import AddressRecordService from './address.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    addressList: [],
    productId:''
  };
  constructor() {
    this.ser = new AddressRecordService();
  }
  onLoad(options) {
    this.getId(options);
    this.getAddress();
  }
  onShow(options) {
    this.getId(options);
    this.getAddress();
  }
  getId(options){
    if(options && options.productId){
      this.setData({
        productId:options.productId
      })
    }
  }
  selectAddr(e){
    if(this.data.productId){
      wx.navigateTo({
        url: `/pages/index/detail/detail?id=${this.data.productId}&addrId=${e.currentTarget.dataset.id}`
      });  
    }
  }
  async getAddress() {
    const res = await this.ser.getTodo('/address/list');
    this.setData({
      addressList: res.data ? res.data : []
    });
  }
  add() {
    wx.navigateTo({
      url: `./add/add?productId=${this.data.productId}`
    });
  }
  onchange(e) {
    const item = e.currentTarget.dataset.item;
    this.data.addressList.map(v => {
      v.id === item.id ? (v.isFirst = true) : (v.isFirst = false);
    });
    this.ser.getTodo(`/address/setDefault?id=${item.id}`).then(res => {
      this.setData({
        addressList: this.data.addressList
      });
    });
  }
}
Page(creatorPage(Index));
