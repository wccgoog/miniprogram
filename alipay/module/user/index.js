import { connect } from 'herculex';

Component(connect({
  mapStateToProps: {
    stateInfo: (state) => {
      console.log("state.$global:",state.$global);
      return state.$global;
    },
    title: (state) => {
      let title = '登录';
      if (state.$global.isLogin) {
        title = '用户中心';
      }
      return title;
    },
  },
})({
  didMount() {

  },
  methods: {
    onGoToUserCenter() {
      if (!this.data.stateInfo.isLogin) {
        this.dispatch('onLoginSetUserInfo');
        return;
      }
      my.navigateTo({
        url: '../userset/index',
      });
      // const bizNo = '23423442';
      // my.startZMVerify({
      //   bizNo,
      //   success: (res) => {
      //     console.log('-----------芝麻认证成功-----------', res, bizNo);
      //     this.dispatch('goToUserCenter');
      //     return true;
      //   },
      //   fail: (error) => {
      //     console.log('-----------芝麻认证失败-----------', error, bizNo);
      //     return false;
      //   },
      // });
    },

    /**
     * 登录获取用户信息
     */
    onLogin() {
      this.dispatch('onLoginSetUserInfo');
    },
  },
}));
