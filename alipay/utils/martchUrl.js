import { config } from '../config/index';

export function matchUrl(code) {
  const blockMaps = new Map([
    [config.sysCode + '_home', '/pages/index/index'], // 首页
    [config.sysCode + '_market', '/pages/market/index'], // 服务市场
    [config.sysCode + '_userSetting', '/pages/userset/index'], // 用户中心
    [config.sysCode + '_modifyEmail', '/pages/modify-info/index?type=email'], // 修改邮箱
    [config.sysCode + '_modifyAddress', '/pages/modify-info/index?type=address'], // 修改地址
    [config.sysCode + '_personalCenter', '/pages/personal-center/index'], // 个人中心
    [config.sysCode + '_coreService', '/pages/core-service/index'],
    [config.sysCode + '_cityList', '/pages/city-list/index'], // 城市选择
    [config.sysCode + '_messageList', '/pages/message-list/message-list'], // 消息中心
    [config.sysCode + '_myCard', '/pages/my-card/index'], // 我的卡片
  ]);

  const codeStr = blockMaps.get(code);
  if (codeStr) {
    return codeStr;
  }
  return code;
}

/**
 * 跳转 支持H5api跳转
 *
 */
export function navigateToRightUrl(params) {
  // debugger
  // params.type = 'H5';
  // params.url = 'alipays://platformapi/startapp?appId=60000155';
  if (params.type === config.linkTypeMap[0]) {
    // 内部H5 外部H5 都是走webview
    // 如果uid存在，就把uid拼入到参数里
    // 判断url 中是否已经已经有？，如果有？就用&如果没有就用？
    const isYou = (params.url).indexOf('?') === -1 ? false : true;

    let _url = isYou ? `${params.url}&uid=${params.uid}` : `${params.url}?uid=${params.uid}`;
    let url = encodeURIComponent(_url);
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + url,
    });
  } else if (params.type === config.linkTypeMap[1]) {
    // 生活号
    // debugger
    my.ap.navigateToAlipayPage({
      // path: 'alipays://platformapi/startapp?appId=60000155',
      path: params.url,
      success: (res) => {
        console.log('生活号', res);
      },
      fail: (err) => {
        console.log('生活号失败', err);
      },
    });
  } else if (params.type === config.linkTypeMap[2]) {
    // 小程序
    my.navigateToMiniProgram({
      appId: params.appId,    // 要跳转的目标小程序appId
      path: params.url,       // 打开的页面路径，如果为空则打开首页
      extraData: {            // 需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据
        // "data": "test",
      },
      success: (res) => {
        console.log(JSON.stringify(res));
      },
      fail: (res) => {
        console.log(JSON.stringify(res));
      },
    });
  } else {
    // H5 小程序 生活号 均没有命中的情况下
    my.navigateTo({
      url: params.url,
    });
  }
}

export function regHttpRequest(str) {
  let reUrl = /^((ht)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/;
  return (reUrl.test(str));
}
