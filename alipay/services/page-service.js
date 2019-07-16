import mockPageInfo from './page-service.mock';
import { Http } from './base';
import { getPageBlock, getAreaList } from '../utils';

export default async function getPageInstanceBlocks(param, areaCode, code) {
  let blockList = await Http.post('proxy-app/serviceCenter/app/getPageInstancBySysAndUid', param);
  // console.log(info);
  // let blockList = mockPageInfo;
  // 缓存当前区域的所有实例页以及页面区块
  if (blockList && blockList.length > 0) {
    blockList = blockList.map((item, index) => {
      return getPageBlock(item);
    });
  } else {
    blockList = [];
  }
  my.setStorageSync({
    key: 'blockList',
    data: {
      areaCode,
      blockList,
    },
  });
  if (code) {
    return getAreaList(blockList, code);
  }
  return blockList;
}
