import request from '../../service/http';
export default class IndexService {
  add(param) {
    return request().post('/activity/add', param)
  }
}