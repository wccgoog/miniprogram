import { getAuthUserInfo } from '../services/my';
import { getUid } from './uid';

const app = getApp();

export function authLogin(callback) {
  let _this = this;
  my.getAuthCode({
    scopes: 'auth_user',
    success: (resAuth) => {
      my.getAuthUserInfo({
        success: (res) => {
          app.globalData.nickName = res.nickName;
          app.globalData.avatar = res.avatar;
          app.globalData.isLogin = true;
          // my.navigateTo({
          //   url: '/pages/personal-center/index'
          // })
          if (callback) {
            callback();
            my.hideLoading();
          } else {
            if (app.globalData.url != '') {
              let url = app.globalData.url;
              let toUrl;
              let uid = getUid();
              if (url.indexOf("?") == -1) {
                toUrl = escape(url + '?code=A&uid=' + uid)
              } else {
                toUrl = escape(url + '&code=A&uid=' + uid)
              }
              my.navigateTo({
                url: '/pages/web-view/index?requestUrl=' + toUrl,
              });
            } else {
              my.switchTab({
                url: '/pages/personal-center/index'
              });
            }

          }
        },
        fail: (e) => {
          console.log(e)
        }
      });
    },
    fail: (e) => {
      console.log(e)
    }
  });
}