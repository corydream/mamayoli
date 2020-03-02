
import request from '../../service/http';
export default class IndexService {
    // 考生获取公告  
    getTodoList(param) {
        return request().get('/todo/list', param)
    }
    pass(url) {
        return request().get(url)
    }
    nopass(url) {
        return request().get(url)
    }
}