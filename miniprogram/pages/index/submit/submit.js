//index.js

//index.js
import creatorPage from '../../../utils/create';
import SubmitService from './submit.service';
import token from '../../../service/token.service';

const app = getApp();
class Index {
  data = {
    userData: {},
    currInfos: {},
  };
  constructor() {
    this.ser = new SubmitService();
  }
  onLoad(options) {
    console.log(options)
    this.getData(options ? options.id : '247');
  }
  getData(id) {
    this.ser
      .getTodo(`/activity/detail?id=${id}`)
      .then((res) => {
        this.setData({
          currInfos: res.data,
        });
      });
      console.log(this.data.currInfos)
  }
}
Page(creatorPage(Index));
