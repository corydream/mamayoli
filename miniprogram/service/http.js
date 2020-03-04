import  create  from '../utils/request';
import token from '../service/token.service';
import intcept from './intcept.http';
import { API_ROOT } from './../config';


export default function() {
    // 根据需要配置请求头
    return create({
        apiRoot: typeof API_ROOT === 'undefined' ? '' : API_ROOT,
        defaultHeader: {
            'withCredentials': 'true',
            'content-type': 'application/json',
            'token': token.get() 
        }
    }, intcept ? intcept : () => { console.log('intcept不存在') })
}
