import { Http } from './base';
import myService from './my-service.mock';

/**
 * 服务层替换为上线后的正式接口请求
 * my.httpRequest(),参考文档地址 https://docs.alipay.com/mini/api/network
 */
export default async function modifyUserinfo(param = {}) {
  // http 请求
  const userInfo = await Http.post('proxy-user/userservice/saveUserService', param);
  // return myService;

  // // mock 数据
  return userInfo;
};
