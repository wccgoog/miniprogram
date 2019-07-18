Page({
  data: {
    x: 400,
    y: 20,
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
    background: [],
  },
  onLoad() {
    var _this = this;
    //轮播图
    my.request({
      url: 'https://jbzwnew.qimixi.net/api/banner/bannerList',
      success: function (res) {
        let images = [];
        let callback = function (element) {
          if (element.name.indexOf('/') == -1) {
            element.name = '/pages' + element.name + element.name
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
    my.request({
      url: 'https://jbzwnew.qimixi.net/api/index/index',
      method: "GET",
      data: {
        type: 1
      },
      success: function (res) {
        console.log("===================================", res)
        _this.setData({
          personal_topic: res.data.data.topic,
          personal_department: res.data.data.department
        })
      }
    })
    my.request({
      url: 'https://jbzwnew.qimixi.net/api/index/index',
      method: "GET",
      data: {
        type: 2
      },
      success: function (res) {
        console.log("===================================", res)
        _this.setData({
          business_topic: res.data.data.topic,
          business_department: res.data.data.department
        })
      }
    })
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
  onePic() {
    console.log('onePic')
    my.navigateTo({
      url: '/pages/onePic/onePic',
    })
  },
});
