import { connect } from 'herculex';

Component(connect({
  mapStateToProps: {
    isLogin: (state) => {
      return state.$global.isLogin;
    },
    cityInfo: (state) => {
      return state.$global.cityInfo;
    },
    myService: (state) => {
      // console.log(state);
      return state.$global.myService;
    },
  },
})({
  methods: {
    onLoginSetUserInfo() {
      this.dispatch('onLoginSetUserInfo');
    },
  },
}));
