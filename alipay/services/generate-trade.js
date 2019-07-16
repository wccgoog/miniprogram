
const serviceUrl = '';

/**
 * 服务层替换为上线后的正式接口请求
 * my.httpRequest(),参考文档地址 https://docs.alipay.com/mini/api/network
 */
export default function getTradeNO(param = {}) {
  // 样例中只返回getTradeNO的模拟数据
  return new Promise((resolve) => {
    resolve('2018092022001493101005570951');
  });
}
