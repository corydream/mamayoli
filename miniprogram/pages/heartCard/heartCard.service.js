
import request from '../../service/http';
export default class HeartCardService {
    // 考生获取公告  
    getTodo(url) {
        return request().get(url)
    }
    getAward(url) {
        return request().get(url)
    }
    getLottery(url) {
        return request().get(url)
    }
}