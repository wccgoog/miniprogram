// pages/auth/auth.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoShow: true,
    authShow: true,
    mobileShow: true,
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //消耗掉isJump状态
    app.globalData.isJump = 0;
    if (options) {
      console.log("auth.js.options", options);
      this.setData({
        url: unescape(options.url)
      });
    }
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
  getPhoneNumber(res) {
    var that = this;
    console.log("getPhoneNumber:", res);
    //记录encryptedData,iv 现在暂时用不到了2019/5/19
    // app.globalData.encryptedData = res.detail.encryptedData;
    // app.globalData.iv = res.detail.iv;
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
                toUrl = escape(url + '?code=B&wechatArgs=' + storageres.data)
              } else {
                toUrl = escape(url + '&code=B&wechatArgs=' + storageres.data)
              }
              if (app.globalData.realname && app.globalData.mobile && app.globalData.credential_id) {
                console.log(toUrl)
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
    }
    var that = this;
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        console.log(storageres);
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
            that.setData({
              authShow: false
            })
          }
        })
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },
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
            console.log(res);
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