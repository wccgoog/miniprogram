// pages/picList/picList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    let pics = options.path.split(',');
    let titles = unescape(options.title).split(',');
    let itemList=[];
    for(let i=0;i<pics.length;i++){
      itemList.push({path:pics[i],title:titles[i]})
    }
    console.log(itemList)
    this.setData({
      itemList:itemList
    })
},

/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

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
navTo(e){
  my.navigateTo({
    url: '/pages/showPic/showPic?path='+e.currentTarget.dataset.id,
  })
}
})