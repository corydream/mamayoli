
import request from '../../../../service/http';
export default class AddRecordService {
    
    add(param) {
        return request().post('/address/add', param)
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
}