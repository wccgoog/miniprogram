
import Store from 'herculex';
const app = getApp();

export default new Store({
  connectGlobal: true,
  state: {

  },
  actions: {
    async goToModifyMail({ commit, state, dispatch }, payload) {
      my.navigateTo({
        url: '../modify-info/index?type=email',
      });
    },
    async goToModifyAddress({ commit, state, dispatch }, payload) {
      my.navigateTo({
        url: '../modify-info/index?type=address',
      });
    },
  },
});
