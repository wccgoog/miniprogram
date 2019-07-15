// pages/homePage/homePage.js
//获取应用实例  
import {
  webView,latestUsed
} from '../../utils/webView.js'

const app = getApp()
Page({
  data: {
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
    itemList: [
      //   {
      //   title: "社会保障",
      //   bOrC: 0,
      //   items: [{
      //     dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/handicapped/index.html",
      //     src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289496383.png",
      //     name: "智慧残联",
      //     detail: "残疾人政策、助残、就业服务"
      //   },
      //   {
      //     dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/lowSecurity/templates/index.html",
      //     src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993197712.jpg",
      //     name: "低保申请",
      //     detail: "江北新区本地户籍低保在线申请"
      //   }
      //   ]
      // },

      {
        title: "城市环保",
        bOrC: 1,
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
          src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
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
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=JFJ00001&types=c&isOne=A",
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
          src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
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
    itemList1: [{
        title: "社会保障",
        bOrC: 0,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/handicapped/index.html",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289496383.png",
            name: "智慧残联",
            detail: "残疾人政策、助残、就业服务"
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/lowSecurity/templates/index.html",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993197712.jpg",
            name: "低保申请",
            detail: "江北新区本地户籍低保在线申请"
          }
        ]
      },
      {
        title: "城市环保",
        bOrC: 1,
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=H",
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1557993078676.png",
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
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=JFJ00001&types=c&isOne=A",
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
            src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559289514896.png",
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
  },
  // loading显示方法
  loading: function() {
    wx.showLoading({
      title: 'XXX',
    })
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    var _this = this;
    //初始加载获取个人服务下方主题和部门数据
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/index?type=1',
      data: "",
      method: 'GET',
      success: function(res) {
        _this.setData({
          personal_topic: res.data.data.topic,
          personal_department: res.data.data.department
        })
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading()
      }
    })
    //请求首页banner图
    wx.request({
      url: 'https://jbzw.qimixi.net/api/banner/bannerList',
      data: "",
      method: 'POST',
      success: function(res) {
        let list = res.data.data.list;
        let listArr = [];
        for (var i in list) {
          listArr.push(list[i].image)
        }
        _this.setData({
          background: listArr
        })
      }
    })
  },
  onShow(e) {
    var _this = this;
    //最近使用
    var latestUsedItems=[];
    app.globalData.latestUsed.forEach(
      (value, index) => {
        latestUsedItems[index]=_this.data.itemList[value[0]].items[value[1]];
      }
    )
    this.setData({
      items: latestUsedItems
    })

    if (app.globalData.nickName == app.globalData.constNickName && app.globalData.avatar == app.globalData.constAvatar && app.globalData.isAuth == true) {
      //从auth页面跳转回homePage,isAuth状态消耗掉,变回false
      app.globalData.isAuth = false;
      //
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
    //本来想用animation做办事一张图的圆形图标的飘动效果,但是有一些问题
    // let animation = wx.createAnimation({
    //   duration:20000,
    //   timingFunction:'linear'
    // });
    // animation.translate(100,100).step();
    // this.setData({
    //   picAnimation:animation.export()
    // });
    // console.log(this.data.picAnimation)

    //首页小圆圈漂浮,setData性能消耗过多

    // console.log(wx.getSystemInfoSync().windowWidth)
    // var n = setInterval(() => {
    //   if (_this.data.x == wx.getSystemInfoSync().windowWidth - 52) {
    //     _this.setData({
    //       delta: -_this.data.delta
    //     })
    //   } else if (_this.data.x == 0) {
    //     _this.setData({
    //       delta: -_this.data.delta
    //     })
    //   }
    //   _this.setData({
    //     x: _this.data.x + _this.data.delta,
    //     y: _this.data.y + _this.data.delta,
    //   })
    // }, 100);
    // this.setData({
    //   intervalNum: n
    // })
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
  //点击tab切换
  swichNav: function(e) {
    this.setData({
      dataId: e.target.dataset.id
    });
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    // if (e.detail.current == 1) {
    //   this.company(2);
    // } else {
    //   this.company(1);
    // }
  },
  //点击企业服务，获取企业服务下方主题和部门数据
  company(type) {
    var _this = this;
    _this.currentFirstCatalog = type
    wx.request({
      url: 'https://jbzw.qimixi.net/api/Index/index?type=' + type,
      data: "",
      method: 'GET',
      success: function(res) {
        _this.setData({
          business_topic: res.data.data.topic,
          business_department: res.data.data.department
        })
      },
      fail: function(res) {},
      complete: function(res) {
        wx.hideLoading()
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
      url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=' + this.data.secondCatalog
    });
  },
  // 更多
  goMore(e) {
    if (this.data.currentTab == 0) {
      wx.navigateTo({
        url: '../more/more?currentId=' + this.data.currentTab + '&typeId=' + e.currentTarget.dataset.type + "&firstCatalog=1"
      })
    } else if (this.data.currentTab == 1) {
      wx.navigateTo({
        url: '../more/more?currentId=' + this.data.currentTab + '&typeId=' + e.currentTarget.dataset.type + "&firstCatalog=0"
      })
    }
  },
  onePic() {
    wx.navigateTo({
      url: '/pages/onePic/onePic',
    })
  },
  toApplyPage() {
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  },
  toWebView(e) {
    webView(e);
  },
  toApply() {
    wx.navigateTo({
      url: '/pages/apply/apply'
    })
  },
  log() {
    console.log(this.data)
  }
})