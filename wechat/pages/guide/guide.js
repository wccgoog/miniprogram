// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i:1,
    wordsHeight:"",
    animation: {},
    //拿到的数据
    detailList:{},
    detailListTwo:{},
    id:'',
    isFold: true,
    //判断是否扫码进入
    scanEnter:null
  },
  goContDetail(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
    })
    if (this.data.scanEnter == 1) {
      wx.navigateTo({
        url: '../contentDetail2/contentDetail2?id=' + this.data.id
      });
      return;
    }
    wx.navigateTo({
      url: '../contentDetail/contentDetail?id=' + this.data.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("guide.js-options",options)
    if (options.scanEnter) {
      this.setData({
        scanEnter: options.scanEnter,
      })
    }
    //显示加载效果
    wx.showLoading({
      title: '加载中',
    })
    //发送请求
    var _this = this;
    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/total/affairList',
      data: {
        total_id: options.id
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          detailList: res.data.data.total_info,
          detailListTwo: res.data.data.affair_list
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
  },
  //下拉
  down: function () {
    console.log("0000")
    this.setData({
      isFold: !this.data.isFold
    })
  },
  lookAll(e){
    console.log(e)
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.height("30").step()
    this.setData({
      animationData: animation.export()
    })
  }
})