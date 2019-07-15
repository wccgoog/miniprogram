// pages/numSearch/numSearch.js
import {
  webView
} from '../../utils/webView.js'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: app.globalData.avatar,
    nickName: app.globalData.nickName,
    isLogin: app.globalData.isLogin,
    items: [{
      dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=S",
      src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397437091.png",
      name: "在办件"
    },
    {
      dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=O",
      src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1552397481205.png",
      name: "办结件"
    },
    ]
  },
  goOfficeList() {
    wx.navigateTo({
      url: '../officeList/officeList'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad", app.globalData)

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
    if (app.globalData.isLogin == false && app.globalData.isJump == 1) {
      wx.navigateTo({
        url: '/pages/auth/auth?url=homePage',
      })
    }
    this.setData({
      nickName: app.globalData.nickName,
      avatar: app.globalData.avatar,
      isLogin: app.globalData.isLogin
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toWebView(e) {
    webView(e)
  },
  login() {
    let that = this;
    wx.navigateTo({
      url: '/pages/auth/auth?url=homePage'
    })
    // wx.login({
    //   success(res) {
    //     app.globalData.code = res.code;
    //     wx.getUserInfo({
    //       success(resuserinfo) {
    //         let userInfo = JSON.parse(resuserinfo.rawData)
    //         console.log(userInfo)
    //         //登录第三方系统返回用户已留存的信息
    //         app.globalData.nickName = userInfo.nickName;
    //         app.globalData.avatar = userInfo.avatarUrl;
    //         app.globalData.isLogin = true;
    //         that.setData({
    //           nickName: app.globalData.nickName,
    //           avatar: app.globalData.avatar,
    //           isLogin: true
    //         })
    //       },
    //       fail(e) {
    //         console.log(e);
    //         wx.navigateTo({
    //           url: '/pages/auth/auth?url=homePage'
    //         })
    //       }
    //     })
    //   }
    // });
  },
  logout() {
    this.setData({
      nickName: app.globalData.constNickName,
      avatar: app.globalData.constAvatar,
      isLogin: false
    });
    app.globalData.nickName = app.globalData.constNickName,
      app.globalData.avatar = app.globalData.constAvatar,
      app.globalData.isLogin = false
    console.log("logout:", app.globalData)
  }
})