import { getUid } from './uid'
const app = getApp();

export function faceVerify(url, failUrl) {
  let uid = getUid();
  my.ap.faceVerify({
    bizId: '545689787654767653', //业务请求的唯一标识，需要保证唯一性
    bizType: '2', //业务场景参数，必须填写‘2’，代表刷脸认证  
    success: (res) => {
      if (res.faceRetCode == "1000") {
        let toUrl = escape(url + '?code=A&uid=' + uid)
        my.navigateTo({
          //跳转低保办理页面
          url: '/pages/web-view/index?requestUrl=' + toUrl,
        });
      }
      else {
        let toUrl = escape(failUrl + '?code=A&uid=' + uid)
        my.navigateTo({
          url: '/pages/web-view/index?requestUrl=' + toUrl,
        });
      }
    },
    fail: (res) => {
      my.alert({
        content: JSON.stringify(res),
      });
    }
  });
}