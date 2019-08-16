// import encode from './base64.js'
var secret = require('./secret.js');
var base = require('./base64.js');
const app = getApp()

export function webView(e, isNumSearch) {
  // 如果是从numSearch页面点击, isNumSearch为true
  console.log("webview=====", app.globalData.isLogin);
  var url = e.currentTarget.dataset.id;
  if (app.globalData.isLogin == false) {
    //未登录状态
    wx.showModal({
      title: '请登录',
      content: '登录后即可网上申报和查询办件',
      confirmText: '登录',
      success: (res) => {
        console.log("res=", res)
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/auth/auth?url=' + escape(url)
          })
        }
      }
    })
  } else {
      wx.request({
        url: 'https://' + app.globalData.thirdDomain + '/api/user/getUserInfo',
        data: {
          session3rd: app.globalData.session3rd
        },
        success: (res) => {
          if (res.data.code == 1) {
            console.log("状态未过期===========================", res)
            goToWebView(url)
          } else if (res.data.code == 0) {
            console.log("状态过期,重新登录===========================", res)
            wx.login({
              success(res) {
                app.globalData.code = res.code;
                wx.getUserInfo({
                  success(resuserinfo) {
                    //登录第三方系统返回用户已留存的信息
                    wx.request({
                      url: 'https://' + app.globalData.thirdDomain + '/api/wechat',
                      data: {
                        code: res.code,
                        encryptedData: resuserinfo.encryptedData,
                        rawData: resuserinfo.rawData,
                        iv: resuserinfo.iv,
                        signature: resuserinfo.signature,
                      },
                      success: function (result) {
                        console.log('result', result);
                        //记录session3rd到app.globalData
                        app.globalData.session3rd = result.data.data.session3rd;
                        app.globalData.realname = result.data.data.user_info.realname;
                        app.globalData.mobile = result.data.data.user_info.mobile;
                        app.globalData.credential_id = result.data.data.user_info.credential_id;
                        wx.setStorage({
                          key: 'session3rd',
                          data: result.data.data.session3rd,
                        })
                        console.log(app.globalData.session3rd);
                        goToWebView(url)
                      }
                    })
                  },
                  fail(e) {
                    console.log(e);
                    wx.navigateTo({
                      url: '/pages/auth/auth?url=' + escape(url)
                    })
                  }
                })
              }
            });
          }
        }
    })
  }
}

function goToWebView(url) {
  let toUrl = '';
  if (url.indexOf("?") == -1) {
    if (url == 'https://queuing.nanjingdata.cn/booking/index') {
      toUrl = escape(url + '-systemid-10001-userid-' + base.base64.encode(app.globalData.userInfo.openid) + '-myToken-' + secret.md5Test(app.globalData.userInfo.openid) + '.html')
      // toUrl = escape(url)
    } else {
      toUrl = escape(url + '?code=B&wechatArgs=' + app.globalData.session3rd)
    } 
  } else {
    toUrl = escape(url + '&code=B&wechatArgs=' + app.globalData.session3rd)
  }
  if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + toUrl
    })
  } else {
    console.log(app.globalData)
    //在auth页面重新拼接session3rd
    wx.navigateTo({
      url: '/pages/auth/auth?url=' + escape(url)
    })
  }
}

//最近使用
export function latestUsed(e) {
  let globalLatestUsed = app.globalData.latestUsed;
  if (e.currentTarget.dataset.index != undefined && e.currentTarget.dataset.itemsindex != undefined) {
    var latest = [e.currentTarget.dataset.index, e.currentTarget.dataset.itemsindex]
    let flag = 0;
    let index = 0;
    for (let i = 0; i < globalLatestUsed.length; i++) {
      if (globalLatestUsed[i].toString() == latest.toString()) {
        flag = 1;
        index = i;
        break;
      }
    }
    if (flag == 1) {
      console.log(globalLatestUsed[index])
      globalLatestUsed.unshift(globalLatestUsed[index]);
      globalLatestUsed.splice(index + 1, 1);
      console.log(globalLatestUsed)
    } else if (flag == 0) {
      globalLatestUsed.unshift(latest);
      globalLatestUsed.pop();
    }
  }
  // 判断，如果在最近使用下点击事项
  if (e.currentTarget.dataset.latest != undefined) {
    let index = e.currentTarget.dataset.latest;
    globalLatestUsed.unshift(globalLatestUsed[index]);
    globalLatestUsed.splice(e.currentTarget.dataset.latest + 1, 1);
  }
}

export function navTo(e, isNumSearch) {
  console.log("webview=====", app.globalData.isLogin);
  if (app.globalData.isLogin == false) {
    //未登录状态
    wx.showModal({
      title: '请登录',
      content: '登录后即可网上申报和查询办件',
      confirmText: '登录',
      success: (res) => {
        if (res.confirm) {
          if (isNumSearch) {
            if (app.globalData.isLogin == false) {
              wx.navigateTo({
                url: '/pages/auth/auth?url=homePage'
              })
            }
          } else {
            app.globalData.isJump = 1;
            wx.switchTab({
              url: '/pages/numSearch/numSearch'
            })
          }
        }
      }
    })
  } else {
    wx.navigateTo({
      url: e.currentTarget.dataset.id,
    })
  }
}