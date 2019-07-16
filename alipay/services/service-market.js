import { globalData } from '../config';
import { Http } from './base';
import serviceMarket from './service-market.mock';

/**
 * 服务层替换为上线后的正式接口请求
 * my.httpRequest(),参考文档地址 https://docs.alipay.com/mini/api/network
 */
export default async function modifyUserinfo(param = {}) {
  // const myService = await Http.post('/proxy-app/serviceCenter/app/getAppPageInfo', param);
  // http 请求
  return serviceMarket;
  // // mock 数据
  // return myService;
};
