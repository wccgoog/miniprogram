// pages/navigation/navigation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面配置
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    //获取内容
    department: null,
    topic: null,
    isShowNullList: false,
    searchList: []
  },
  onInputFocus() {
    this.setData({
      isShowNullList: true,
    })
  },
  onInputBlur() {
    this.setData({
      isShowNullList: false,
    })
  },
  showDownList(e) {
    // console.log('showDownList.e:', e)
    var _this = this;

    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/search/affairList',
      data: {
        keywords: e.detail.value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // var list = [...res.data.data.department, ...res.data.data.topic]
        _this.setData({
          searchList: res.data.data.list
        })
        console.log('searchList数据：', _this.searchList)
      }
    })
  },
  //点击进入列表
  goListDetail(e) {
    if (this.data.currentTab == 0) {
      this.setData({
        firstCatalog: 1,
        secondCatalog: e.currentTarget.dataset.id,
      })
    } else if (this.data.currentTab == 1) {
      this.setData({
        firstCatalog: 2,
        secondCatalog: e.currentTarget.dataset.id,
      })
    }
    wx.navigateTo({
      url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=' + e.currentTarget.dataset.id + '&scanEnter=1'
    });
  },
  //进入办事指南
  goContentDetail(e) {
    wx.navigateTo({
      url: '../contentDetail2/contentDetail2?id=' + e.currentTarget.dataset.id,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var scan_url = decodeURIComponent(options.q)
    let str = scan_url;
    let p = str.lastIndexOf("/");
    let inParam = str.substring(p + 1, str.length);
    wx.setStorageSync("in", inParam)
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/search/searchIndex?type=1',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          department: res.data.data.department,
          topic: res.data.data.topic
        })
      }
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    var typeId = e.detail.current + 1;
    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/search/searchIndex',
      data: {
        type: typeId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          department: res.data.data.department,
          topic: res.data.data.topic
        })
      }
    })
    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  // 跳转指定页面
  go(e) {
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id;
    if (id == 1) {
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
})