import { connect } from 'herculex';

Component(connect({
  mapStateToProps: {
    userInfo(state) {
      return state.$global.userInfo;
    },
  },
}

)({
  data: {
  },
  didMount() {

  },

  methods: {
    goToModifyEail() {
      this.dispatch('goToModifyMail');
    },
    goToModifyAddress() {
      this.dispatch('goToModifyAddress');
    },
  },
}));
