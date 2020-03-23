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
    region: '110101',
    customItem: '全部',
    show: false,
    name:'',
    province:'北京市',
    city:'北京市',
    area:'东城区',
    detail:'',
    zipCode:'',
    isFirst:false,
    phoneNum:'',
    allProv:''
  };
  constructor() {
    this.ser = new AddRecordService();
  }
  onLoad() {
    this.setData({
      areaList: area
    });
  }
  area() {
    this.setData({ show: true });
  }
  onClick(event) {
    this.data.isFirst =!this.data.isFirst;
    this.setData({
      isFirst: this.data.isFirst
    });
  }
  closePop() {
    this.setData({
      show: false
    });
  }
  closeConfirm(){
    this.setData({
      show: false,
      allProv: `${this.data.province} ${this.data.city} ${this.data.area}`
    });
  }
  submit(){
    const params = {
      name: this.data.name,
      province:'北京市',
      city:'北京市',
      area:'东城区',
      detail:this.data.detail,
      zipCode:this.data.zipCode,
      isFirst: this.data.isFirst,
      phoneNum:this.data.phoneNum
    };
    this.ser.add(params).then(res=>{
      if(res){
        wx.navigateTo({
          url:'../../address/address'
        })
      }
    })
  }
  addName(e){
    this.data.name = e.detail;
  }
  addDetail(e){
    this.data.detail = e.detail;
  }
  addZip(e){
    this.data.zipCode = e.detail;
  }
  addPhone(e){
    this.data.phoneNum = e.detail;
  }
  changeValue(e){  
    this.data.province = e.detail.values[0].name;
    this.data.city = e.detail.values[1].name;
    this.data.area = e.detail.values[2].name;
  }
}
Page(creatorPage(Index));
