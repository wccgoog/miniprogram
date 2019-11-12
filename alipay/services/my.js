import { config } from '../config';
import { Http } from './base';
import mockUserInfo from './my.mock';
import { setUid,getUid } from '../utils/uid';
import { getMessageList, getReadMessageList } from './message-list';

const app = getApp();
export async function getAuthUserInfo() {
  const authObj = await getAuthCode('auth_user');
  my.setStorageSync({
    key: 'authCode',
    data: authObj,
  });
  const data = {
    appId: config.appId,
    authCode: authObj.authCode,
  };
  const userInfo = await Http.post('/proxy-user/userauth/info', data);
  console.log('!!!!!!!!!!!!!!!',userInfo)

  // 将uid存到本地内存中
  setUid(userInfo.uid);

  let uid = getUid();
  app.globalData.uid = uid;
  
  my.request({
  url: 'https://jbxqalipay.nanjingdata.cn/userCenter/api/userauth/getUserInfoForH5',
  method:'GET',
  data: {
    'uid' : app.globalData.uid
  },
  success: (res) => {
    app.globalData.rtnData = res.data.rtnData;
    console.log(app.globalData.uid)
    console.log('123214123',res)
    //实名信息入库
    my.request({
    url:'https://jbxqalipay.nanjingdata.cn/test/dispatch_test/restport/euser/euserLogin',
    method: 'POST',
    data: {
      'userName': res.data.rtnData.name,
      'idCard': res.data.rtnData.idCardNo,
      'gender': res.data.rtnData.gender,
      'mobile': res.data.rtnData.phone,
      'source':'A'
    },
    success:function(result) {
      console.log(result)
    }
    })
  },
  });

  return {
    authCode: authObj.authCode,
    userInfo: {
      ...userInfo,
      isMsg: false,
    },
  };
}

export function tradePay(tradeNO) {
  return new Promise((resolve, reject) => {
    my.tradePay({
      tradeNO,
      success: resolve,
      fail: reject,
    });
  });
}

export function getAuthCode(scopes = 'auth_base') {
  return new Promise((resolve, reject) => {
    my.getAuthCode({
      scopes,
      success: resolve,
      fail: reject,
    });
  });
}

async function test() {
  const result = await tradePay('20181073489723984');
}
