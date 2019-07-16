import store from './store';
Page(store.register({
  data: {
  },
  onShow() {
    // this.dispatch('')
  },

  onLoad(query) {
    let { type } = query;
    this.data.type = type;
    this.dispatch('loadmodifytype', { type });
    this.dispatch('initConfirmSubmitValue');
  },
}));
