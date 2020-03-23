//index.js

//index.js
import creatorPage from '../../../utils/create';
import AddressRecordService from './address.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    addressList: []
  };
  constructor() {
    this.ser = new AddressRecordService();
  }
  onLoad() {
    this.getAddress();
  }
  onShow() {
    this.getAddress();
  }
  async getAddress() {
    const res = await this.ser.getTodo('/address/list');
    this.setData({
      addressList: res.data ? res.data : []
    });
  }
  add() {
    wx.navigateTo({
      url: './add/add'
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
