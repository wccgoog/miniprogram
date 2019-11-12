import {
  webView,
  latestUsed,
  navTo
} from '../../utils/webView.js'

const app = getApp()

Page({
  data: {
    dataId: 1,
    itemList: [
      {
        title: "沿江",
        bOrC: 1,
        items: [{
          dataId: "https://jbxqalipay.nanjingdata.cn" + app.globalData.test + "/web/wechat/modules/workGuide/templates/alipayItemList.html?siteId=1&types=c&alipay=1&itemKey=2&itemSource=A&showTerrace=S",
          name: "沿江街道",
          bindType: 'toWebView'
        }
        ]
      }
    ]
  },

  toWebView(e) {
    webView(e);

  }
})

