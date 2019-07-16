import { connect } from 'herculex';

Component(connect({
  mapStateToProps: {
    home: (state) => state.home,
    isEdit: (state) => state.isEdit,
    myService: (state) => {
      return state.$global.myService;
    },
    myServiceEdit: (state) => {
      return state.myServiceEdit;
    },
  },
})({
  methods: {
    onEditTap(e) {
      this.dispatch('onEditTap');
    },
    onCancelTap(e) {
      // 恢复数据
      this.dispatch('onEditTap');
      this.dispatch('initmyServiceEditValue');
    },
    onCompleteTap(e) {
      this.dispatch('onEditTap');
      this.dispatch('saveMyServiceEditValue');
    },
  },
}));
