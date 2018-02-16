JohnPositanoResume.service('twilioService', function ($q, $http, $rootScope) {
  var self = this;

  self.sendText = function (phoneNumber, key) {
    return $http.post(
      '/twilio/message/' + phoneNumber, 
      { 
        headers: { 
          'x-www-Twilio-Key' : key,
          'x-www-latitude': $rootScope.latitude,
          'x-www-longitude': $rootScope.longitude
        }
      }
    );
  };

  self.sendCall = function (phoneNumber, key) {
    return $http.post(
      '/twilio/call/' + phoneNumber, 
      { 
        headers: { 
          'x-www-Twilio-Key' : key,
          'x-www-latitude': $rootScope.latitude,
          'x-www-longitude': $rootScope.longitude
        }
      }
    );
  };

  return self;
});