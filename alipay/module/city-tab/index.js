import { connect } from 'herculex';

Component(connect({
  mapStateToProps: {
    cityTabs: (state) => {
      return state.cityTabs;
    },
    currentCityIndex: (state) => {
      const { currentCityIndex } = state;
      return currentCityIndex;
    },
    currentCity: (state) => {
      const { currentCityIndex, cityTabs } = state;
      return (cityTabs || {})[currentCityIndex];
    },
  },
})({
  data: {

  },

  methods: {
    handlePlusClick() {
      this.dispatch('event', { });
      my.alert({
        content: 'plus clicked',
      });
    },
    /**
     * 改变城市选择项
     */
    onChangeCity(e) {
      const { dataset } = e.target;
      const { index, item } = dataset;
      const { code, name, childList } = item;
      const { currentCityIndex } = this.data;
      if (currentCityIndex === index) {
        return;
      }
      this.dispatch('updateStoreData', {
        currentCityIndex: index,
      });

      // TODO: 根据城市CODE更新系统实例页区块

      if (!childList) {
        my.navigateBack();
      }
    },
    /**
     * 区域选择
     */
    onChangeArea(e) {
      const { dataset } = e.target;
      const { index } = dataset;
      this.dispatch('updateAreaData', {
        currentAreaIndex: index,
      });

      my.navigateBack();
    },
  },
}));
