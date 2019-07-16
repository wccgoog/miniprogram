import mockCardList from './card-list.mock';
const serviceUrl = '';

/**
 * 服务层替换为上线后的正式接口请求
 * my.httpRequest(),参考文档地址 https://docs.alipay.com/mini/api/network
 */
export default async function getCardList(param = {}) {
  // 异步请求示例代码
  // return new Promise((resolve, reject) => {
  //   my.startLoading();
  //   my.httpRequest({
  //     url: 'http://httpbin.org/post',
  //     method: 'POST',
  //     data: {
  //       from: '支付宝',
  //       production: 'AlipayJSAPI',
  //     },
  //     dataType: 'json',
  //     success: function(res) {
  //       resolve(res);
  //       my.alert({content: 'success'});
  //     },
  //     fail: function(res) {
  //       reject(res);
  //       my.alert({content: 'fail'});
  //     },
  //     complete: function(res) {
  //       my.hideLoading();
  //     }
  //   });
  // });

  // 样例中只返回cardList的mock数据
  return mockCardList;
}
