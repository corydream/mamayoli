//index.js

//index.js
import creatorPage from '../../../utils/create';
import ConfigRecordService from './config.service';
import Toast from '../../../miniprogram_npm/vant-weapp/toast/toast';
const app = getApp()
class Index {
  data = {
    userData:{}
  }
  constructor() {
    this.ser = new ConfigRecordService();
  }
  onLoad() {
    
  }
  ques(){
    Toast('此模块正在研发中');
  }
  
}
Page(creatorPage(Index));
