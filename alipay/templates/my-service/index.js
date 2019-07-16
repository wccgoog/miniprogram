import { matchUrl, navigateToRightUrl, getUid } from '../../utils/index';

const app = getApp();

export default {
  goToNavigateUrl(e) {
    let type = e.target.dataset.type;
    let url = e.target.dataset.url;
    let appId = e.target.dataset.appId;
    let uid = getUid();
    console.log("--------------my-service.url:",url)
    console.log("--------------app.url:",app.faceVerifyUrl)
    //如果跳转url为人脸识别需要跳转的h5链接app.faceVerifyUrl,则先跳转人脸识别页面,认证成功后跳转h5
    if(url == app.faceVerifyUrl){
      this.faceVerify();
    }
    else{
      let params = {
        type,
        url,
        appId,
        uid,
      };
      navigateToRightUrl(params);
    } 
    // debugger
  },
  faceVerify(){
    my.ap.faceVerify({
      bizId: '545689787654767653', //业务请求的唯一标识，需要保证唯一性
      bizType: '2', //业务场景参数，必须填写‘2’，代表刷脸认证  
      success: (res) => {
        if(res.faceRetCode == "1000"){
          // my.alert({
          //   content: "刷脸成功" + JSON.stringify(res) + "即将跳转至h5页面https://jbxqalipay.nanjingdata.cn/m/test.html",
          // });
          my.navigateTo({
            url: '/pages/web-view/index?requestUrl=' + app.faceVerifyUrl + '?uid=' + app.uid,
          });
        }
        else{
          my.alert({
              content: "请开启摄像头权限",
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
};
