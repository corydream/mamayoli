
import request from '../../../service/http';
export default class LotteryRecordService {
    
    login(param) {
        return request().post('/user/login', param)
    }
    updateInfo(param) {
        return request().post('/user/updateUserInfo', param)
    }
    getList(param) {
        return request().post('/activity/myLotteryList', param)
    }
}