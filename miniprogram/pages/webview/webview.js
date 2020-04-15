//index.js

//index.js
import creatorPage from '../../utils/create';
import WebViewService from './webview.service';

const app = getApp()
class Index {
  data = {
    userData:{}
  }
  constructor() {
    this.ser = new WebViewService();
  }
  onLoad() {
    
  }

  
}
Page(creatorPage(Index));
