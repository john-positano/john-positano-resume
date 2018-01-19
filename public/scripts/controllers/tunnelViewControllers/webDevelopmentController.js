JohnPositanoResume.controller('webDevelopmentController', function ($scope, $timeout, keyService, $log, twilioService) {
  $scope.firstThree = 
  $scope.secondThree =
  $scope.thirdFour = "";
  $scope.isPhoneNumberError = false;

  $scope.sendEmail = function ($this) {
    console.log('$this', $this);
  };
  $scope.sendText = function ($this) {
    keyService.getTwilioKey().then(
      function (_keyData) {
        var $key = _keyData.data.key;
        console.log('$key', $key);
        twilioService.sendText($scope.firstThree + $scope.secondThree + $scope.thirdFour, $key).then(
          $log.log, function () { $scope.isPhoneNumberError = true; }
        );
      },
      $log.error
    );
  };
  $scope.sendCall = function ($this) {
    keyService.getTwilioKey().then(
      function (_keyData) {
        var $key = _keyData.data.key;
        twilioService.sendCall($scope.firstThree + $scope.secondThree + $scope.thirdFour, $key).then(
          $log.log, function () { $scope.isPhoneNumberError = true; }
        );
      },
      $log.error
    );
  };
});