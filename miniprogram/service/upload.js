import request from './http.js';
export default class UploadService {
  add(param) {
    return request().post('/activity/add', param);
  }
  sts() {
    return request().get('/oss/sts');
  }
  login(param) {
    return request().post('/user/login', param);
  }
  updateInfo(param) {
    return request().post('/user/updateUserInfo', param);
  }
  getUserInfo(url) {
    return request().get(url);
  }
  uploadFile(path, upSuccess, upFailed) {
    this.sts().then(sts => {
      wx.uploadFile({
        url: 'https://' + sts.data.host,
        filePath: path,
        name: 'file',
        formData: {
          name: path,
          key: sts.data.dir + '/${filename}',
          policy: sts.data.policy,
          OSSAccessKeyId: sts.data.accessid,
          success_action_status: '200',
          signature: sts.data.signature,
        },
        success: function(res) {
          console.log(res);
          let picUrl =
            'https://' +
            sts.data.host +
            '/' +
            sts.data.dir +
            path.substring(path.lastIndexOf('/'));
          console.log('uploadImage success,url: ', picUrl);
          upSuccess(picUrl);
        },
        fail: function({
          errMsg
        }) {
          console.log('upladImage fail, errMsg is: ', errMsg);
          upFailed();
        },
      });
    })
  }
  choseImgAndUpload(count = 1, success, fail = () => {}) {
    wx.chooseImage({
      count: count,
      success: res => {
        wx.showLoading({
          title: '上传中',
        });
        let arr = [];
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          let finali = i;
          this.uploadFile(res.tempFilePaths[i],
            url => {
              arr.push({
                filePath: res.tempFilePaths[i],
                url: url
              })
              if (finali === res.tempFilePaths.length - 1) {
                wx.hideLoading();
                success(arr);
              }
            },
            () => {
              wx.hideLoading();
              wx.showToast({
                title: '上传失败',
                duration: 1000,
              });
              fail();
            }
          );
        }

      }
    });
  }
}