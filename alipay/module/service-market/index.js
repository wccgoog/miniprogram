import { connect } from 'herculex';
const app = getApp();

Component(connect({
  data: {
    personal_department: [
      {
        name: "行政审批局",
        sid: "d11"
      },
      {
        name: "经济发展局",
        sid: "d6"
      },
      {
        name: "综合治理局",
        sid: "d16"
      },
      {
        name: "社会事业局",
        sid: "d14"
      },
      {
        name: "科技创新局",
        sid: "d7"
      },
      {
        name: "建设与交通局",
        sid: "d2"
      },
      {
        name: "规划与国土局",
        sid: "d15"
      },
      {
        name: "综合行政执法局",
        sid: "d12"
      },
      {
        name: "安全生产监督管理局",
        sid: "d9"
      },
      {
        name: "市场监督管理局",
        sid: "d17"
      },
      {
        name: "公安分局",
        sid: "d5"
      },
      {
        name: "宣传部",
        sid: "d13"
      },
    ],
    personal_topic: [
      {
        name: "社会保障",
        intro: "社会保障",
        sid: "t23",
        logo: "https://jbzw.qimixi.net/uploads/attachment/topic/logo/20180625/2d3f5cd32a7f54b96e7798ac7e5df9f2.png"
      },
      {
        name: "行政缴费",
        intro: "行政缴费",
        sid: "t22",
        logo: "https://jbzw.qimixi.net/uploads/attachment/topic/logo/20180625/39154bdb9f0861f874ff089739ddcfff.png"
      },
      {
        name: "就业创业",
        intro: "就业创业",
        sid: "t21",
        logo: "https://jbzw.qimixi.net/uploads/attachment/topic/logo/20180625/d4fd50c697ad81bc878a3212e41005e9.png"
      },
      {
        name: "职业资格",
        intro: "职业资格",
        sid: "t20",
        logo: "https://jbzw.qimixi.net/uploads/attachment/topic/logo/20180625/ad1da5697ad1c97142b5356fc5686a93.png"
      },
      {
        name: "离职退休",
        intro: "离职退休",
        sid: "t19",
        logo: "https://jbzw.qimixi.net/uploads/attachment/topic/logo/20180625/070676af89e41a11785e9db55a2328c0.png"
      },
      {
        name: "准营准办",
        intro: "准营准办",
        sid: "t18",
        logo: "https://jbzw.qimixi.net/uploads/attachment/topic/logo/20180625/d965ad6c081f033ae1044a50acdae01c.png"
      },
    ],
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
        src: "https://jbxqalipay.nanjingdata.cn/appCenter/upload/image/1559287660191.png",
        name: "水土保持",
        detail: "水土保持相关事项"
      },
      {
        dataId: "https://jbxqalipay.nanjingdata.cn/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=D",
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
  },
  mapStateToProps: {
    isLogin: (state) => {
      return state.$global.isLogin;
    },
    cityInfo: (state) => {
      return state.$global.cityInfo;
    },
    myService: (state) => {
      console.log(state);
      return state.$global.myService;
    },
  },
})({
  methods: {
    onLoginSetUserInfo() {
      this.dispatch('onLoginSetUserInfo');
    },
    onGoMarket() {
      this.dispatch('goToMarket');
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
    goMore() {
      let toUrl = escape('https://jbxqalipay.nanjingdata.cn/m/goMore.html?type=1')
      my.navigateTo({
        url: '/pages/web-view/index?requestUrl=' + toUrl,
      });
    }
  },
}));
