const app = getApp();

Page({
  data: {
    headInfo:null,
    list:null,
    isFold: true
  },
  onLoad(options) {
    my.alert({content:app.qrCode});
    let urlAttr = this.getUrl();
    this.setData({urlAttr:urlAttr});
    let _this = this;
    console.log("loading");
    my.request({
      url: 'https://jbzw.qimixi.net/api/window/affairList', // 目标服务器url
      method: 'GET',
      data:{
        window_id:urlAttr
      },
      success: (res) => {
        console.log(res.data.data);
        my.alert({content:res.data.data.list[0]});
        _this.setData({
          list: res.data.data.list,
          headInfo: res.data.data.window_info
        })
      },
    });
  },
  //带参数的url获取参数对象
  getRequest() {  
      let url = app.qrCode; 
      let theRequest = new Object();  
      if (url.indexOf("?") != -1) {  
          let str = url.substr(url.indexOf("?") + 1);  
          let strs = str.split("&");  
          for(let i = 0; i < strs.length; i ++) {  
              theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);  
          }  
      }
    return theRequest;  
  },
  //不带参数时获取最后的目录路径
  getUrl(){
    let url = app.qrCode;
    let num = url.substr(url.lastIndexOf('/')+1);
    return num;
  },
  down(e) {
    this.setData({
      isFold: !this.data.isFold
    })
  },
  gotoContentDetail(e){
    console.log(e.currentTarget.dataset.id)
    my.navigateTo({
      url: '/pages/web-view/index?requestUrl=' + "https://jbxqalipay.nanjingdata.cn/m/contentDetail.html?id=" + e.currentTarget.dataset.id,
    });
  }
});
