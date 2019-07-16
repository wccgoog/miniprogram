import { config } from '../config';
// import pollyfill from '../utils/pollyfill';

export class Http {

  /**
   * Http get 请求
   */
  static get(url, data) {
    return this.request(url, data, 'GET');
  }

  /**
   * Http post 请求
  */
  static post(url, data) {
    return this.request(url, data, 'POST');
  }

  /**
   * Http request
  */
  static request(url, data, method) {
    return new Promise((resolve, reject) => {
      const apiUrl = this.getTargetApiUrl(url);
      console.info(`接口: ${apiUrl}, 入参：`, data);
      my.httpRequest({
        url: apiUrl,
        method,
        data: JSON.stringify(data),
        dataType: 'json',
        headers: { 'Content-Type': 'application/json' },
        success: function(res) {
          console.info(`接口: ${url}, 出参：`, res.data);
          const code = res.data.rtnCode;
          const response = res.data;
          if (code === '9999') {
            const result = response.rtnData || response;
            resolve(result);
          }

          // if (code === '1001' || code === '1002' || code === '1003' || code === '1004' || code === '1005' || code === '1006'
          // ) {
          //   // console.log(response.rtnMsg.trim().replace(/\ +/g, ""));
          // }
        },
        fail: function(res) {
          console.log(res);
          reject(res);
        },
      });
    });
  }

  static getTargetApiUrl(url) {
    // pollyfill.entries();
    // 获取当前小程序版本 develop（开发版）、trial（体验版）、release（发布版）
    let { envVersion, apiUrlDictionary } = config;
    const { apiURL } = config;

    // 匹配小程序环境
    if (!envVersion) {
      my.getRunScene({
        success(result) {
          envVersion = result.envVersion;
          config.envVersion = envVersion;
        },
      });
    }

    // 根据config配置 生长API Url 字典
    if (!apiUrlDictionary) {
      apiUrlDictionary = [];
      // let apiUrlDictionary2 = [];
      for (let item in apiURL) {
        let pathRewrite = Object.keys(apiURL[item].pathRewrite);
        apiUrlDictionary.push({
          proxyPrefix: apiURL[item].proxyPrefix,
          target: apiURL[item].target,
          regexPrefix: new RegExp(pathRewrite[0]),
          replacePrefix: apiURL[item]['pathRewrite'][pathRewrite[0]],
        });
      }
      // apiUrlDictionary2 = Object.entries(apiURL).map(item => {
      //   const pathRewrite = Object.entries(item[1].pathRewrite);
      //   let aaa = {
      //     proxyPrefix: item[1].proxyPrefix,
      //     target: item[1].target,
      //     regexPrefix: new RegExp(pathRewrite[0][0]),
      //     replacePrefix: pathRewrite[0][1],
      //   }
      //   return aaa;
      // });
      // debugger;
      config.apiUrlDictionary = apiUrlDictionary;
    }
    // debugger

    let apiUrlFilter = apiUrlDictionary.filter((item) => item.regexPrefix.test(url));
    if (apiUrlFilter.length === 1) {
      const host = apiUrlFilter[0].target[envVersion];
      return url.replace(apiUrlFilter[0].regexPrefix, `${host}${apiUrlFilter[0].replacePrefix}`);
    }
  }
}
