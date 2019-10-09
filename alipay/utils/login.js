import { getAuthUserInfo } from '../services/my'
import { getUid } from './uid'

const app = getApp();

export function authLogin(callback) {
  let _this = this;
  my.getAuthCode({
    scopes: 'auth_user',
    success: (resAuth) => {
      console.log("授权成功")
      my.getAuthUserInfo({
        success: (res) => {
          console.log(res)
          app.globalData.nickName = res.nickName;
          app.globalData.avatar = res.avatar;
          app.globalData.isLogin = true;
        //   let uid = getUid();
        //   app.globalData.uid = uid;

        //   my.request({
        //   url: 'http://jbxqalipay.nanjingdata.cn/userCenter/api/userauth/getUserInfoForH5',
        //   method:'GET',
        //   data: {
        //     'uid' : app.globalData.uid
        //   },
        //   success: (res) => {
        //     console.log(app.globalData.uid)
        //     console.log('123214123',res)
        //     //实名信息入库
        //     my.request({
        //     url:'http://59.83.223.62:18099/dispatch_test/restport/euser/euserLogin',
        //     method: 'POST',
        //     data: {
        //       'userName': res.data.rtnData.name,
        //       'idCard': res.data.rtnData.idCardNo,
        //       'gender': res.data.rtnData.gender,
        //       'mobile': res.data.rtnData.phone,
        //       'source':'A'
        //     },
        //     success:function(result) {
        //       console.log(result)
        //     }
        //     })
        //   },
        // });
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
              let uid = app.globalData.uid;
              if (url.indexOf("?") == -1) {
                toUrl = escape(url + '?code=A&uid=' + uid)
              } 
              // else if(url == 'https://www.jlwater.com/sso/externalEnter?viewUrl=/bizHandInfo') {
              //   var cardId = app.globalData.userInfo.credential_id
              //   console.log('cardId',cardId)
              //   toUrl = escape(url + '?code=B&wechatArgs=' + base.base64.encode(cardId))
              // } 
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
      });

    },
    fail: (e) => {
      console.log(e)
    }
  });
}