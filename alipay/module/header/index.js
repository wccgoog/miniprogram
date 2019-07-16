import { connect } from 'herculex';
import { config } from '../../config';

Component(connect({
  mapStateToProps: {
    currentArea: (state) => {
      const currentArea = state.$global.currentArea ? state.$global.currentArea : config.currentArea;
      return {
        name: currentArea.name,
        temperature: currentArea.temperature ? currentArea.temperature : config.currentArea.temperature,
      };
    },
    isMsg: (state) => {
      return state.$global.userInfo && state.$global.userInfo.isMsg;
    },
    isLogin: (state) => state.$global.isLogin,
  },
})({
  methods: {
    onCityTap() {
      my.navigateTo({
        url: '../city-list/index',
      });
    },
    onGoToMessageList() {
      if (this.data.isLogin) {
        my.navigateTo({
          url: '../message-list/message-list',
        });
      } else {
        my.showToast({
          content: '请登录后查看',
        });
      }
    },
  },
}));
