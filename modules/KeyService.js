let crypto = require('crypto');

class KeyService {
  constructor (password) {
    var self = this;

    self.encryptKey = () => {
      var $c = crypto.createCipher('aes256', password);
      return $c.update(Date(), 'utf8', 'hex') + $c.final('hex');
    };

    self.decryptKey = (hash) => {
      var $d = crypto.createDecipher('aes256', password);
      return $d.update(hash, 'hex', 'utf8') + $d.final('utf8');
    };

    return self;
  }
}

module.exports = KeyService;