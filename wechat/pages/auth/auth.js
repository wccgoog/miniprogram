// pages/auth/auth.js
// import encode from '../../utils/base64.js'
var app = getApp()
var secret = require('../../utils/secret.js');
var base = require('../../utils/base64.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoShow: false,
    authShow: true,
    mobileShow: false,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    //消耗掉isJump状态,用户未登录时从其他页面跳转到'我的'页面,isJump为1,这时会自动跳转auth授权页面
    app.globalData.isJump = 0;
    if (options) {
      console.log("auth.js.options", options);
      this.setData({
        url: unescape(options.url)
      });
    }
    wx.getSetting({
      success(res) {
        console.log('-------------------------------')
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          _this.setData({
            userInfoShow: true
          })
        } else {
          wx.getUserInfo({
            success: (resuserinfo) => {
              wx.login({
                success: (res) => {
                  wx.request({
                    url: 'https://' + app.globalData.thirdDomain + '/api/wechat',
                    method: 'GET',
                    data: {
                      code: res.code,
                      encryptedData: resuserinfo.encryptedData,
                      rawData: resuserinfo.rawData,
                      iv: resuserinfo.iv,
                      signature: resuserinfo.signature,
                    },
                    success: function(result) {
                      var res = result.data;
                      app.globalData.userInfo = res.data.user_info;
                      console.log("auth.load.getuserinfo--",res);
                      console.log("app.globalData.userInfo", app.globalData.userInfo);
                      wx.setStorage({
                        key: 'session3rd',
                        data: res.data.session3rd
                      })
                      _this.setData({
                        userInfoShow: false
                      })
                    }
                  })
                },
                fail: (e) => {
                  _this.setData({
                    userInfoShow: true
                  })
                }
              })
            },
            fail: (e) => {
              _this.setData({
                userInfoShow: true
              })
            }
          })
        }
      },
      fail: (e) => {
        _this.setData({
          userInfoShow: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //'获取手机号码'按钮
  getPhoneNumber(res) {
    var that = this;
    console.log("getPhoneNumber:", res);
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        wx.request({
          url: 'https://' + app.globalData.thirdDomain + '/api/wechat_pay/getPhoneNumber',
          data: {
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv,
            session3rd: storageres.data
          },
          success: function(result) {
            app.globalData.mobile = result.data.data.mobile;
            app.globalData.userInfo = res.data.user_info;
            var url = that.data.url;
            console.log("---------------", url)
            if (url == 'homePage') {
              wx.getUserInfo({
                success(resuserinfo) {
                  let userInfo = JSON.parse(resuserinfo.rawData)
                  // 获取用户昵称和头像,如果
                  app.globalData.nickName = userInfo.nickName;
                  app.globalData.avatar = userInfo.avatarUrl;
                  if (app.globalData.nickName == app.globalData.constNickName && app.globalData.avatar == app.globalData.constAvatar) {
                    app.globalData.isLogin = false;
                  } else {
                    app.globalData.isLogin = true;
                  }
                  wx.navigateBack({
                    delta: 1
                  });
                }
              })
            } else {
              var toUrl = '';
              if (url.indexOf("?") == -1) {
                if (url == 'https://queuing.nanjingdata.cn/booking/index'){
                  var base = new Base64(); 
                  toUrl = escape(url + '-systemid-10001-userid-' + base.base64.encode(app.globalData.userInfo.openid) + '-myToken-' + secret.md5Test(app.globalData.userInfo.openid) + '.html')
                  // toUrl = escape(url)
                } else {
                  toUrl = escape(url + '?code=B&wechatArgs=' + storageres.data)
                } 
              }
               else {
                  toUrl = escape(url + '&code=B&wechatArgs=' + storageres.data)
              }
              if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
                console.log('toUrl--------------',toUrl)
                wx.navigateTo({
                  url: '/pages/webview/webview?url=' + toUrl
                })
              }
            }
          }
        })
      },
    })
  },

  //'实名认证'按钮
  authinfo(res) {
    console.log("支付密码", res)
    if (res.detail.errMsg == "openRealnameAuth:cancel") {
      // 取消输入支付密码
      app.globalData.isLogin = false;
      app.globalData.nickName = app.globalData.constNickName;
      app.globalData.avatar = app.globalData.constAvatar;
      wx.navigateBack({
        delta: 2
      })
      return
    }
    var that = this;
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        console.log('storageres',storageres);
        wx.request({
          url: 'https://' + app.globalData.thirdDomain + '/api/wechat_pay/getCredentialInfo',
          data: {
            auth_token: res.detail.auth_token,
            session3rd: storageres.data
          },
          success: function(result) {
            console.log(result);
            app.globalData.realname = result.data.data.realname;
            app.globalData.credential_id = result.data.data.credential_id;
            // if (result.data.data.mobile.length <= 10) {
            //   that.setData({
            //     authShow: false
            //   });
            // } else if (result.data.data.mobile.length > 10) {
            //   app.globalData.mobile = result.data.data.mobile;
            //   wx.getUserInfo({
            //     success(resuserinfo) {
            //       let userInfo = JSON.parse(resuserinfo.rawData)
            //       // 获取用户昵称和头像,获取到后,全局变量isLogin就为true,如果没有获取到,全局变量isLogin就为false
            //       app.globalData.nickName = userInfo.nickName;
            //       app.globalData.avatar = userInfo.avatarUrl;
            //       if (app.globalData.nickName == app.globalData.constNickName && app.globalData.avatar == app.globalData.constAvatar) {
            //         app.globalData.isLogin = false;
            //       } else {
            //         app.globalData.isLogin = true;
            //       }
            //       var url = that.data.url;
            //       if (url == 'homePage') {
            //       wx.switchTab({
            //         url: '/pages/homePage/homePage',
            //       })
            //       }else{
            //         var toUrl = '';
            //         if (url.indexOf("?") == -1) {
            //           toUrl = escape(url + '?code=B&wechatArgs=' + storageres.data)
            //         } else {
            //           toUrl = escape(url + '&code=B&wechatArgs=' + storageres.data)
            //         }
            //         if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
            //           console.log(toUrl)
            //           app.globalData.toUrl = toUrl;
            //           wx.switchTab({
            //             url: '/pages/homePage/homePage',
            //           })
            //         }
            //       }
     
            //     }
            //   })
            // }
            if (result.data.data.mobile && result.data.data.mobile.length > 10) {
              app.globalData.mobile = result.data.data.mobile;
              wx.getUserInfo({
                success(resuserinfo) {
                  let userInfo = JSON.parse(resuserinfo.rawData)
                  // 获取用户昵称和头像,获取到后,全局变量isLogin就为true,如果没有获取到,全局变量isLogin就为false
                  app.globalData.nickName = userInfo.nickName;
                  app.globalData.avatar = userInfo.avatarUrl;
                  if (app.globalData.nickName == app.globalData.constNickName && app.globalData.avatar == app.globalData.constAvatar) {
                    app.globalData.isLogin = false;
                  } else {
                    app.globalData.isLogin = true;
                  }
                  var url = that.data.url;
                  if (url == 'homePage') {
                    wx.switchTab({
                      url: '/pages/homePage/homePage',
                    })
                  } else {
                    var toUrl = '';
                    if (url.indexOf("?") == -1) {
                      if (url == 'https://queuing.nanjingdata.cn/booking/index') {
                        var openid = app.globalData.userInfo.openid
                        console.log(openid);
                        toUrl = escape(url + '-systemid-10001-userid-' + base.base64.encode(app.globalData.userInfo.openid) + '-myToken-' + secret.md5Test(openid) + '.html')
                        // toUrl = escape(url)
                      } else {
                        toUrl = escape(url + '?code=B&wechatArgs=' + storageres.data)
                      } 
                    } else {
                      toUrl = escape(url + '&code=B&wechatArgs=' + storageres.data)
                    }
                    if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
                      console.log(toUrl)
                      app.globalData.toUrl = toUrl;
                      wx.switchTab({
                        url: '/pages/homePage/homePage',
                      })
                    }
                  }

                }
              })
            } else {
              that.setData({
                authShow: false
              });
            }
          }
        })
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },

  //'授权'按钮
  userInfo(resuserinfo) {
    var that = this;
    console.log(resuserinfo.detail.userInfo);
    console.log(app.globalData)
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://' + app.globalData.thirdDomain + '/api/wechat',
          method: 'GET',
          data: {
            code: res.code,
            encryptedData: resuserinfo.detail.encryptedData,
            rawData: resuserinfo.detail.rawData,
            iv: resuserinfo.detail.iv,
            signature: resuserinfo.detail.signature,
          },
          success: function(result) {
            var res = result.data;
            app.globalData.userInfo = res.data.user_info;
            // 本地存储
            wx.setStorage({
              key: 'session3rd',
              data: res.data.session3rd,
            })
            that.setData({
              userInfoShow: false
            })
          }
        })
      },
      fail: (e) => {}
    })
  }
})