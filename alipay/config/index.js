import { sysCode } from './sysCode';
import { linkTypeMap } from './url';
import { pageCode } from './pageCode';

export const config = {
  appId: '2019012263112478',
  sysCode,
  linkTypeMap,
  pageCode,
  // sysId: '20181203111000106554485943', // 查询城市的接口
  currentArea: {
    code: '320000',
    name: '江苏省',
    temperature: '27℃',
  },
  envVersion: 'release', // develop（开发版）、trial（体验版）、release（发布版）
  // apiURL: {
  //   develop:{
  //     user: 'http://urcuserdev.alipay-eco.com',
  //     app: 'http://urcappdev.alipay-eco.com',
  //     msg: 'http://urcmsgdev.alipay-eco.com',
  //   },
  //   trial:{
  //     user: '',
  //     app: '',
  //     msg: '',
  //   },
  //   release:{
  //     user: '',
  //     app: '',
  //     msg: '',
  //   }
  // },
  apiURL: {
    // 用户中心
    userService: {
      proxyPrefix: 'proxy-user', // 代理前缀
      pathRewrite: { '^(/?)proxy-user/': 'api/' },
      target: {
        // 开发版本
        develop: 'http://urcuserdev.alipay-eco.com',
        // 体验版本
        trial: 'http://urcusertest.alipay-eco.com',
        // 发布版本
        release: 'http://jbxqalipay.nanjingdata.cn:18099/',
      },
    },
    // 服务中心
    appService: {
      proxyPrefix: 'proxy-app', // 代理前缀
      pathRewrite: { '^(/?)proxy-app/': 'api/' },
      target: {
        // 开发版本
        develop: 'http://urcappdev.alipay-eco.com',
        // 体验版本
        trial: 'http://urcapptest.alipay-eco.com',
        // 发布版本
        release: 'http://jbxqalipay.nanjingdata.cn:18088/',
      },
    },
    // 消息中心
    msgService: {
      proxyPrefix: 'proxy-msg', // 代理前缀
      pathRewrite: { '^(/?)proxy-msg/': 'api/' },
      target: {
        // 开发版本
        develop: 'http://urcmsgdev.alipay-eco.com',
        // 体验版本
        trial: 'http://urcmsgtest.alipay-eco.com',
        // 发布版本
        release: 'http://jbxqalipay.nanjingdata.cn:18088/',
      },
    },
  },
};
