const app = getApp();
var util = require('./util.js');
var md5 = require('./md5.js');
var base = require('./base64.js');

var date = util.formatDate(new Date());

function md5Test(openid) {
  var userid = base.base64.encode(openid);
  // console.log('userid',userid);
  var flag = 'wssmall_jszq';
  var str = userid+date+flag;
  console.log('str', str);
  var myToken = md5.hex_md5(str);
  return myToken;
}

module.exports = {
  md5Test: md5Test
}