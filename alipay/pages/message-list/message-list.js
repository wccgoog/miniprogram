import store from './store';

Page(store.register({
  onLoad () {
    this.dispatch('initPageNo');
    this.dispatch('loadMessageData', {});
  },
  onPullDownRefresh () {
    this.dispatch('initPageNo');
    this.dispatch('loadMessageData', {});
  },
  onReachBottom () {
    if (!this.state.bottomMsg) {
      this.dispatch('loadMessageData', { turing: true });
    };
  },
}));
