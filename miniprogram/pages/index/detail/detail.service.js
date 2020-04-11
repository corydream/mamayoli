
import request from '../../../service/http';
export default class DetailService {
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

    login(param) {
        return request().post('/user/login', param)
    }
    updateInfo(param) {
        return request().post('/user/updateUserInfo', param)
    }
    getUserInfo(url) {
        return request().get(url)
    }
}