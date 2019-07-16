// pages/suggestion/suggestion.js
import {
  webView,
  navTo
} from '../../utils/webView.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [{
      title: '办事一本通',
      items: [{
          dataId: "/pages/showPic/showPic?path=3-10.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/doing.png",
          name: "我要开公司",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/showPic/showPic?path=11-15.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "我要入园区",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/picList/picList?path=17-19.jpg,20-23.jpg,24-26.jpg,27-28.jpg,29-33.jpg,34-48.jpg&title=立项用地规划许可阶段Q%26A,工程建设许可阶段Q%26A,施工许可阶段Q%26A,竣工验收阶段Q%26A,一图看懂项目审批十大举措,项目分类审批流程图",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "我要建项目",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/showPic/showPic?path=49-50.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "我要网上办",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/showPic/showPic?path=51-52.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "审批职能",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/showPic/showPic?path=53.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "部门职能",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/showPic/showPic?path=54-58.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "集中事项清单",
          bindType: 'navTo'
        },
        {
          dataId: "/pages/showPic/showPic?path=59-60.jpg",
          src: "https://jbxqalipay.nanjingdata.cn/image/done.png",
          name: "咨询电话",
          bindType: 'navTo'
        },
      ]
    }, ],
    itemListWebView: [
      {
      title: '意见反馈',
      items: [
        {
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/feedback/templates/historyRecord.html",
          src: "https://jbxqalipay.nanjingdata.cn/image/QrCode.png",
          name: "反馈列表",
          bindType: 'toWebView'
        },
        {
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/feedback/templates/feedback.html",
          src: "https://jbxqalipay.nanjingdata.cn/image/QrCode.png",
          name: "我要反馈",
          bindType: 'toWebView'
        },
      ]
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad', options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  navTo(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.id,
    })
  },
  toWebView(e) {
    webView(e)
  },
})