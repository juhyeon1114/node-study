const crypto = require('crypto');

const base64 = crypto.createHash('sha512').update('비밀번호').digest('base64');
const hex = crypto.createHash('sha512').update('비밀번호').digest('hex');

console.log(base64, hex);
