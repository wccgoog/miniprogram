Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              console.log(res)
            }
          })
        } else {
          console.log(res)
          wx.login({
            success(res) {

              wx.getUserInfo({
                success(resuserinfo) {
                  wx.request({
                    url: 'https://jbzw.qimixi.net/api/wechat',
                    data: {
                      code: res.code,
                      encryptedData: resuserinfo.encryptedData,
                      rawData: resuserinfo.rawData,
                      iv: resuserinfo.iv,
                      signature: resuserinfo.signature,
                    },
                    success: function(result) {
                      var res = result.data;
                      console.log(res);
                      wx.setStorage({
                        key: 'session3rd',
                        data: res.data.session3rd,
                      })
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId

    //   }
    // })
  },
  authinfo: function(res) {
    wx.getStorage({
      key: 'session3rd',
      success: function(storageres) {
        wx.request({
          url: 'https://jbzw.qimixi.net/api/wechat_pay/getCredentialInfo',
          data: {
            auth_token: res.detail.auth_token,
            session3rd: storageres.data
          },
          success: function(result) {
            var res = result.data;
            console.log('authinfo---', res);
          }
        })
      },
    })
  }
})