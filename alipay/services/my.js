import { config } from '../config';
import { Http } from './base';
import mockUserInfo from './my.mock';
import { setUid } from '../utils/uid';
import { getMessageList, getReadMessageList } from './message-list';

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
  // 获取消息列表参数
  // const requestData = {
  //   channelType: 'OWNER_MSG',
  //   readFlag: 'N',
  //   receiverAccount: userInfo.uid,
  // };
  // 将uid存到本地内存中
  setUid(userInfo.uid);
  // my.setStorageSync()
  // 获取消息列表接口
  // const msgList = await getReadMessageList(requestData);
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
