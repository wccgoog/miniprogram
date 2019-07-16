import Store from 'herculex';
import getCardList from '../../services/card-list';
import { getAreaList } from '../../utils/index';
import { config } from '../../config/index';

// todo: 契约未知 数据处理层后面再加
export default new Store({
  connectGlobal: true,
  state: {
    cardList: [],
  },
  plugins: [
    'logger',
  ],
  actions: {
    // 请求页面数据
    async loadCardList({ commit, state, dispatch }) {
      let cardList = state.$global.cardList;
      if (!cardList || cardList.length === 0) {
        let cardInfo = my.getStorageSync({
          key: 'blockList', // 缓存数据的key
        });
        if (cardInfo && cardInfo.data && cardInfo.data.blockList.length > 0) {
          cardList = getAreaList(cardInfo.data.blockList, config.pageCode.myCard);
        }
      }
      return commit('updateCardList', {
        cardList,
      });
    },
    /**
     * 跳转卡详情页面
     * 给出直接的样例为开启人脸验证流程
     * 参考芝麻认证验证文档 https://docs.alipay.com/mini/api/zm-service
     */
    async goToSpecialCard() {
      // 请替换如下的biz number参数
      my.startZMVerify({
        bizNo: 'your-biz-no',
        success: (res) => {
          my.alert({ title: 'success:' + JSON.stringify(res) });
        },
        fail: (res) => {
          my.alert({ title: 'fail: ' + JSON.stringify(res) });
        },
      });
    },
  },
});
