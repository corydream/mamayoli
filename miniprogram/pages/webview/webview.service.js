
import request from '../../service/http';
export default class WebViewService {

    getTodo(url) {
        return request().get(url)
    }
}