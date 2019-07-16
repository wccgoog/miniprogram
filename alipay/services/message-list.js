import { Http } from './base';
import messageCenter from './message-list.mock';
const serviceUrl = '';

/**
 * 服务层替换为上线后的正式接口请求
 * my.httpRequest(),参考文档地址 https://docs.alipay.com/mini/api/network
 */

export async function getMessageList(param = {}) {
  const userInfo = await Http.post('proxy-msg/msgCenter/getMsgList', param);

  // http 请求
  return userInfo;
  // // mock 数据
  // return Promise.resolve(messageCenter);
};

  // 获得是否有未读消息
export async function getReadMessageList(param = {}) {
  const userInfo = await Http.post('proxy-msg/msgCenter/getMsgCount', param);
  // http 请求
  return userInfo;
  // // mock 数据
  // return Promise.resolve(messageCenter);
};
