import store from './store';
Page(store.register({
  data: {
  },

  onLoad(query) {
    // console.log(query.city)
    this.dispatch('loadCityData', {});
  },
}));
