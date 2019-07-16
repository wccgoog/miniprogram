// pages/apply/apply.js
import {
  webView
} from '../../utils/webView.js'

const app = getApp()



Page({

  /**
   * 页面的初始数据
   */
  data: {
    //0是个人,1是企业
    dataId: 0,
    moreShow: true,
    items: [
      // {
      //   dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/handicapped/index.html",
      //   src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289496383.png",
      //   name: "智慧残联",
      //   detail: "智慧残联相关事项"
      // },
      // {
      //   dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html",
      //   src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993197712.jpg",
      //   name: "低保申请",
      //   detail: "低保申请相关事项"
      // },

      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
        name: "城市道路绿化",
        detail: "城市道路绿化相关事项"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=K",
        src: "https://jbxqalipay.nanjingdata.cn/image/garbage.png",
        name: "餐厨垃圾",
        detail: "餐厨垃圾相关事项"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=J",
        src: "https://jbxqalipay.nanjingdata.cn/image/stbc.png",
        name: "水土保持",
        detail: "水土保持相关事项"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
        name: "电影放映",
        detail: "电影放映相关事项"
      },
      // {
      //   dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=F",
      //   src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009274987.JPG",
      //   name: "文化演艺",
      //   detail: "文化演艺相关事项"
      // },
      // {
      //   dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=G",
      //   src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009651180.png",
      //   name: "农业林业",
      //   detail: "农业林业相关事项"
      // },
    ],
    itemList: [{
        title: "社会保障",
        bOrC: 0,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/handicapped/index.html",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289496383.png",
            name: "智慧残联",
            detail: "智慧残联相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993197712.jpg",
            name: "低保申请",
            detail: "低保申请相关事项"
          }
        ]
      },
      {
        title: "文化生活",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
            name: "电影放映",
            detail: "电影放映相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=F",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009274987.JPG",
            name: "文化演艺",
            detail: "文化演艺相关事项"
          }
        ]
      },
      {
        title: "城市环保",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
            name: "城市道路绿化",
            detail: "城市道路绿化相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=K",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559287396293.png",
            name: "餐厨垃圾",
            detail: "餐厨垃圾相关事项"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=J",
            src: "https://jbxqalipay.nanjingdata.cn/image/stbc.png",
            name: "水土保持",
            detail: "水土保持相关事项"
          }
        ]
      },
      {
        title: "农林机械",
        bOrC: 1,
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=G",
          src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009651180.png",
          name: "农业林业",
          detail: "农业林业相关事项"
        }]
      }
    ],
    newItemList: [{
        listTitle: "城市道路绿化",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
        num: "5项服务",
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
        list: [{
            title: "砍伐城市树木/迁移古树名木审批",
            dataId: ""
          },
          {
            title: "占用、挖掘城市道路审批",
            dataId: ""
          },
          {
            title: "临时占用城市绿地审批",
            dataId: ""
          },
          {
            title: "树木砍伐、移植、修建补偿费征收",
            dataId: ""
          },
        ]
      },
      {
        listTitle: "餐厨垃圾",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559287396293.png",
        num: "2项服务",
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=K",
        list: [{
            title: "从事城市生活垃圾经营性清扫、收集、运输、处理服务审批",
            dataId: ""
          },
          {
            title: "餐厨废弃物收集、运输、处置许可",
            dataId: ""
          }
        ]
      },
      {
        listTitle: "水土保持",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559287660191.png",
        num: "2项服务",
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=J",
        list: [{
            title: "生产建设项目水土保持方案审批",
            dataId: ""
          },
          {
            title: "水土保持补偿费的征收",
            dataId: ""
          }
        ]
      },
      {
        listTitle: "电影放映",
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
        num: "3项服务",
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
        list: [{
            title: "电影放映单位设立审批",
            dataId: ""
          },
          {
            title: "改建、拆除电影院和放映设施的审批",
            dataId: ""
          },
          {
            title: "电影放映单位变更名称、地址、法定代表人或者主要负责人，或者终止电影放映经营活动的备案",
            dataId: ""
          }
        ]
      }
    ],
    specificZone:[{
      title:'残联',
      dataId: 'https://jbxqalipay.nanjingdata.cn'+app.globalData.test+'/web/wechat/modules/handicapped/index.html',
      src:'https://jbxqalipay.nanjingdata.cn/image/disabled.png'
    },
    {
      title:'低保',
      dataId: 'https://jbxqalipay.nanjingdata.cn'+app.globalData.test+'/web/wechat/modules/lowSecurity/templates/index.html',
      src: 'https://jbxqalipay.nanjingdata.cn/image/live.png'
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("apply.js.onload");
    this.setData({
      moreShow: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("onready")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("apply.js.onshow")
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
  toWebView(e) {
    webView(e)
  },
  toApply() {
    wx.navigateTo({
      url: '/pages/apply/apply'
    })
  },
  choose(e) {
    this.setData({
      dataId: e.target.dataset.id
    })
  },
})