// pages/contentDetail2/contentDetail2.js
Page({
  data: {
    i: 1,
    wordsHeight: "",
    animation: {},
    //顶部栏
    currentTab: 0,
    //scroll-view跳转
    'toView': '',
    data: '',
    // 下载文件
    table_down_server: null,
    entrust_letter: null,
    result_type: null,
    //流程图
    treeImg: null,
    //办理材料
    material: null,
    //事项ID
    id:null
  },
  //点击查看流程图
  priviewImg() {
    var _this = this;
    wx.previewImage({
      current: _this.data.treeImg, // 当前显示图片的http链接
      urls: [_this.data.treeImg] // 需要预览的图片http链接列表
    })
  },
  //点击下载文件
  download(e) {
    var _this = this;
    if (e.currentTarget.dataset.id == 1) {
      console.log("进入11111")
      if (_this.judgmentType(_this.data.table_down_server) == ".jpg") {
        wx.previewImage({
          current: _this.data.table_down_server, // 当前显示图片的http链接
          urls: [_this.data.table_down_server] // 需要预览的图片http链接列表
        })
        return;
      }
      this.publicDownload(this.data.table_down_server);
    } else if (e.currentTarget.dataset.id == 2) {
      console.log("进入22222")
      if (_this.judgmentType(_this.data.entrust_letter) == ".jpg") {
        wx.previewImage({
          current: _this.data.entrust_letter, // 当前显示图片的http链接
          urls: [_this.data.entrust_letter] // 需要预览的图片http链接列表
        })
        return;
      }
      this.publicDownload(this.data.entrust_letter);
    } else if (e.currentTarget.dataset.id == 3) {
      console.log("进入33333")
      if (_this.judgmentType(_this.data.result_type) == ".jpg") {
        wx.previewImage({
          current: _this.data.result_type, // 当前显示图片的http链接
          urls: [_this.data.result_type] // 需要预览的图片http链接列表
        })
        return;
      }
      this.publicDownload(this.data.result_type);
    }
  },
  //下载的公共方法
  publicDownload(url) {
    wx.showLoading({
      title: '下载中...',
    })
    wx.downloadFile({
      url: url,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            wx.hideLoading();
          }
        })
      }
    })
  },
  //判断文件类型
  judgmentType(str) {
    var ext = null;
    var name = str.toLowerCase();
    var i = name.lastIndexOf(".");
    if (i > -1) {
      var ext = name.substring(i);
    }
    return ext;
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    let current = e.target.dataset.current;
    this.setData({
      toView: current,
    })
    console.log("toView:" + this.data.toView);
  },
  onLoad: function (options) {
    console.log(options)
    //显示加载效果
    wx.showLoading({
      title: '加载中',
    })
    //发送请求
    var _this = this;
    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/affair/getInfo',
      data: {
        affair_id: options.id
      },
      method: 'GET',
      success: function (res) {
        _this.setData({
          data: res.data.data,
          // material: res.data.data.material,
          // table_down_server: res.data.data.table_down_server,
          entrust_letter: res.data.data.entrust_letter,
          // result_type: res.data.data.result_type,
          treeImg: res.data.data.tree_img,
          id: res.data.data.id,
        })
      },
      fail: function (res) {
        console.log("fail");
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  //点击进入导航图
  goMapImg(){
    wx.navigateTo({
      url: '../hall/hall?id='+this.data.id
    });
  }
})