var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv').config(),
    phone = require('phone'),
    router = express.Router(),
    $gKey = process.env.GOOGLE_PLACES_API_KEY
    $m =  (new (require('../modules/GeneralPurposeMySQLConnection'))).pool;

router.use(bodyParser.json());

router.get('*', (req, res, next) => { if (!req.headers['x-www-Twilio-Key']) { res.status(401).json({}); console.log(req.headers); return;  } });

router.post(
  [
    '/message/',
    '/message/:phoneNumber',
  ],
  function phoneSanitization(req, res, next) {
    var $sanitizedPhone = phone(req.params.phoneNumber);
    if (!$sanitizedPhone[0]) { res.status(400).json('The URI parameter :phoneNumber was an invalid phone number.'); return; }
    next();
  },
  function (req, res, next) {
    var $latitude = req.headers['x-www-latitude'],
        $longitude = req.headers['x-www-longitude'];

    request(
      {
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${$latitude},${$longitude}&radius=500&type=restaurant&key=${$gKey}`,
        method: 'GET',
        json: true
      },
      (err, resp, body) => {
        if (err) { console.log('googlePlacesErr', err); next(); }
        res.locals.googlePlacesResults = body.results;
        next();
      }
    );
    return;
  },
  function speechProcessing(req, res, next) {
    var message = `This is an automated text message${ req.ip ? ` triggered from IP Address: [${req.ip}]` : `` }.`;
    var $g = res.locals.googlePlacesResults;
    if (!$g.length) {
      next();
      return;
    }
    message += ` \r\n\r\nYou should check out ${$g[0].name}!${$g[0].vicinity ? ` The Address is: ${$g[0].vicinity}` : ``}`;
    res.locals.message = message;
    next();
  },
  function (req, res, next) {
    var $p = process.env,
        $url = `https://${$p.TWILIO_USER}:${$p.TWILIO_AUTH_TOKEN}@api.twilio.com/2010-04-01/Accounts/ACf19aba729f40fb0f930534fc7ed59bf7/Messages.json`,
        $googleResponseData = '';

    if (!req.params.phoneNumber) { 
      res.status(400).json(
        {
          errorMessage: 'The URI parameter :phoneNumber is missing, e.g.: /twilio/message/+18009001000'
        }
      );
      return; 
    }

    request
      .post(
        $url,
        {
          form: {
            To: req.params.phoneNumber,
            From: $p.TWILIO_PHONE_NUMBER,
            Body: res.locals.message
          }
        }
      )
      .on(
        'data',
        function (data) {
          res.json(JSON.parse(data.toString()));
        }
      );
  }
);

router.post(
  [
    '/call/',
    '/call/:phoneNumber'
  ],
  function phoneSanitization(req, res, next) {
    var $sanitizedPhone = res.locals.$sanitizedPhone = phone(req.params.phoneNumber);
    if (!$sanitizedPhone[0]) { res.status(400).json('The URI parameter :phoneNumber was an invalid phone number.'); return; }
    if (!req.params.phoneNumber) { 
      res.status(400).json(
        {
          errorMessage: 'The URI parameter :phoneNumber is missing, e.g.: /twilio/message/+18009001000'
        }
      );
      return; 
    }
    next();
  },
  function (req, res, next) {
    var $latitude = req.headers['x-www-latitude'],
        $longitude = req.headers['x-www-longitude'];

    request(
      {
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${$latitude},${$longitude}&key=${$gKey}`,
        method: 'GET',
        json: true
      },
      (err, resp, body) => {
        if (err) { console.log('googlePlacesErr', err); next(); }
        res.locals.googleMapsResults = body.results;
        next();
      }
    );
    return;
  },
  function speechProcessing(req, res, next) {
    var $g = res.locals.googleMapsResults;
    if (!$g.length) {
      next();
      return;
    }
    next();
  },
  function (req, res, next) {
    var $p = process.env,
        $url = `https://${$p.TWILIO_USER}:${$p.TWILIO_AUTH_TOKEN}@api.twilio.com/2010-04-01/Accounts/ACf19aba729f40fb0f930534fc7ed59bf7/Calls`,
        $googleResponseData = '',
        $sanitizedPhoneNumber = res.locals.$sanitizedPhone[0];

    request
      .post(
        $url,
        {
          form: {
            To: $sanitizedPhoneNumber,
            From: $p.TWILIO_PHONE_NUMBER
          }
        }
      )
      .on(
        'data',
        function (data) {
          res.setHeader('Content-Type', 'application/xml');
          res.send(data.toString())
        }
      );
  }  
);

module.exports = router;