//index.js

//index.js
import creatorPage from '../../../utils/create';
import CenterRecordService from './center.service';

const app = getApp()
class Index {
  data = {
    userData:{}
  }
  constructor() {
    this.ser = new CenterRecordService();
  }
  onLoad() {
    
  }

  
}
Page(creatorPage(Index));
