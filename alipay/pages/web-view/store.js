import Store from 'herculex';
const app = getApp();

export default new Store({
  connectGlobal: true,
  state: {
    requestUrl: '',
  },
  actions: {
    async loadRequestUrl({ commit, state, dispatch }, requestUrl) {
      commit('modifyRequestUrl', {
        requestUrl,
      });
      console.log("state.requestUrl:"+state.requestUrl);
      // console.log("state:"+JSON.stringify(state));
    },
  },
});
