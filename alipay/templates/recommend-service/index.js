// import { connect } from 'herculex';
import { matchUrl, navigateToRightUrl, getUid } from '../../utils/index';
// Component(connect({
//   mapStateToProps: {
//     isLogin: (state) => {
//       return state.$global.isLogin;
//     },
//     cityInfo: (state) => {
//       return state.$global.cityInfo;
//     },
//     myService: (state) => {
//       console.log(state);
//       return state.$global.myService;
//     },
//   },
// })({
//   methods: {
//     onGoMarket() {
//       this.dispatch('goToMarket');
//     },
//   },
// }));
export default {
  goToNavigateUrl(e) {
    let type = e.target.dataset.type;
    let url = e.target.dataset.url;
    let appId = e.target.dataset.appId;
    let uid = getUid();
    let params = {
      type,
      url,
      appId,
      uid,
    };
    navigateToRightUrl(params);
  },
};
