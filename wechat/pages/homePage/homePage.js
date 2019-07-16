// pages/homePage/homePage.js
//获取应用实例  
import {
  webView,
  latestUsed,
  navTo
} from '../../utils/webView.js'

const app = getApp()

Page({
  data: {
    weatherShow: false,
    weatherData: '',
    avatar: app.globalData.avatar,
    nickName: app.globalData.nickName,
    isLogin: app.globalData.isLogin,
    dataId: 0,
    x: 10,
    y: 140,
    delta: 1,
    //页面配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    //二级目录所用
    firstCatalog: '',
    secondCatalog: '',
    //当前1、个人  2、企业
    currentFirstCatalog: 1,
    // 首页获取数据
    personal_topic: '',
    personal_department: '',
    //企业服务
    business_topic: '',
    business_department: '',
    // banner图
    background: [],
    // banner图相关配置
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    picAnimation: {},
    intervalNum: 0,
    items: [],
    itemList: [{
        title: "综合执法",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=ZHXZZF002&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/shop.png",
            name: "店招标牌备案",
            detail: "对门店的店招标牌备案"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=ZHXZZF001&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/road.png",
            name: "道路损失调查",
            detail: "对道路造成损害（如事故）的损失调查"
          },
        ]
      },
      {
        title: "城市环保",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
            src: "https://jbxqalipay.nanjingdata.cn/image/city.png",
            name: "城市道路绿化",
            detail: "建设单位占道挖掘、修复补偿征收"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=K",
            src: "https://jbxqalipay.nanjingdata.cn/image/garbage.png",
            name: "餐厨垃圾",
            detail: "餐厨垃圾、城市生活垃圾审批"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=J",
            src: "https://jbxqalipay.nanjingdata.cn/image/stbc.png",
            name: "水土保持",
            detail: "建设单位水土保持方案审批与征收"
          }
        ]
      },
      {
        title: "农业发展",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=L",
            src: "https://jbxqalipay.nanjingdata.cn/image/animal.png",
            name: "兽医师注册",
            detail: "兽医师注册、助理执业兽医师备案"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=M",
            src: "https://jbxqalipay.nanjingdata.cn/image/medicine.png",
            name: "农兽药许可",
            detail: "农药、兽药经营许可证核发"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=JFJ00002&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/pipe.png",
            name: "管道事故备案",
            detail: "管道事故应急预案备案"
          },
        ]
      },
      {
        title: "文化生活",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
            src: "https://jbxqalipay.nanjingdata.cn/image/film.png",
            name: "电影放映",
            detail: "电影单位设立、变更及注销审批"
          },
          // {
          //   dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=F",
          //   src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1558009274987.JPG",
          //   name: "文化演艺",
          //   detail: "文化演艺相关事项"
          // }
        ]
      },

    ],
    specificZone: [{
        title: '残联',
        dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/handicapped/index.html',
        src: 'https://jbxqalipay.nanjingdata.cn/image/disabled.png',
        bindType: 'toWebView'
      },
      {
        title: '低保',
        dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/lowSecurity/templates/index.html',
        src: 'https://jbxqalipay.nanjingdata.cn/image/live.png',
        bindType: 'toWebView'
      },
      {
        title: '信用申领',
        dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/creditApply/templates/index.html',
        src: 'https://jbxqalipay.nanjingdata.cn/image/credit.png',
        bindType: 'toWebView'
      },
      {
        title: '水务',
        dataId: 'https://www.jlwater.com/bizHandInfo',
        src: 'https://jbxqalipay.nanjingdata.cn/image/water.jpg',
        bindType: 'toWebViewUnlogin'
      }
    ]
  },
  // loading显示方法
  loading: function() {},
  onLoad: function(options) {
    var _this = this;
    wx.request({
      url: 'https://jbzwnew.qimixi.net/api/banner/bannerList',
      data: "",
      method: 'POST',
      success: function(res) {
        let images = [];
        let callback = function(element) {
          if (element.name.indexOf('/') > -1) {
            if (element.name[0] == 1) {
              element.bindType = 'navigateTo';
              element.name = '/pages' + element.name.slice(1) + element.name.slice(1);
            } else if (element.name[0] == 2) {
              //历史反馈
              element.bindType = 'toWebView';
              element.name = "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/feedback/templates/historyRecord.html";
            } else if (element.name[0] == 3) {
              //我要反馈
              element.bindType = 'toWebView';
              element.name = "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/feedback/templates/feedback.html";
            }
            images.push(element)
          }
        }
        res.data.data.list.forEach(callback);
        console.log(res)
        _this.setData({
          background: images
        })
      }
    })
    //和天气
    var nowLocation = '';
    wx.getLocation({
      success: (res) => {
        nowLocation = res.latitude + ',' + res.longitude;
        wx.request({
          url: 'https://free-api.heweather.net/s6/weather',
          data: {
            location: nowLocation,
            key: 'a02cd8e3c22e4ea489b79d6c80b27b9e'
          },
          success: (res) => {
            console.log(res);
            _this.setData({
              weatherData: res.data.HeWeather6[0],
              weatherShow: true
            })
          }
        });
      }
    });
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  onShow(e) {
    var _this = this;
    //最近使用
    var latestUsedItems = [];
    app.globalData.latestUsed.forEach(
      (value, index) => {
        latestUsedItems[index] = _this.data.itemList[value[0]].items[value[1]];
      }
    )
    this.setData({
      items: latestUsedItems
    });
    this.setData({
      nickName: app.globalData.nickName,
      avatar: app.globalData.avatar,
      isLogin: app.globalData.isLogin
    })
    if (app.globalData.nickName == app.globalData.constNickName && app.globalData.avatar == app.globalData.constAvatar && app.globalData.isAuth == true) {
      //从auth页面跳转回homePage,isAuth状态消耗掉,变回false
      app.globalData.isAuth = false;
      app.globalData.isLogin = false;
      wx.login({
        success(res) {
          app.globalData.code = res.code;
          wx.getUserInfo({
            success(resuserinfo) {
              let userInfo = JSON.parse(resuserinfo.rawData)
              //登录第三方系统返回用户已留存的信息
              app.globalData.nickName = userInfo.nickName;
              app.globalData.avatar = userInfo.avatarUrl;
              if (app.globalData.nickName != app.globalData.constNickName && app.globalData.avatar != app.globalData.constAvatar) {
                app.globalData.isLogin = true;
              } else {
                app.globalData.isLogin = false;
              }
            }
          })
        }
      });
    }
  },
  onHide() {
    // clearInterval(this.data.intervalNum);
  },
  //滑动切换tab
  bindChange: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      dataId: e.detail.current
    });
    if (e.detail.current == 1) {
      this.company(2);
    } else {
      this.company(1);
    }
  },
  toWebView(e) {
    var _this = this;
    //最近使用

    latestUsed(e);
    webView(e);
    setTimeout(() => {
      var latestUsedItems = [];
      app.globalData.latestUsed.forEach(
        (value, index) => {
          latestUsedItems[index] = _this.data.itemList[value[0]].items[value[1]];
        }
      )
      this.setData({
        items: latestUsedItems
      })
    }, 2000)

  },
  login() {
    app.globalData.isJump = 1;
    wx.switchTab({
      url: '/pages/numSearch/numSearch'
    })
  },
  choose(e) {
    this.setData({
      dataId: e.target.dataset.id
    })
  },
  navigateTo(e) {
    wx.navigateTo({
      url: e.target.dataset.id,
    })
  },
  toWebViewUnlogin(e) {
    let toUrl = e.currentTarget.dataset.id;
    toUrl = escape(toUrl);
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + toUrl,
    })
  }
})