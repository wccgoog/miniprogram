import { connect } from 'herculex';
import generateTrade from '../../services/generate-trade';
import { tradePay } from '../../services/my';

Component(connect({

})({
  props: {
    cardInfo: {},
  },

  methods: {
    async onTradePayCall() {
      // STEP1 请求商户服务端，获取签名后的订单信息orderStr即 tradeNO
      // STEP2 调用tradePay
      try {
        const tradeNO = await generateTrade();
        const result = tradePay(tradeNO);
      } catch (err) {
        console.log(err);
      }
    },
  },
}));
