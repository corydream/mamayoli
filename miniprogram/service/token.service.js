
class TokenService {
    set(value) {
        wx.setStorageSync('token', value || '')
    }
    get() {
        return wx.getStorageSync('token');
    }
    clear() {
        wx.removeStorageSync('token');
    }
}
export default new TokenService;