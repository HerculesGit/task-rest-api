const crypto = require('crypto');

var BASE_64_KEY = '';
crypto.randomBytes(48, function (err, buffer) {
  BASE_64_KEY = buffer.toString('hex');
});


const key_in_bytes = Buffer.from(BASE_64_KEY, 'base64')
const iv = crypto.randomBytes(16).toString('hex').slice(0, 16);


const cryptography_data = {
  alg: 'aes-256-ctr',
  cod: 'utf8',
  secretKey: key_in_bytes,
  type: 'hex',
  iv: iv
}

class Cryptography {
  encrypt = (password) => {
    const cipher = crypto.createCipheriv(cryptography_data.alg, cryptography_data.secretKey, cryptography_data.iv);
    cipher.update(password);

    return cipher.final(cryptography_data.type);
  }

  decrypt = (password) => {
    const decripher = crypto.createDecipheriv(cryptography_data.alg, cryptography_data.secretKey);
    decripher.update(password);
    return decripher.final();
  }
}



module.exports = new Cryptography();


