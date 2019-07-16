import convertBlock from './convertBlock';
import { config } from '../config/index';
// export default function getPageBlock(arr, code) {
//     let resultArr = arr.filter(item => {
//     return item.code === code;
//   }).filter(k => k); // 删除数组中的空值，即没有匹配到的block
//     if(resultArr && resultArr.length>0){
//     return resultArr[0].pageBlock.blockList;
//     }
//     return [];
// }

export default function getPageBlock(block) {
  const serviceCenterBlock = (obj) => {
    const blockItem = {
      code: obj.code,
      blockList: obj.pageBlock && obj.pageBlock.blockList && obj.pageBlock.blockList.map((item, index) => {
        return convertBlock(item);
      }),
    };
    return blockItem;
  };

  const blockMaps = new Map([
    [config.pageCode.index, serviceCenterBlock],
    [config.pageCode.market, serviceCenterBlock],
    [config.pageCode.modifyEmail, serviceCenterBlock],
    [config.pageCode.modifyAddress, serviceCenterBlock],
    [config.pageCode.userSetting, serviceCenterBlock],
    [config.pageCode.messageLIst, serviceCenterBlock],
    [config.pageCode.cityList, serviceCenterBlock],
    [config.pageCode.personalCenter, serviceCenterBlock],
    [config.pageCode.myCard, serviceCenterBlock],
  ]);

  const action = blockMaps.get(block.code);
  if (action) {
    console.log('block', block);
    return action.call(this, block);
  }

  return {
    code: '',
    blockList: [],
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
