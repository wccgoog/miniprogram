import store from './store';

Page(store.register({
  onReady() {},
  onShow() {},
  onLoad() {
    this.dispatch('loadCardList');
  },
}));
