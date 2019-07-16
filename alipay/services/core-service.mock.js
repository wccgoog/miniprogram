// 用户信息
const userInfo = {
  name: '冯辉',
};

// 服务基本信息
const serviceInfo = {
  title: {
    txt: '服务窗口',
    more: {},
  },
  list: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      txt: '浙江税务',
      url: '../index/index',
    },
  ],
};

// 特色服务信息
const spectialServiceInfo = {
  title: {
    txt: '特色服务',
    more: {},
  },
  list: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      title: '杭州通公交卡',
      desc: '手机刷码乘公交',
      button: {
        txt: '使用',
        url: '../index/index',
      },
    },
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      title: '杭州地铁乘车码',
      desc: '手机刷码过闸进站',
      button: {
        txt: '使用',
        url: '../index/index',
      },
    },
  ],
};

// 办事网点信息
const sitesInfo = {
  title: {
    txt: '办事网点',
    more: {
      txt: '全部',
      url: '../index/index',
    },
  },
  curSite: {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
    id: 10,
    latitude: 30.277483,
    longitude: 120.131441,
    title: '上海中心服务网点',
    addr: '银城东路666号',
    time: '营业时间：周一至周五 09:00-18:00',
    phone: '13888888888',
  },
  locations: [
    {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/OdOBtUlwZxmQGJMdlMEr.png',
      id: 10,
      latitude: 30.277483,
      longitude: 120.131441,
      title: '上海中心服务网点',
      addr: '银城东路666号',
      time: '营业时间：周一至周五 09:00-18:00',
      phone: '13888888888',
    }, {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/ocJzfTKOFRGfBDnwmXKV.png',
      id: 11,
      latitude: 30.277483,
      longitude: 120.143441,
      title: '金茂大厦服务网点',
      addr: '浦东南路8888号',
      time: '营业时间：周一至周五 10:00-17:00',
      phone: '13888888888',
    }, {
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/ocJzfTKOFRGfBDnwmXKV.png',
      id: 12,
      latitude: 30.277483,
      longitude: 120.121441,
      title: '古墩路服务网点',
      addr: '西湖区古墩路108',
      time: '营业时间：周一至周五 09:00-17:00',
      phone: '13888888888',
    },
  ],

};

const markers = sitesInfo.locations.map(location => {
  const marker = {};
  marker.iconPath = 'https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png';
  marker.id = location.id;
  marker.latitude = location.latitude;
  marker.longitude = location.longitude;
  marker.width = 19;
  marker.height = 32;
  return marker;
});

sitesInfo.markers = markers;

export default {
  userInfo,
  serviceInfo,
  spectialServiceInfo,
  sitesInfo,
};
