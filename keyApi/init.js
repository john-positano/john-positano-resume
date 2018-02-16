let express = require('express'),
    router = express.Router(),
    KeyService = require('./../modules/KeyService.js');

let twilioKey = new KeyService(process.env.TWILIO_CIPHER_PASSWORD);
let sendGridKey = new KeyService(process.env.SENDGRID_CIPHER_PASSWORD);

router.get(
  '/twilio/key',
  (req, res, next) => {
    return res.json({ key: twilioKey.encryptKey() });
  }
);

router.get(
  '/sendGrid/key',
  (req, res, next) => {
    return res.json({ key: sendGridKey.encryptKey() });
  }
);

module.exports = router;