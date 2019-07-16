export default function convertBlock(block) {
  const systemInformationBlock = (obj) => {
    const blockItem = {
      blockKey: block.blockStyle,
    };
    if (Array.isArray(obj.blockElementList) && obj.blockElementList.length > 0) {
      blockItem.image = seekArrListValue(obj.blockElementList[0], 'image');
      blockItem.desc = seekArrListValue(obj.blockElementList[0], 'desc');
      blockItem.url = seekArrListValue(obj.blockElementList[0], 'url');
    }
    return blockItem;
  };

  const credentialsBlock = (obj) => {
    let moreText = seekArrListValue(obj.blockParams, 'moreText');
    let moreTextUrl = seekArrListValue(obj.blockParams, 'moreTextUrl');
    let indicatorDots = seekArrListValue(obj.blockParams, 'indicatorDots');
    let autoplay = seekArrListValue(obj.blockParams, 'autoplay');
    let interval = seekArrListValue(obj.blockParams, 'interval');
    let tempArr = [];
    if (obj.blockElementList.length > 0) {
      obj.blockElementList.map((item, index) => {
        tempArr.push({
          title: seekArrListValue(item, 'title'),
          image: seekArrListValue(item, 'image'),
          desc: seekArrListValue(item, 'desc'),
          subtitle: seekArrListValue(item, 'subtitle'),
        });
      });
    }
    const blockItem = {
      blockKey: obj.blockStyle,
      name: obj.blockName,
      moreText: moreText ? moreText : '全部证件',
      moreTextUrl: moreTextUrl ? moreTextUrl : '',
      indicatorDots: indicatorDots ? indicatorDots : true,
      autoplay: autoplay ? autoplay : false,
      interval: interval ? interval : 3000,
      list: tempArr,
    };
    return blockItem;
  };

  const servicecardBlock = (obj) => {
    let icon = seekArrListValue(obj.blockParams, 'icon');
    const blockItem = {
      blockKey: obj.blockStyle,
      title: obj.blockName,
      desc: seekArrListValue(obj.blockParams, 'desc'),
      url: seekArrListValue(obj.blockParams, 'url'),
      icon: icon ? icon : '',
      list: obj.blockElementList,
    };
    return blockItem;
  };

  const serviceCenterBlock = (obj) => {
    const blockItem = {
      serviceType: seekArrListValue(obj.blockParams, 'serviceType'),
      blockKey: obj.blockStyle,
      title: obj.blockName,
      list: obj.blockElementList,
    };
    return blockItem;
  };

  const blockMaps = new Map([
    ['tpl-information', systemInformationBlock], // 系统公告模块
    ['tpl-credentials', credentialsBlock],
    ['tpl-servicecard', servicecardBlock],
    ['tpl-servicecenter', serviceCenterBlock],
    ['tpl-recommendservice', serviceCenterBlock],
  ]);

  const action = blockMaps.get(block.blockStyle);
  if (action) {
    return action.call(this, block);
  }

  return {
    blockKey: 'tpl-none',
    title: '',
    list: [],
  };
}

const seekArrListValue = (arr, key) => {
  let val = '';
  if (arr && arr.length) {
    arr.forEach((item, index) => {
      if (item['elementKey'] === key) {
        val = item['elementValue'];
      }
    });
    return val;
  }
};
