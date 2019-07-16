import store from './store';
Page(store.register({
  data: {
  },

  onLoad(option) {
    // 有些用户的uid中包含空格,需要替换为+号,否则实名接口会报错,跳转链接中包含了用户的uid,所以全部替换即可
    option.requestUrl = option.requestUrl.replace(/ /g, '+');
    let requestUrl = option.requestUrl ? option.requestUrl : '';
    this.dispatch('loadRequestUrl', requestUrl);
  },
}));
