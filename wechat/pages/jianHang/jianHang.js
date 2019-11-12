const app = getApp()

Page({
  data: {
    dataId: 1,
    specificZone: [
      {
        title: '建行——ETC',
        dataId: 'wx91e39a17fe9f1a92',
        src: 'https://jbxqalipay.nanjingdata.cn/image/etc.png',
        bindType: 'navigateToMiniProgram'
      },
      {
        title: '建行——恵懂你',
        dataId: 'wx1d98dac1939c9cdd',
        src: 'https://jbxqalipay.nanjingdata.cn/image/huidongni.png',
        bindType: 'navigateToMiniProgram'
      },
      // {
      //   title: '建行——预约取号',
      //   dataId: 'wx307e11636e7679c6',
      //   src: 'https://jbxqalipay.nanjingdata.cn/image/yuyuequhao.png',
      //   bindType: 'navigateToMiniProgram'
      // }
    ]
  },
  
  navigateToMiniProgram(e) {
    wx.navigateToMiniProgram({
      appId: e.currentTarget.dataset.id,
      path: '',
      // envVersion: 'trial',
      success(res) {
        console.log('success')
        // 打开其他小程序成功同步触发
      }
    })
  }
})