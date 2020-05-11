
import request from '../../../service/http';
export default class SubmitService {
    
    getTodo(url) {
        return request().get(url)
    }
}