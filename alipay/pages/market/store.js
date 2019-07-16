import Store from 'herculex';
import getMarketInfo from '../../services/service-market';
import { getAreaList, navigateToRightUrl, getUid } from '../../utils/index';
import { config } from '../../config/index';
import saveMyService from '../../services/save-myservice';
// todo: 契约未知 数据处理层后面再加
export default new Store({
  connectGlobal: true,
  state: {
    isEdit: false,
    content: [],
    myServiceEdit: [],
  },
  plugins: [
    'logger',
  ],
  mutations: {

  },
  actions: {
    // 请求页面数据
    async loadPageData({ commit, state, dispatch }) {
      let content = [];
      let marketList = my.getStorageSync({
        key: 'blockList', // 缓存数据的key
      });
      if (marketList && marketList.data && marketList.data.blockList.length > 0) {
        content = getAreaList(marketList.data.blockList, config.pageCode.market);
      }
      return commit('updatePageAction', {
        content,
        myServiceEdit: state.$global.myService,
      });
    },
    initPageData({ commit, state, dispatch }) {
      return commit('updatePageAction', {
        isEdit: false,
      });
    },
    // 跳转处理
    async onUrlTap({ commit, state, dispatch }, payload) {
      // debugger
      let type = payload.type;
      let url = payload.url;
      let appId = payload.appId;
      let uid = getUid();
      let params = {
        uid,
        type,
        url,
        appId,
      };
      navigateToRightUrl(params);
    },
    async onEditTap({ commit, state, dispatch }) {
      let p = commit('updateEditAction', {
        isEdit: !state.isEdit,
      });
      // console.info('%c moduleData: ', 'color: green', this.data);
      // console.info('%c pageData: ', 'color: green', this.$page.data);
      return p;
    },
    async onEditComplete({ commit, state, dispatch }) {

    },
    removeServiceItem({ commit, state, dispatch }, id) {
      let tempArr = state.myServiceEdit.filter((item, index) => {
        return item.id !== id;
      });
      return commit('updatemyServiceEdit', {
        myServiceEdit: tempArr,
      });
    },
    // 初始化首页应用（不保存）
    initmyServiceEditValue({ commit, state, dispatch }) {
      return commit('initmyServiceEdit', {
        myServiceEdit: state.$global.myService,
      });
    },
    // 保存我的首页应用（保存）
    saveMyServiceEditValue({ commit, state, dispatch }) {
      let homeBlockList = state.$global.homeBlockList;
      homeBlockList.forEach((item, index, arr) => {
        if (item.blockKey === 'tpl-servicecenter') {
          arr[index].list = state.myServiceEdit;
        }
      });
      let params = {
        serviceIds: [],
        uid: state.$global.userInfo.uid,
      };
      if (state.myServiceEdit && state.myServiceEdit.length > 0) {
        state.myServiceEdit.map((item, index) => {
          params.serviceIds.push(item.id);
        });
      }
      params.serviceIds = params.serviceIds.join(',');
      dispatch('saveMyServiceInfo', params);
      commit('$global:savemMyServiceEdit', {
        myService: state.myServiceEdit,
        homeBlockList,
      });
    },
    // 增加我的首页应用（不保存）
    addServiceItem({ commit, state, dispatch }, payload) {
      let tempArr = state.myServiceEdit ? state.myServiceEdit : [];
      if (tempArr && tempArr.length >= 7) {
        my.showToast({
          content: '最多添加7个七个服务',
        });
        return;
      }
      tempArr.push(payload);
      return commit('updatemyServiceEdit', {
        myServiceEdit: tempArr,
      });
    },
    async saveMyServiceInfo({ commit, state, dispatch }, params) {
      let bool = await saveMyService(params);
      if (bool) {
        my.showToast({
          content: '保存成功！',
        });
      }
    },
  },
});
