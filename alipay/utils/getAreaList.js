export default function getAreaList(arr, code) {
  let returnArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] && arr[i].code && arr[i].code === code) {
      returnArr = arr[i].blockList;
    }
  }
  return returnArr;
}
