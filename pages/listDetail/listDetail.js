// pages/listDetail/listDetail.js
import utils from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstCatalog:'',
    secondCatalog:'',
    title:'',
    list:'',
    id:'',
    // 控制图片的显示隐藏
    imgHide:true,
    //判断是否扫码进入
    scanEnter: null
  },
  goListDetail(e){
    this.setData({
      id: e.currentTarget.dataset.id,
    })
    if (this.data.scanEnter==1){
      wx.navigateTo({
        url: '../guide/guide?id=' + this.data.id + '&scanEnter=1'
      });
      return;
    }
    wx.navigateTo({
      url: '../guide/guide?id=' + this.data.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("listDetail--onLoad:",options)
    if (options.scanEnter){
      this.setData({
        scanEnter: options.scanEnter,
      })
    }
    this.setData({
      firstCatalog: options.firstCatalog,
      secondCatalog: options.secondCatalog,
    })

    //显示加载效果
    wx.showLoading({
      title: '加载中',
    })
    var _this = this;
    if (options.secondCatalog.includes('d')){
      wx.request({
        url: 'https://jbzwnew.qimixi.net/api/department/totalList',
        data: {
          dep_id: this.data.secondCatalog.slice(1),
          page_num: 1,
          limit:100,
        },
        method: 'GET',
        success: function (res) {
          if (res.data.data.total_list == "" || res.data.data.total_list == null) {
            _this.setData({
              imgHide: false
            })
          } else {
            _this.setData({
              imgHide: true
            })
          }
          _this.setData({
            title: res.data.data.title,
            list: res.data.data.total_list
          })
        },
        fail: function (res) {
          console.log("fail");
        },
        complete: function (res) {
          wx.hideLoading()
          console.log('submit complete');
        }
      }) 
    }else{
      wx.request({
        url: 'https://jbzwnew.qimixi.net/api/topic/totalList',
        data: {
          topic_id: this.data.secondCatalog.slice(1),
          page_num: 1,
          limit: 100,
        },
        method: 'GET',
        success: function (res) {
          console.log("listDetail.js", res.data.data)
          if (res.data.data.total_list == "" || res.data.data.total_list == null) {
            _this.setData({
              imgHide: false
            })
          } else {
            _this.setData({
              imgHide: true
            })
          }
          _this.setData({
            title: res.data.data.title,
            list: res.data.data.total_list
          })
        },
        fail: function (res) {
          console.log("fail");
        },
        complete: function (res) {
          wx.hideLoading()
          console.log('submit complete');
        }
      }) 
    }

  },
})