
import request from '../../../service/http';
export default class LotteryManageService {
    
    login(param) {
        return request().post('/user/login', param)
    }
    updateInfo(param) {
        return request().post('/user/updateUserInfo', param)
    }
    getList(url) {
        return request().get(url)
    }
}