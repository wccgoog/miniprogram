import { connect } from 'herculex';

Component(connect({
  mapStateToProps: {
    content: (state) => {
      let arrs = state.content ? state.content : [];
      // console.log(state);
      arrs.forEach((item, index) => {
        item.list = item.list ? item.list : [];
        item.list.forEach((item2, index2) => {
          item2.status = 0;
          if (state.myServiceEdit && state.myServiceEdit.length > 0) {
            state.myServiceEdit.map((v, i) => {
              if (v.id === item2.id) {
                item2.status = 1;
              }
            });
          }
        });
      });
      return arrs;
    },
    isEdit: (state) => state.isEdit,
  },
})({
  methods: {
    onItemClick(e) {
      this.dispatch('onUrlTap', e.target.dataset.link);
    },
  },
}));
