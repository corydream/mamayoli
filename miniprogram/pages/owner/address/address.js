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
    
  }

  
}
Page(creatorPage(Index));
