import { getUid } from './uid'
import { authLogin } from './login'
const app = getApp();

export function webView(e) {
  latestUsed(e);
  let url = e.currentTarget.dataset.id;
  let uid = getUid();
  app.globalData.uid = uid;
  app.globalData.url=url;
  if (app.globalData.isLogin) {
   
    let toUrl = '';
    // let url = e.currentTarget.dataset.id;
    if (url.indexOf("?") == -1) {
      toUrl = escape(url + '?code=A&uid=' + uid)
    } 
    // else if(url == 'https://www.jlwater.com/sso/externalEnter?viewUrl=/bizHandInfo') {
    //   var cardId = app.globalData.userInfo.credential_id
    //   console.log('cardId',cardId)
    //   toUrl = escape(url + '?code=B&wechatArgs=' + base.base64.encode(cardId))
    // } 
    else {
      toUrl = escape(url + '&code=A&uid=' + uid)
    }
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + toUrl,
    });
  } else {
    console.log("未登录");
    my.confirm({
      title: "请登录",
      content: "登录后即可网上申报和查询办件",
      confirmButtonText: "登录",
      success: (res) => {
        if (res.confirm) {
          console.log(res.confirm);

          authLogin();
        }
      },
    });
  }
}

//最近使用
export function latestUsed(e) {
  let globalLatestUsed = app.globalData.latestUsed;
  if (e.currentTarget.dataset.index != undefined && e.currentTarget.dataset.itemsindex != undefined) {
    var latest = [e.currentTarget.dataset.index, e.currentTarget.dataset.itemsindex]
    let flag = 0;
    let index = 0;
    for (let i = 0; i < globalLatestUsed.length; i++) {
      if (globalLatestUsed[i].toString() == latest.toString()) {
        flag = 1;
        index = i;
        break;
      }
    }
    if (flag == 1) {
      globalLatestUsed.unshift(globalLatestUsed[index]);
      globalLatestUsed.splice(index + 1, 1);
      console.log(globalLatestUsed)
    } else if (flag == 0) {
      globalLatestUsed.unshift(latest);
      globalLatestUsed.pop();
    }
  }

  if (e.currentTarget.dataset.latest != undefined) {
    let index = e.currentTarget.dataset.latest;
    globalLatestUsed.unshift(globalLatestUsed[index]);
    globalLatestUsed.splice(parseInt(index) + 1, 1);
  }
}

export function navTo(e, callback) {
  if (app.globalData.isLogin) {
    my.navigateTo({
      url: e.currentTarget.dataset.id
    })
  } else {
    my.confirm({
      title: "请登录",
      content: "登录后即可网上申报和查询办件",
      confirmButtonText: "登录",
      success: (res) => {
        if (res.confirm) {
          my.showLoading({
            content: '加载中...',
          });
          authLogin(callback);
        }
      },
    });
  }
}