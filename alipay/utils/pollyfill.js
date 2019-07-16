const pollyfill = {};
pollyfill.entries = () => {
  if (!Object.entries) {
    Object.prototype.entries = (obj) => { // eslint-disable-line
      const ownProps = Object.keys(obj);
      let i = ownProps.length;
      const resArray = new Array(i);
      while (i--) {
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }
      return resArray;
    };
  }
};
export default pollyfill;
// export default function entries(obj) {
//     let keys = [], vals = []
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             const element = obj[key];
//             keys.push(key)
//             vals.push(element)
//         }
//     }
//     return [keys, vals]
// }
