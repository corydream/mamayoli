export default function creatorPage(ComponentClass) {
    let config = {};
    config = Object.assign(config, getComPrototypeFun(ComponentClass.prototype), new ComponentClass);
    // console.log(config)
    return config;
}
function getComPrototypeFun(_prototype) {
    let proObj = {};
    Object.getOwnPropertyNames(_prototype).forEach(item => {
        if (item !== 'constructor') {
            proObj[item] = _prototype[item];
        }
    });
    return proObj;
}