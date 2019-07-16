import store from './store';
Page(store.register({
  data: {
  },

  onLoad() {
    this.dispatch('loaduserInfo', {});
  },
}));
