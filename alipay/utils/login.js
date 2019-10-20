import { getAuthUserInfo } from '../services/my'
import { getUid } from './uid'
var base = require('./base64.js');

const app = getApp();


export function authLogin(callback) {
  let _this = this;
  // var myVar = setTimeout(getUsermess(),1000)
  
  my.getAuthCode({
    scopes: 'auth_user',
    success: (resAuth) => {
      console.log("授权成功")

      my.getAuthUserInfo({
        success: (res) => {
          console.log(res)
          let uid = getUid();
          app.globalData.uid = uid;
          app.globalData.nickName = res.nickName;
          app.globalData.avatar = res.avatar;
          app.globalData.isLogin = true;
        
          // my.navigateTo({
          //   url: '/pages/personal-center/index'
          // })

          
          my.request({
          url: 'http://jbxqalipay.nanjingdata.cn/userCenter/api/userauth/getUserInfoForH5',
          method:'GET',
          data: {
            'uid' : app.globalData.uid
          },
          success: (res) => {
            app.globalData.rtnData = res.data.rtnData;
            console.log(app.globalData.uid)
            console.log('123214123',res)
            //实名信息入库
            my.request({
            url:'https://jbxqalipay.nanjingdata.cn/test/dispatch_test/restport/euser/euserLogin',
            method: 'POST',
            data: {
              'userName': res.data.rtnData.name,
              'idCard': res.data.rtnData.idCardNo,
              'gender': res.data.rtnData.gender,
              'mobile': res.data.rtnData.phone,
              'source':'A'
            },
            success:function(result) {
              console.log(result)
              let url = app.globalData.url;
              let toUrl;
              if(url == 'https://www.jlwater.com/sso/externalEnter?viewUrl=/bizHandInfo') {
                console.log('rtnData',app.globalData.rtnData)
                var cardId = app.globalData.rtnData.idCardNo
                console.log('cardId',base.base64.encode(cardId))
                toUrl = escape(url + '&code=B&wechatArgs=' + base.base64.encode(cardId))
              }
              my.navigateTo({
                url: '/pages/web-view/index?requestUrl=' + toUrl,
              });
            }
            })
          },
          });

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
              //   console.log('rtnData',app.globalData.rtnData)
              //   var cardId = app.globalData.rtnData.idCardNo
              //   console.log('cardId',base.base64.encode(cardId))
              //   toUrl = escape(url + '&code=B&wechatArgs=' + base.base64.encode(cardId))
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