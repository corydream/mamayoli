
import request from '../../service/http';
export default class IndexService {
    // 考生获取公告  
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
        return request().get('/activity/listPublic', param)
    }
}