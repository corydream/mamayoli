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
    allProv:'',
    productId:''
  };
  constructor() {
    this.ser = new AddRecordService();
  }
  onLoad(options) {
    this.getId(options);
    this.setData({
      areaList: area
    });
  }
  onShow(options){
    this.getId(options);
  }

  getId(options){
    if(options && options.productId){
      this.setData({
        productId:options.productId
      })
    }
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
    console.log(123)
    const params = {
      name: this.data.name,
      province:this.data.province,
      city:this.data.city,
      area: this.data.area,
      detail:this.data.detail,
      zipCode:this.data.zipCode,
      isFirst: this.data.isFirst,
      phoneNum:this.data.phoneNum
    };
    this.ser.add(params).then(res=>{
      if(res){
        wx.navigateTo({
          url:`../../address/address?productId=${this.data.productId}`
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
