import wxx from './wx.api';
/**
 * 默认获取SessionID方法
 * @returns {string}
 */
function defaultGetSession() {
    return wxx.app.sessionId;
}

/**
 * 默认设置SessionID方法
 * @param {string} sessionId
 */
function defaultSetSession(sessionId) {
    wxx.app.sessionId = sessionId;
}

// 有效HTTP方法列表
const methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'];

/**
 * 创建API Request客户端
 * @param {Object} options 选项
 * @returns {Function}
 */
export default function create(options, intcept) {
    let _options = options || {};

    /**
     * 通用Alaska RESTFUL风格API请求,如果接口返回错误,则抛出异常
     * @param {string} [method] 请求方法,可选默认GET,有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
     * @param {string} apiName  API名称,必选
     * @param {object} [data]   数据,可选,如果方法为GET或DELETE,则此对象中的所有数据将传入URL query
     * @param {object} [header] HTTP头对象,可选
     * @returns {*}
     */
    function request(method, apiName, data, header) {
        const apiRoot = _options.apiRoot || {};
        const updateKey = _options.updateKey || '_session';
        const headerKey = _options.headerKey || 'Session';
        const getSession = _options.getSession || defaultGetSession;
        const setSession = _options.setSession || defaultSetSession;
        const defaultHeader = _options.defaultHeader;
        if (methods.indexOf(method) === -1) {
            header = data;
            data = apiName;
            apiName = method;
            method = 'GET';
        }
        let url = apiRoot + apiName;
        header = Object.assign({}, defaultHeader, header);

        return wxx.request({
            method,
            url,
            data,
            header
        }).then(res => {
            try {
                if (intcept) { 
                    intcept(res);
                }
            } catch (error) {
                return error
            }
            return new Promise((resolve, reject) => {
                resolve(res.data)
            })
        })
        .catch(error => {
            console.log(error);
        })

        
    }

    methods.forEach((method) => {
        request[method.toLowerCase()] = function(...args) {
            return request(method, ...args);
        };
    });

    request.setOptions = function(newOptions) {
        options = Object.assign(_options, newOptions || {});
    };

    request.getOptions = function() {
        return options;
    };

    return request;
}