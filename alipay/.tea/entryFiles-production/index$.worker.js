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
require('../../module/header/search-input/index');
require('../../module/header/index');
require('../../module/user/index');
require('../../module/credentials/index');
require('../../module/service-market-my/index');
require('../../module/service-market/index');
require('../../module/service-card/index');
require('../../layout/indexLayout/index');
require('../../module/footer/index');
require('../../module/userinfo-setting-item/index');
require('../../module/userinfo-setting/index');
require('../../module/service-item-ms/index');
require('../../module/card-market-home/index');
require('../../module/service-item/index');
require('../../module/card-market-other/index');
require('../../module/modify-info/index');
require('../../module/card-header/index');
require('../../module/card-service/index');
require('../../module/card-hello/index');
require('../../module/card-sites/index');
require('../../module/card-special-service/index');
require('../../node_modules/mini-antui/es/vtabs/index');
require('../../node_modules/mini-antui/es/vtabs/vtab-content/index');
require('../../node_modules/mini-antui/es/list/index');
require('../../node_modules/mini-antui/es/list/list-item/index');
require('../../module/city-tab/index');
require('../../module/credential-card/index');
require('../../node_modules/mini-antui/es/page-result/index');
require('../../module/message-item/message-item');
require('../../pages/index/index');
require('../../pages/web-view/index');
require('../../pages/userset/index');
require('../../pages/market/index');
require('../../pages/modify-info/index');
require('../../pages/personal-center/index');
require('../../pages/core-service/index');
require('../../pages/city-list/index');
require('../../pages/my-card/index');
require('../../pages/message-list/message-list');
require('../../pages/scan/scan');
require('../../pages/listOfItems/listOfItems');
require('../../pages/faceVerify/faceVerify');
require('../../pages/home/home');
require('../../pages/suggestion/suggestion');
require('../../pages/showPic/showPic');
require('../../pages/picList/picList');
require('../../pages/onePic/onePic');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}