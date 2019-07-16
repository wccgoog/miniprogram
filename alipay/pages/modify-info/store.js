
import Store from 'herculex';
import userinfoapi from '../../services/modify-info';

export default new Store({
  connectGlobal: true,
  state: {
    modifyType: 'email',
    inputValue: '',
    isConfirmSubmit: false,
  },
  mutations: {
    BACKTOPREPAGE(state, payload) {
      // my.navigateTo({
      //   url: '../userset/index',
      // });
      my.navigateBack();
    },
  },

  actions: {
    saveOnIputValue({ commit }, payload) {
      return commit({ ...payload });
    },
    async actionModifyUserInfo({ commit }, payload) {
      try {
        const authUser = await userinfoapi(payload);
        commit('$global:actionModifyUserInfo', {
          userInfo: { ...authUser },
          isLogin: true,
        });
        commit('INITSUBMIT', {
          isConfirmSubmit: false,
        });
        my.showToast({
          content: '修改成功',
        });
        setTimeout(() => {
          commit('BACKTOPREPAGE');
        }, 1000);
      } catch (error) {
        commit('INITSUBMIT', {
          isConfirmSubmit: false,
        });
        console.error('actionModifyUserInfo', error);
      }
    },

    async loadmodifytype({ commit, state, dispatch }, payload) {
      this.state.modifyType = payload.type;
    },
    modifyisConfirmSubmitValue({ commit, state, dispatch }, payload) {
      return commit('COMPLETESUBMIT', {
        isConfirmSubmit: true,
      });
    },

    initConfirmSubmitValue({ commit, state, dispatch }, payload) {
      return commit('INITSUBMIT', {
        isConfirmSubmit: false,
        inputValue: this.state.modifyType === 'email' ? state.$global.userInfo.email : state.$global.userInfo.address,

      });
    },
  },
});
