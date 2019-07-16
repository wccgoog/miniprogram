import Store from 'herculex';
import getCoreService from '../../services/core-service';
// todo: 契约未知 数据处理层后面再加
export default new Store({
  state: {
    userInfo: {},
    serviceInfo: {},
    spectialServiceInfo: {},
    sitesInfo: {},
  },
  plugins: [
    'logger',
  ],
  actions: {
    // 请求页面数据
    async loadPageData({ commit, state, dispatch }) {
      const {
        userInfo,
        serviceInfo,
        spectialServiceInfo,
        sitesInfo,
      } = await getCoreService();
      return commit('loadPageDataAction', {
        userInfo,
        serviceInfo,
        spectialServiceInfo,
        sitesInfo,
      });
    },
    // 更新当前选中城市
    async onSiteChange({ commit, state, dispatch }, payload) {
      const { markerId } = payload;
      const { sitesInfo } = state;
      const newCurSite = sitesInfo.locations.filter(location => location.id === markerId)[0];
      const newMarkers = sitesInfo.markers.map(marker => {
        marker.iconPath = 'https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png';

        return marker;
      });
      return commit('updateCurSiteAction', {
        'sitesInfo.curSite': newCurSite,
        'sitesInfo.markers': newMarkers,
      });
    },
    async onUrlTap({ commit, state, dispatch }, payload) {
      my.navigateTo({
        url: payload,
      });
    },
  },
});
