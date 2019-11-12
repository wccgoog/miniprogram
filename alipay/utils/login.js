import { getAuthUserInfo,getAuthCode } from '../services/my'
import { getUid } from './uid'

var base = require('./base64.js');

const app = getApp();


export async function authLogin(callback) {
  let _this = this;
  
  my.getAuthCode({
    scopes: 'auth_user',
    success: (resAuth) => {
      console.log("授权成功")
      console.log(resAuth)

      my.getAuthUserInfo({
        success: (res) => {

          console.log(res)
          app.globalData.nickName = res.nickName;
          app.globalData.avatar = res.avatar;
          app.globalData.isLogin = true;
          

          if (callback) {
            callback();
            my.hideLoading();
          } else {
            if (app.globalData.url != '') {
              let url = app.globalData.url;
              let toUrl;
              let uid = app.globalData.uid;
              if (url.indexOf("?") == -1) {
                toUrl = escape(url + '?code=A&uid=' + uid)
              } 
              else if(url == 'https://www.jlwater.com/sso/externalEnter?viewUrl=/bizHandInfo') {
                console.log('rtnData',app.globalData.rtnData)
                var cardId = app.globalData.rtnData.idCardNo
                console.log('cardId',base.base64.encode(cardId))
                toUrl = escape(url + '&code=B&wechatArgs=' + base.base64.encode(cardId))
              } 
              else {
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
        // }
      });

    },
    fail: (e) => {
      console.log(e)
    }
  });
}