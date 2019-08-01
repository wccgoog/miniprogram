// pages/contentDetail/contentDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i: 1,
    wordsHeight: "",
    animation: {},
    //顶部栏
    currentTab: 0,
    //scroll-view跳转
    'toView': '',
    data: '',
    isFold0: true,
    isFold1: true,
    isFold2: true,
    isFold3: true,
    isFold4: true,
    isFold5: true,
    isFold6: true,
    // 下载文件
    table_down_server: null,
    entrust_letter: null,
    result_type: null,
    //流程图
    treeImg: null,
    //办理材料
    material: null
  },
  //点击查看流程图
  priviewImg() {
    var _this = this;
    console.log(_this.data.treeImg.file_path)
    wx.previewImage({
      current: 'https://jbzwnew.qimixi.net' +_this.data.treeImg.file_path, // 当前显示图片的http链接
      urls: ['https://jbzwnew.qimixi.net' +_this.data.treeImg.file_path] // 需要预览的图片http链接列表
    })
  },
  //点击下载文件
  download(e) {
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    if (_this.judgmentType(e.currentTarget.dataset.filepath) == ".jpg") {
      wx.previewImage({
        current: e.currentTarget.dataset.filepath, // 当前显示图片的http链接
        urls: [e.currentTarget.dataset.filepath] // 需要预览的图片http链接列表
      })
      wx.hideLoading();
      return;
    }
    if (_this.judgmentType(e.currentTarget.dataset.filepath) == ".pdf" || _this.judgmentType(e.currentTarget.dataset.filepath) == ".doc" || _this.judgmentType(e.currentTarget.dataset.filepath) == ".ppt") {
      wx.downloadFile({
        url: e.currentTarget.dataset.filepath,
        success: function(res) {
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function(res) {
              wx.hideLoading();
              console.log('打开文档成功')
            }
          })
        }
      })
    }
  },
  //下载的公共方法
  publicDownload(url) {
    wx.showLoading({
      title: '下载中...',
    })
    wx.downloadFile({
      url: url,
      success: function(res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function(res) {
            wx.hideLoading();
          }
        })
      }
    })
  },
  //展开查看更多
  down(e) {
    var a = e.currentTarget.dataset.id
    if (a == 0) {
      this.setData({
        isFold0: !this.data.isFold0
      })
    } else if (a == 1) {
      this.setData({
        isFold1: !this.data.isFold1
      })
    } else if (a == 2) {
      this.setData({
        isFold2: !this.data.isFold2
      })
    } else if (a == 3) {
      this.setData({
        isFold3: !this.data.isFold3
      })
    } else if (a == 4) {
      this.setData({
        isFold4: !this.data.isFold4
      })
    } else if (a == 5) {
      this.setData({
        isFold5: !this.data.isFold5
      })
    } else if (a == 6) {
      this.setData({
        isFold6: !this.data.isFold6
      })
    }
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
  /** 
   * 点击tab切换 
   */
  swichNav: function(e) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
      success: function(res) {
        _this.setData({
          data: res.data.data,
          // material: res.data.data.material,
          // table_down_server: res.data.data.table_down_server,
          // entrust_letter: res.data.data.entrust_letter,
          // result_type: res.data.data.result_type,
          treeImg: res.data.data.tree_img,
        })
      },
      fail: function(res) {
        console.log("fail");
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  }
})