// import convertBlock from './convertBlock';
import getPageBlock from './getPageBlock';
import getAreaList from './getAreaList';
import { matchUrl, navigateToRightUrl, regHttpRequest } from './martchUrl';
import { setUid, getUid } from './uid';
export const vefifyEmail = (mail) => {
  let re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  return re.test(mail);
};

export const seekArrListValue = (arr, key) => {
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
export { getPageBlock, getAreaList, matchUrl, navigateToRightUrl, regHttpRequest, setUid, getUid };
