import { Http } from './base';
import mockInfo from './modify-info.mock';

/**
 * 服务层替换为上线后的正式接口请求
 * my.httpRequest(),参考文档地址 https://docs.alipay.com/mini/api/network
 */
export default async function modifyUserinfo(param = {}) {
  const userInfo = await Http.post('proxy-user/userauth/sprogUpdate', param);
  // http 请求
  return userInfo;
  // // mock 数据
//   return Promise.resolve(mockInfo);
};
