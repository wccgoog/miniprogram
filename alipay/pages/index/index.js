import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { faceVerify } from '../../utils/faceVerify';
import { webView, latestUsed } from '../../utils/webView';
import { authLogin } from '../../utils/login';

// 获取应用实例
const app = getApp();

Page(store.register({
  data: {
    weatherShow: false,
    weatherData: {},
    avatar: app.globalData.avatar,
    nickName: app.globalData.nickName,
    isLogin: app.globalData.isLogin,
    dataId: 0,
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
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    items: [],
    background: [],
    itemList: [
      {
        title: "综合执法",
        bOrC: 1,
        items: [
          {
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
        items: [
          {
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
        items: [
          {
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
      {
        title: "投资建设",
        bOrC: 1,
        items: [{
           dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=TZXMSP001&types=c&isOne=A",
           src: "https://jbxqalipay.nanjingdata.cn/image/city.png",
           name: "固定资产投资项目节能承诺表",
           detail: "固定资产投资项目节能评估和审查"
         },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=TZXMSP002&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/city.png",
            name: "不宜公开招标项目的批准",
            detail: "不宜公开招标项目的批准"
          }, {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/movehandleItem.html?siteId=1&id=TZXMSP003&types=c&isOne=A",
            src: "https://jbxqalipay.nanjingdata.cn/image/city.png",
            name: "应招标工程不招标的审批",
            detail: "应招标工程不招标的审批"
          }
        ]
      },
      // {
      //   title: "“双创”企业",
      //   bOrC: 1,
      //   items: [{
      //     dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=P",
      //     src: "https://jbxqalipay.nanjingdata.cn/image/film.png",
      //     name: "“双创”企业申报",
      //     detail: "电影单位设立、变更及注销审批"
      //   }
      //   ]
      // },
    ],
    specificZone: [
      {
      title: '婚姻',
      dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/married/templates/marriedIndex.html',
      src: 'https://jbxqalipay.nanjingdata.cn/image/marriage.png',
      onTap: 'toWebView'
    },
      {
      title: '残联',
      dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/handicapped/index.html',
      src: 'https://jbxqalipay.nanjingdata.cn/image/disabled.png',
      onTap: 'toWebView'
    },
    {
      title: '低保',
      dataId: 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/lowSecurity/templates/index.html',
      src: 'https://jbxqalipay.nanjingdata.cn/image/live.png',
      onTap: 'toWebView'
    },
    {
      title: '水务集团',
      dataId: 'https://www.jlwater.com/sso/externalEnter?viewUrl=/bizHandInfo',
      src: 'https://jbxqalipay.nanjingdata.cn/image/shuiwu.png',
      onTap: 'toWebView'
    },
    {
      title: '虚拟养老院',
      dataId: 'https://api.jbxqyl.com/szjb/',
      src: 'https://jbxqalipay.nanjingdata.cn/image/yanglao.png',
      onTap: 'toWebView'
      }
    ]
  },
  onShow() {
    console.log("onShow")
    var _this = this;
    _this.dispatch('onLoginSetUserInfo');
    _this.setData({
      nickName: app.globalData.nickName,
      avatar: app.globalData.avatar,
      isLogin: app.globalData.isLogin
    })

    // if(!app.globalData.latestUse){
    //   return;
    // }
    var latestUsedItems = [];
    app.globalData.latestUsed.forEach(
      (value, index) => {
        latestUsedItems[index] = _this.data.itemList[value[0]].items[value[1]];
      }
    )
    this.setData({
      items: latestUsedItems
    });
  },
  /**
   * 页面加载时，初始化请求
   */
  async onLoad(options) {
    //更新最新的小程序
    const updateManager = my.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      my.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

    var _this = this;
    my.request({
      url: 'https://jbzwnew.qimixi.net/api/banner/bannerList',
      success: function (res) {
        let images = [];
        let callback = function (element) {
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
        console.log("images", images)
        _this.setData({
          background: images
        })
      }
    })
    //和天气
    var nowLocation = '';
    my.getLocation({
      success: (res) => {
        nowLocation = res.latitude + ',' + res.longitude;
        my.request({
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

    // this.dispatch('updateCityTabs');
    this.dispatch('updateLocalAuthCode');
    // this.dispatch('getPageBlocks');
    console.log("index.js---onLoad");
    if (options.url) {
      this.setData({
        url: options.url
      });
    }

    // this.dispatch('loadServiceMarketInfo', {
    //   'pageInstanceId': '201811231110002121111222',
    //   'areaCode': '310100',
    // });
  },
  onLoginSetUserInfo() {
    this.dispatch('onLoginSetUserInfo');
  },
  toWebView(e) {
    var _this = this;
    // this.dispatch('onLoginSetUserInfo');
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
  swichNav: function (e) {
    this.setData({
      dataId: e.target.dataset.id
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  goListDetail(e) {
    let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/listDetail.html?type=1&sid=' + e.currentTarget.dataset.id)
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  },
  goDepartment() {
    let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/gerenzhongxin.html?type=1')
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  },
  goMore(e) {
    let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/goMore.html?type=' + e.target.dataset.first)
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  },
  choose(e) {
    this.setData({
      dataId: e.target.dataset.id
    })
  },
  login() {
    if (!app.globalData.isLogin) {
      my.confirm({
        title: "请登录",
        content: "登录后即可网上申报和查询办件",
        confirmButtonText: "登录",
        success: (res) => {
          if (res.confirm) {
            authLogin();
          }
        },
      });
    } else {
      my.switchTab({
        url: '/pages/personal-center/index',
      });
    }
  },
  navigateTo(e){
    my.navigateTo({
      url:e.target.dataset.id
    })
  },
  // 轮播图效果
    swiperChange(e) {
    let current = e.detail.current;
    // console.log(current, '轮播图')
    let that = this;
    that.setData({
      swiperCurrent: current
    })
  },

  //跳转小程序
  navigateToMiniProgram(e) {
    my.navigateToMiniProgram({
      appId: e.currentTarget.dataset.id,
      path: '',
      // envVersion: 'trial',
      success(res) {
        // 打开其他小程序成功同步触发
        console.log('success')
      }
    })
  }
}));

