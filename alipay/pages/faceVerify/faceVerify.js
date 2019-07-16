import { faceVerify } from '../../utils/faceVerify';

const app = getApp();

Page({
  data: {
    url: '',
    time: 0,
    showText: '正在打开刷脸认证,请稍等......'
  },
  onLoad(options) {
    console.log("onload", options);
    if (options.url) {
      this.setData({
        url: options.url
      });
    }
    //以前分为本人申报和代他人申报，后来改了 2019.5.26
    // if (options.type == "attorneys") {
    //   faceVerify('https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/otherApplyInfo.html', 'https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html');
    // } else if (options.type == "myself") {
    //   faceVerify('https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/selfApplyInfo.html', 'https://jbxqalipay.nanjingdata.cn/web/wechat/modules/lowSecurity/templates/index.html');
    // }
    faceVerify('https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/lowSecurity/templates/applyForm.html', 'https://jbxqalipay.nanjingdata.cn' + app.globalData.test + '/web/wechat/modules/lowSecurity/templates/index.html');
  },
  onShow() {
    this.setData({
      time: this.data.time + 1,
    })
    console.log("time", this.data.time);

    //当关闭申报页面回到扫脸空白页时,跳转到首页
    if (this.data.time == 3) {
      my.switchTab({
        url: '../../pages/index/index', // 跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面）。注意：路径后不能带参数
        success: (res) => {
        },
      });
    }
  },
  onHide() {
    this.setData({
      showText: '请稍等......'
    });
  }
});
