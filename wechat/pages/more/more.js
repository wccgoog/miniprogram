Page({
  data: {
    typeDepart: "",
    list: "",
    //1个人，2法人
    firstCatalog: "",
    //theme主题department部门
    type:'',
  },
  onLoad: function(options) {
    //page的title
    if (options.firstCatalog == 1) {
      wx.setNavigationBarTitle({
        title: '个人服务'
      })
    } else if (options.firstCatalog == 2) {
      wx.setNavigationBarTitle({
        title: '企业服务'
      })
    }
    console.log("进入更多页面：", options)
    var _this = this;
    this.setData({
      firstCatalog: options.firstCatalog
    })
    if (options.typeId == 0) {
      this.setData({
        typeDepart: "主 题",
        type:'theme',
      })

      wx.request({
        url: 'https://jbzwnew.qimixi.net/api/index/topicList',
        data: {
          'type': options.firstCatalog
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data)
          _this.setData({
            list: res.data.data
          })
        }
      })
    } else if (options.typeId == 1) {
      this.setData({
        typeDepart: "部 门",
        type:'department',
      })
      wx.request({
        url: 'https://jbzwnew.qimixi.net/api/index/departmentList',
        data: {
          'type': options.firstCatalog
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log("more.js", res.data.data);
          _this.setData({
            list: res.data.data
          })
        }
      })
    }

  },
  //点击进入列表
  goListDetail(e) {
    console.log(this.data.typeDepart)
    if (this.data.typeDepart == "主 题") {
      wx.navigateTo({
        url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=t' + e.currentTarget.dataset.id
      });
    } else if (this.data.typeDepart == "部 门") {
      wx.navigateTo({
        url: '../listDetail/listDetail?firstCatalog=' + this.data.firstCatalog + '&secondCatalog=d' + e.currentTarget.dataset.id
      });
    }
  },
})