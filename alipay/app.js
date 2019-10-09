import getCityTabs from './services/city-service';
import getPageInstanceBlocks from './services/page-service';
import { getUid } from './utils/index';
import uma from './node_modules/umtrack-alipay/lib/uma.min.js';

App({
  qrCode: '',
  globalData: {
    userInfo: null,
    // 域名加18081端口是因为服务器端nginx做了这个端口的监听,会跳转到测试环境,发布正式版前,需要把这个test字段改为空字符串
    test: ':18081',
    //首页的最近使用功能,使用到的初始数组
    latestUsed: [[1, 0], [1, 1], [1, 2], [3, 0]],
    //初始头像
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OEpRddJBTljCwxpcwDXQ.png',
    //初始姓名栏
    nickName: '请点击此处登录',
    //默认未登录,获取到用户昵称和头像后才会变为true
    isLogin: false,
    //只有在用户未授权的时候,点击登录,才会进入auth界面,在auth界面变为true,跳转回首页时,会获取用户信息,获取后消耗,变回false
    isAuth: false,
    //退出登录后姓名栏,务必与nickName同步修改
    constNickName: '请点击此处登录',
    //退出登录后头像,务必与avatar同步修改
    constAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/OEpRddJBTljCwxpcwDXQ.png',
    //是否从homePage跳转登录
    isJump: 0,
    toUrl:'',
    url:'',
    uid:'',
    uma:'',
  },
  uid: '',
  faceVerifyUrl: '',
  async onLaunch(options) {
    const { query = {} } = options;
    if (query.cityId) {
      this.shareData.cityId = query.cityId;
    }
    if (query.pagetype) {
      this.shareData.pagetype = query.pagetype;
    }
    console.log('app onLaunch: options: ', options);
    // 获取城市列表
    await getCityTabs();
  },
  onShow(options) {
    if (options && options.query) {
      this.qrCode = options.query.qrCode;
    }
    console.log('app onShow option-------------' + JSON.stringify(options));
  },
  onHide() {
    console.log('app onHide');
  },
  onError(msg) {
    console.log('app OnError: ', msg);
  },
  onLaunch() {
   uma.init('5d4a5bb94ca35715bf000092', my);      // 务必填入已注册的appKey，不然将无法统计
  },
  onShow() {
     uma.resume();                    // 请务必引入
  },
    onHide() {
        uma.pause();                  // 请务必引入
    },
 
  
  // const updateManager = my.getUpdateManager()

  // updateManager.onCheckForUpdate(function (res) {
  // // 请求完新版本信息的回调
  // console.log(res.hasUpdate)
  // })

  // updateManager.onUpdateReady(function () {
  // my.confirm({
  //   title: '更新提示',
  //   content: '新版本已经准备好，是否重启应用？',
  //   success: function (res) {
  //     if (res.confirm) {
  //       // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
  //       updateManager.applyUpdate()
  //     }
  //   }
  // })
  // })

  // updateManager.onUpdateFailed(function () {
  // // 新版本下载失败
  // })

});
