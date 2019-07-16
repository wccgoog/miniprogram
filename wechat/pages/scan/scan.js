// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  //扫码
  scan(){
    wx.scanCode({
      success: (res) => {
        console.log('222222')
        console.log(res.result)
        if (res.result.indexOf("https://jbzw.qimixi.net/static/img/")>=0){
          let str = res.result;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
          wx.navigateTo({
            url: '../listOfItems/listOfItems?window_id=' + id,
          })
        } else if (res.result.indexOf("https://jbzw.qimixi.net/static/in/") >= 0){
          let str = res.result;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
          wx.navigateTo({
            url: '../navigation/navigation?in=' + id,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  }
})