
import Store from 'herculex';
import getCityTabs from '../../services/city-service';

export default new Store({
  connectGlobal: true,
  state: {
    // cityTabs: [],
    // currentCityIndex: 0,
    // currentAreaIndex: 0,
  },
  actions: {
    async loadCityData({ commit, state, dispatch, global }) {
      const cityTabsStorage = my.getStorageSync({ key: 'cityTabs' });
      const cityTabs = cityTabsStorage.data ? cityTabsStorage.data : await getCityTabs();
      const currentArea = global.currentArea;
      // 查询当前选择的城市
      let currentCityIndex = 0;
      for (let i = 0; i < cityTabs.length; i++) {
        if (cityTabs[i].code === currentArea.code) {
          currentCityIndex = i;
          break;
        } else if (Array.isArray(cityTabs[i].childList)) {
          let item = cityTabs[i].childList.filter(item => item.code === currentArea.code);
          if (item.length === 1) {
            currentCityIndex = i;
            break;
          }
        }
      }
      return commit('actionLoadCityData', { cityTabs, currentCityIndex });
    },

    updateStoreData({ commit, state, dispatch }, payload) {
      const { currentCityIndex } = payload;
      const { cityTabs } = state;
      const { childList } = cityTabs[currentCityIndex];
      if (!childList) {
        const currentArea = {
          name: cityTabs[currentCityIndex].name,
          code: cityTabs[currentCityIndex].code,
        };
        my.setStorageSync({
          key: 'currentArea',
          data: {
            ...currentArea,
          },
        });
        commit('$global:currentArea', { currentArea });
      }
      return commit({ ...payload });
    },

    async updateAreaData({ commit, state, dispatch }, payload) {
      const { currentCityIndex, cityTabs } = state;
      const { childList } = cityTabs[currentCityIndex];
      const { currentAreaIndex } = payload;
      const currentArea = {
        name: childList[currentAreaIndex].name,
        code: childList[currentAreaIndex].code,
      };
      my.setStorageSync({
        key: 'currentArea',
        data: {
          ...currentArea,
        },
      });

      return commit('$global:currentArea', { currentArea });
    },
  },
});
