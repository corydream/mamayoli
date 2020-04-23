import request from '../../service/http';
export default class IndexService {
  add(param) {
    return request().post('/activity/add', param);
  }
  sts() {
    return request().get('/oss/sts');
  }
  login(param) {
    return request().post('/user/login', param);
  }
  updateInfo(param) {
    return request().post('/user/updateUserInfo', param);
  }
  getUserInfo(url) {
    return request().get(url);
  }
}
