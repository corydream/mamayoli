//index.js

//index.js
import creatorPage from '../../utils/create';
import LiveService from './live.service';
import token from '../../service/token.service';
import { formatTime } from '../../utils/util';

const app = getApp();
class Index {
  data = {
    userData: {},
  };
  constructor() {
    this.ser = new LiveService();
  }
  onLoad() {}
}
Page(creatorPage(Index));
