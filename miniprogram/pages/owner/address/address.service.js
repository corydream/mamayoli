
import request from '../../../service/http';
export default class AddressRecordService {
    
    login(param) {
        return request().post('/user/login', param)
    }
    updateInfo(param) {
        return request().post('/user/updateUserInfo', param)
    }
    getUserInfo(url) {
        return request().get(url)
    }
    getTodo(url) {
        return request().get(url)
    }
}