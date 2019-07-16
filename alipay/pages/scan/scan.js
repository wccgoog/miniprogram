const app = getApp();

Page({
  data: {},
  onLoad() {
    if(app.qrCode){
      console.log("支付宝外部二维码扫描进入--app.qrCode:"+app.qrCode)
      let url = app.qrCode;
      let num = url.substr(url.lastIndexOf('/')+1);
      url = url.substr(0,url.lastIndexOf('/'));
      let name = url.substr(url.lastIndexOf('/')+1);
      console.log(name);
      if(name == "img"){
        my.navigateTo({
          url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/listOfItems.html?window_id=" + num,
        });
      }
      else if(name == "in"){
        my.navigateTo({
          url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/index.html",
        });
      }
    }
    else{
      this.scan();
    }
  },
  scan(){
    console.log("scan starting");
    my.scan({
      type: 'qr',
      success: (res) => {
        if (res.code.indexOf("https://jbzw.qimixi.net/static/img/")>=0){
          let str = res.code;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log("scan.js",id);
          my.navigateTo({
            url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/listOfItems.html?window_id=" + id,
          });
        } else if (res.code.indexOf("https://jbzw.qimixi.net/static/in/") >= 0){
          let str = res.code;
          let p = str.lastIndexOf("/");
          let id = str.substring(p + 1, str.length);
          console.log(id);
        } else {
          my.navigateTo({
          url: '/pages/web-view/index?requestUrl=' + res.code,
          });
        }
      },
    });
  }
});
