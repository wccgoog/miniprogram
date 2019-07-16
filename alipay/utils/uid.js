import CryptoJS from 'crypto-js';
/**
 * 将uid存到Storage中
 */
export function setUid(uid) {
  // 通过aes对uid进行加密
  let _uid = getAES(uid);
  my.setStorageSync({
    key: 'uid',
    data: {
      uid: _uid,
    },
  });
}

/**
 * 在Storage取出uid
 * 入参 type:String
 */
export function getUid() {
  let uid = (my.getStorageSync({ key: 'uid' }).APDataStorage || my.getStorageSync({ key: 'uid' }).data).uid;
  console.log('-----getUid', uid);
  return uid;
}

/**
 * 加密
 */
function getAesString(data, key, iv) {  // 加密
  let keyValue = CryptoJS.enc.Utf8.parse(key);
  // let iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, keyValue,
    {
      // iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
  return encrypted.toString();    // 返回的是base64格式的密文
}

function getAES(data) { // 加密
  let keyValue = 'rftgasdasdfasfdf';  // 密钥
  let iv = '1qazxsw23edcvfr4';
  let encrypted = getAesString(data, keyValue, iv); // 密文
  let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

