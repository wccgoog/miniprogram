if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;



function success() {
require('../../app');
require('../../module/header/search-input/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/header/index?hash=3e94b465ae6855521f4a753bbfecc1f4def49ae6');
require('../../module/user/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/credentials/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/service-market-my/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/service-market/index?hash=3d61fe21db485273095c33c3e90f63c572d957ba');
require('../../module/service-card/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../layout/indexLayout/index?hash=679a05527d049828cc7dca2508c9b6fe791c20bd');
require('../../module/footer/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/userinfo-setting-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/userinfo-setting/index?hash=f7f5df61639564bc76d56ad11ecbc2b9c501dfda');
require('../../module/service-item-ms/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/card-market-home/index?hash=40f9a8d80674d55077eb4d379f2e92b9bdb90f7b');
require('../../module/service-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/card-market-other/index?hash=05643667187c4b55ffbdeb0673291b69ca99d9a0');
require('../../module/modify-info/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/card-header/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/card-service/index?hash=7495abf60a4cbdb9a62ffced59150bfb180a95be');
require('../../module/card-hello/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/card-sites/index?hash=7495abf60a4cbdb9a62ffced59150bfb180a95be');
require('../../module/card-special-service/index?hash=7495abf60a4cbdb9a62ffced59150bfb180a95be');
require('../../node_modules/mini-antui/es/vtabs/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/vtabs/vtab-content/index?hash=a11fdcdff8ea970c65f185a8731cafe48f67047c');
require('../../node_modules/mini-antui/es/list/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/list/list-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/city-tab/index?hash=1a29f954f213fa3e5897d7583d6f931cce6411df');
require('../../module/credential-card/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-antui/es/page-result/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../module/message-item/message-item?hash=1a2f341258d23fb33746115b8f2f822c704ea9a4');
require('../../pages/index/index?hash=bd71a7fa2ab137e195585b662a7813d0989158cf');
require('../../pages/web-view/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/userset/index?hash=d1abebc73f34bb75667efcb781084a274895da07');
require('../../pages/market/index?hash=2fe34030743a20d81ab6f8c228a0b1c5cbc08b87');
require('../../pages/modify-info/index?hash=bbbc0069e068749969bdf4b9c9f3cb082e99beda');
require('../../pages/personal-center/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/core-service/index?hash=b66383ca67c3e142793a83b9370414c0d97572e4');
require('../../pages/city-list/index?hash=50f1ddd216c4636d43473a65b46b6059ce4c8e86');
require('../../pages/my-card/index?hash=f56cfe5b913d62e520f98921ca2892acefc2be84');
require('../../pages/message-list/message-list?hash=c4cda2e964ca39e060b13ff9f99c125df65d5c64');
require('../../pages/scan/scan?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/listOfItems/listOfItems?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/faceVerify/faceVerify?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/home/home?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/suggestion/suggestion?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/showPic/showPic?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/picList/picList?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/onePic/onePic?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}