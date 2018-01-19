JohnPositanoResume.service('keyService', function ($q, $http) {
  var self = this;

  self.getTwilioKey = function () {
    return $http.get('/keyAPI/twilio/key');
  };

  self.getSendGridKey = function () {
    return $http.get('/keyAPI/sendGrid/key');
  };

  return self;
});