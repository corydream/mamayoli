
import request from '../../../service/http';
export default class LotteryAwardService {
    
    login(param) {
        return request().post('/user/login', param)
    }
    updateInfo(param) {
        return request().post('/user/updateUserInfo', param)
    }
    getUserInfo(url) {
        return request().get(url)
    }
    list(param) {
        return request().get('/activity/list', param)
    }
    getTodo(url) {
        return request().get(url)
    }
}