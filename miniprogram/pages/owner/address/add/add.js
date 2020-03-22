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
    region: '110101',
    customItem: '全部',
    show: false,
    name:'',
    province:'北京市',
    city:'北京市',
    area:'东城区',
    detail:'',
    zip_code:'',
    isFirst:false,
    phone_num:'',
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
    const { name } = event.currentTarget.dataset.name;
    console.log(name)
    this.setData({
      radio: name
    });
  }
  onChange(event) {
    console.log(event)
    this.setData({
      radio: event.currentTarget.dataset.name
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
    console.log(this.data)
    const params = {
      name: this.data.name,
      province:'北京市',
      city:'北京市',
      area:'东城区',
      detail:this.data.detail,
      zip_code:this.data.zip_code,
      isFirst:false,
      phone_num:this.data.phone_num
    };
    this.ser.add(params).then(res=>{
      if(res){

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
    this.data.zip_code = e.detail;
  }
  addPhone(e){
    this.data.phone_num = e.detail;
  }
  changeValue(e){  
    this.data.province = e.detail.values[0].name;
    this.data.city = e.detail.values[1].name;
    this.data.area = e.detail.values[2].name;
  }
}
Page(creatorPage(Index));
