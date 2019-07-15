// pages/listOfItems/listOfItems.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headInfo:null,
    list:null,
    isFold: true
  },
  // 跳转指定页面
  go(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    if(id==1){
      console.log("进入1")
      wx.switchTab({
        url: '../homePage/homePage',
      })
    } else if (id == 2) {
      console.log("进入2")
      wx.switchTab({
        url: '../scan/scan',
      })
    } else if (id == 3) {
      console.log("进入3")
      wx.switchTab({
        url: '../numSearch/numSearch',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.q) {
      var scan_url = decodeURIComponent(options.q)
      let str = scan_url;
      let p = str.lastIndexOf("/");
      let id = str.substring(p+1, str.length);
      var _this = this;
      wx.request({
        url: 'https://jbzwnew.qimixi.net/api/window/affairList',
        data: {
          window_id: id
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          _this.setData({
            list: res.data.data.list,
            headInfo: res.data.data.window_info
          })
        }
      })
    }else{
      var _this = this;
      wx.request({
        url: 'https://jbzwnew.qimixi.net/api/window/affairList',
        data: {
          window_id: options.window_id
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          _this.setData({
            list: res.data.data.list,
            headInfo: res.data.data.window_info
          })
        }
      })
    }
  },
  gotoContentDetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../contentDetail/contentDetail?id='+e.currentTarget.dataset.id,
    })
  },
  //展开查看更多
  down(e) {
    this.setData({
      isFold: !this.data.isFold
    })
  },
})