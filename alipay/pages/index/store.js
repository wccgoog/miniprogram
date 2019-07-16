import Store from 'herculex';
import { getAuthUserInfo } from '../../services/my';
import { config } from '../../config';
import getCityTabs from '../../services/city-service';
import getPageInstanceBlocks from '../../services/page-service';
import { getReadMessageList } from '../../services/message-list';
// import getServicesInfo from '../../services/services-info';
import getMyServiceInfo from '../../services/my-service';
import { getAreaList } from '../../utils/index';

export default new Store({
  // bus: {},
  // modules: [],
  connectGlobal: true,
  state: {
    userInfo: {},
    cityInfo: {},
    homeBlockList: [],
    // noticeInfo: {},
    // recommendService: [],
    // specialServices: {},
    // isLogin: false,
    // myService: [],
    // marketInfo: {},
    areaCode: '',
  },
  plugins: [],
  // getters: { // TODO:
  //   test: ''
  // },
  actions: {

    // /**
    //  * 测试
    //  */
    // async openPage({ commit, state, dispatch }) {
    //   my.alert({
    //     content: 'in openPage action',
    //   });
    // },
    // /**
    //  * 打开个人中心页面
    //  */
    // goToUserCenter({ commit, state, dispatch }) {
    //   my.navigateTo({
    //     url: '../personal-center/index',
    //   });
    // },
    /**
     * 打开我的卡片页面
     */
    goToMyCard() {
      my.navigateTo({
        url: '../my-card/index',
      });
    },

    // goToMarket() {
    //   my.navigateTo({
    //     url: '../market/index',
    //   });
    // },
    // /**
    //  * 跳转至服务页
    //  */
    // goToCoreService({ commit, state, dispatch }, payload) {
    //   my.navigateTo({
    //     url: '../core-service/index',
    //   });
    // },
    // /**
    //  * 更新城市信息
    //  */
    // async loadCityInfo({ commit, state, dispatch }, payload) {
    //   const { city } = payload;
    //   commit('$global:updateCityInfo', {
    //     cityInfo: {
    //       city: city.name,
    //       temperature: '22℃',
    //       cityCode: '310100',
    //     },
    //   });
    // },

    // /** 加载首页服务信息 */
    // async loadServicesInfo({ commit, state, dispatch }) {
    //   const data = await getServicesInfo();
    //   return commit('actionLoadUserInfo', { ...data });
    // },

    // /** 加载首页我的服务信息 */
    // async loadMyServiceInfo({ commit, state, dispatch }, payload) {
    //   const myService = await getMyServiceInfo(payload);
    //   return commit('$global:actionLoadUseServicerInfo', {
    //     myService: myService,
    //   });
    // },
    /**
     * 登录并获取用户信息
     */
    async onLoginSetUserInfo({ commit, dispatch }, payload) {
      try {
        const { userInfo } = await getAuthUserInfo();
        commit('$global:actionSetUserInfo', {
          userInfo,
          isLogin: true,
        });
        // dispatch('getPageBlocks');
        // dispatch('updateHasReadMessage'); // 是否有未读消息
        // my.hideLoading();
      } catch (error) {
        my.hideLoading();
        console.error('getAuthUserInfo', error);
      }
    },
    /**
     * 更新本地的authCode数据
     */
    async updateLocalAuthCode({ commit, dispatch }) {
      const authObj = my.getStorageSync({ key: 'authCode' });
      if (authObj.data) {
        try {
          const { userInfo, authCode } = await getAuthUserInfo();
          commit('$global:updateAuthCode', {
            isLogin: true,
            authCode,
            userInfo,
          });
          // dispatch('getPageBlocks');
          // dispatch('updateHasReadMessage');// 是否有未读消息
        } catch (err) {
          console.log(err);
        }
      } else {
        commit('$global:updateAuthCode', {
          isLogin: false,
        });
      }
    },
    /**
     * 更新本地CityTabs数据
     */
    async updateCityTabs({ commit }) {
      // 更新City Tree
      const cityTabsStorage = my.getStorageSync({ key: 'cityTabs' });

      // 设置当前选择城市
      const currentAreaStorage = my.getStorageSync({ key: 'currentArea' });
      let currentArea = currentAreaStorage.data ? currentAreaStorage.data : config.currentArea;
      console.log('currentArea', currentArea);
      // 判断当前城市区域是否有效
      if (!JSON.stringify(cityTabsStorage).includes(currentArea.code)) {
        if (cityTabsStorage.length > 0) {
          currentArea = {
            code: cityTabsStorage.data[0].code,
            name: cityTabsStorage.data[0].name,
          };
        }
      }
      commit('$global:currentArea', { currentArea });
    },

    /**
     * 获取实例页信息
    */
    async getPageBlocks({ commit, state, dispatch }) {
      if (!state.$global.isLogin) {
        return;
      }
      const areaCode = state.$global.currentArea.code;// 服务区块
      let indexAreaCode = state.areaCode;
      if (areaCode === indexAreaCode) {
        return;
      }
      const cityCode = areaCode;// 服务区块
      const sysCode = config.sysCode;// 系统code
      const uid = state.$global.userInfo.uid; // 支付宝id
      const pageName = config.pageCode.index; // 实例页名称
      let homeBlockList = [];
      let myService = [];
      let isRequest = false;// 是否请求过接口
      const homeParams = {
        areaCode,
        sysCode,
        uid,
      };
      const myserviceParams = {
        uid,
        cityCode,
      };
      let homeBlockListObj = my.getStorageSync({
        key: 'blockList', // 缓存数据的key
      });
      if (homeBlockListObj && homeBlockListObj.data && homeBlockListObj.data.blockList.length > 0) {
        if (areaCode !== indexAreaCode) {
          homeBlockList = await getPageInstanceBlocks(homeParams, areaCode, pageName);
          isRequest = true;
        } else {
          homeBlockList = getAreaList(homeBlockListObj.data.blockList, config.pageCode.index);
        }
      } else {
        homeBlockList = await getPageInstanceBlocks(homeParams, areaCode, pageName);
        isRequest = true;
      }
      if (!homeBlockList || homeBlockList.length === 0) {
        my.showToast({
          content: '该区域暂无服务，请选择其他地区。',
        });
      }
      // console.log("index/store.js homeBlockList:")
      // console.log(homeBlockList)
      //下面这行代码无法获取返回值,需查明原因  2019.4.16
      // myService = await getMyServiceInfo(myserviceParams);
      //上面代码查询我的服务列表,连接超时.非我方功能需求.
      let myServiceList = [];
      let cardList = [];
      if (homeBlockList && homeBlockList[0] && homeBlockList.length > 0) {
        homeBlockList.map((item, index) => {
          if (item.blockKey === 'tpl-servicecenter') {
            // item.title = '部门';
            myServiceList = item.list;
          }
          if (item.blockKey === 'tpl-servicecenter' && myService && myService.length > 0) {
            myServiceList = myService;
            item.list = myService;
          }
          if (item.blockKey === 'tpl-credentials') {
            cardList = item.list;
          }
        });
        commit('pageAreacode', { areaCode });
        commit('$global:pageBlockList', { homeBlockList, cardList });
        commit('$global:currentMyservice', {
          myService: myServiceList,
        });
      }
      // else
      // {
      
      commit('pageAreacode', { areaCode });
      commit('$global:pageBlockList', { homeBlockList, cardList });
      commit('$global:currentMyservice', {
        myService: myServiceList,
      });
      // }
      if (!isRequest) {
        await getPageInstanceBlocks(homeParams, areaCode, pageName);
      }
      // console.log("state:"+JSON.stringify(state));
    },
    // 是否有未读消息
    //20190419 未使用到消息服务,故注释掉下方代码
    // async updateHasReadMessage({ commit, state, dispatch }, payload) {
    //   if (!state.$global.isLogin) {
    //     return;
    //   }
    //   // console.log(state);
    //   const requestData = {
    //     channelType: 'OWNER_MSG',
    //     readFlag: 'N',
    //     receiverAccount: state.$global.userInfo.uid,
    //   };
    //   const msgList = await getReadMessageList(requestData);
    //   return commit('$global:currentHasReadMessage', {
    //     userInfo: {
    //       ...state.$global.userInfo,
    //       isMsg: msgList.count === 0 ? false : true,
    //     },
    //   });
    // },
  },

});
