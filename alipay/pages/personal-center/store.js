import Store from 'herculex';
import getPersonalInfo from '../../services/personal-info';
import { getAuthUserInfo } from '../../services/my';

// todo: 契约未知 数据处理层后面再加
export default new Store({
  connectGlobal: true,
  state: {
    list: [],
  },
  plugins: [
    'logger',
  ],
  actions: {
    // 请求页面数据
    async loadPageData({ commit, state, dispatch }) {
      const { list } = await getPersonalInfo();
      return commit('xxxAction', {
        list,
      });
    },
    // 跳转处理
    async onUrlTap({ commit, state, dispatch }, payload) {
      my.navigateTo({
        url: payload,
      });
    },
    // 退出登录
    async onLogout({ commit, state, dispatch }) {
      my.clearStorageSync();
      commit('$global:actionClearUserInfo', {
        userInfo: {},
        noticeInfo: {},
        recommendService: [],
        specialServices: {},
        isLogin: false,
        myService: [],
        marketInfo: {},
        cardList: {},
        homeBlockList: {},
        // currentArea: {},
      });
      my.reLaunch({
        url: '../index/index',
      });
    },
    async onLoginSetUserInfo({ commit, state, dispatch }) {
      try {
        const authUser = await getAuthUserInfo();
        commit('$global:actionSetUserInfo', {
          userInfo: authUser.userInfo,
          isLogin: true,
        });
      } catch (error) {
        console.error('getAuthUserInfo', error);
      }
    },
  },
});
