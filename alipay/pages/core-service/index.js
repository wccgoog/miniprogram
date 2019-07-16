import store from './store';
import { PAGETYPE } from './constants/interface';
// 获取应用实例
const app = getApp();

Page(store.register({
  onReady() {},
  onShow() {},
  onLoad() {
    // 初始化页面数据
    switch (app.shareData.pagetype) {
      case PAGETYPE.accumulation_fund:
        // 公积金的逻辑
        break;
      case PAGETYPE.social_security:
        // 社保的逻辑
        break;
      case PAGETYPE.traffic:
        // 交通的逻辑
        break;
      default:
        this.dispatch('loadPageData');
    }
  },
}));

