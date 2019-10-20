import store from './store';
import information from '/templates/information/';
import credentials from '/templates/credentials/';
import serviceCard from '/templates/service-card/';
import myservice from '/templates/my-service/';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { webView, navTo } from '../../utils/webView';
import { authLogin } from '../../utils/login';

// 获取应用实例
const app = getApp();

Page(store.register({
  data: {
    avatar: app.globalData.avatar,
    nickName: app.globalData.nickName,
    isLogin: app.globalData.isLogin,
    itemList: [
      {
        title: '我的办件',
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=S",
          src: "https://jbxqalipay.nanjingdata.cn/image/doing.png",
          name: "在办件",
          bindType: 'toWebView'
        },
        {
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/newOffice.html?workType=O",
          src: "https://jbxqalipay.nanjingdata.cn/image/QrCode.png",
          name: "办结件",
          bindType: 'toWebView'
        }
        ]
      },
      {
        title: '云柜二维码',
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/fileCabinet/templates/pickup.html",
          src: "https://jbxqalipay.nanjingdata.cn/image/pickup.png",
          name: "取件码",
          bindType: 'toWebView'
        },
        {
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/fileCabinet/templates/saveup.html",
          src: "https://jbxqalipay.nanjingdata.cn/image/saveup.png",
          name: "存件码",
          bindType: 'toWebView'
        }
        ]
      },
      {
        title: '建议与反馈',
        items: [{
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/feedback/templates/feedback.html",
          src: "https://jbxqalipay.nanjingdata.cn/image/feedback.png",
            name: "我要反馈",
            bindType: 'toWebView'
          },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/feedback/templates/historyRecord.html",
            src: "https://jbxqalipay.nanjingdata.cn/image/historyRecord.png",
            name: "反馈历史",
            bindType: 'toWebView'
          }
        ]
      },
      {
        title: '问卷调查',
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/questionnaire/templates/questionnaireList.html",
          src: "https://jbxqalipay.nanjingdata.cn/image/questionnair.png",
          name: "填写问卷",
          bindType: 'toWebView'
        },
          {
            dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/questionnaire/templates/questionnairehistoryList.html",
            src: "https://jbxqalipay.nanjingdata.cn/image/questionlist.png",
            name: "历史问卷",
            bindType: 'toWebView'
          },
        ]
      }
    ],
  },
  onReady() { },
  onShow() {
    console.log("personal-center,onShow")
    this.dispatch('onLoginSetUserInfo');
    this.setData({
      nickName: app.globalData.nickName,
      avatar: app.globalData.avatar,
      isLogin: app.globalData.isLogin
    })
  },
  onLoad() {
    this.dispatch('loadPageData');
  },
  wcc() {
    my.navigateTo({
      url: '/pages/faceVerify/faceVerify',
    });
  },
  toFaceVerify() {
    my.navigateTo({
      url: '/pages/faceVerify/faceVerify'
    })
  },
  toWebView(e) {
    if (!app.globalData.isLogin) {
      let _this = this;
      my.confirm({
        title: "请登录",
        content: "登录后即可网上申报和查询办件",
        confirmButtonText: "登录",
        success: (res) => {
          if (res.confirm) {
            my.showLoading({
              content: '加载中...',
            });
            let callback = () => {
              _this.setData({
                nickName: app.globalData.nickName,
                avatar: app.globalData.avatar,
                isLogin: app.globalData.isLogin
              })
            }
            authLogin(callback);
          }
        },
      });
    } else {
      webView(e);
    }
  },
  logout() {
    app.globalData.isLogin = false;
    app.globalData.avatar = app.globalData.constAvatar;
    app.globalData.nickName = app.globalData.constNickName;
    this.dispatch('onLogout')
  },
  login() {
    if (!app.globalData.isLogin) {
      let _this = this;
      my.confirm({
        title: "请登录",
        content: "登录后即可网上申报和查询办件",
        confirmButtonText: "登录",
        success: (res) => {
          if (res.confirm) {
            my.showLoading({
              content: '加载中...',
            });
            let callback = () => {
              _this.setData({
                nickName: app.globalData.nickName,
                avatar: app.globalData.avatar,
                isLogin: app.globalData.isLogin
              })
            }
            authLogin(callback);
          }
        },
      });
    }
  },
  navTo(e) {
    let _this = this;
    let callback = () => {
      _this.setData({
        nickName: app.globalData.nickName,
        avatar: app.globalData.avatar,
        isLogin: app.globalData.isLogin
      })
    }
    navTo(e, callback);
  }
}));

