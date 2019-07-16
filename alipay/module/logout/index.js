import { connect } from 'herculex';

Component(connect({
    mapStateToProps: {
    isLogin: (state) => {
      return state.$global.isLogin;
    }
  },
})({
  methods: {
    onLogoutClick(e) {
      this.dispatch('onLogout');
    },
  },

}));
