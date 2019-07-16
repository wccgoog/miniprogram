// pages/hall/hall.js
Page({
  data: {
    data:null
  },
  onLoad: function (options) {
    console.log(options);
    var _this=this;
    let inParam = wx.getStorageSync("in")
    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/map/getMap',
      data: {
        in: inParam,
        affair_id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          data: res.data.data.data
        })
      }
    })
  },
  //点击查看
  previewImg(e){
    wx.previewImage({
      current: e.currentTarget.dataset.imgpath, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.imgpath] // 需要预览的图片http链接列表
    })
  }
})