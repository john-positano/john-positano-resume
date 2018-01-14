JohnPositanoResume.controller('jFrameCameraController', function ($rootScope, $window, $scope, $log, $timeout, $interval, $document) {
  $rootScope.jFrameCamera = $scope.camera;
  $scope._mouseDown = false;
  $scope.mouseDown = function ($e) { $scope._mouseDown = true; };

  $scope.mouseUp = function ($e) { $scope._mouseDown = false; };

  $scope.mouseMove = function ($e) {
    !($scope._mouseDown && $e.shiftKey) || $scope.dragControl($e); 
  };

  $scope.scrollControl = function ($e) {
    $e.originalEvent.deltaY > 0
      ? (!($scope.camera.position.z > -75) || $scope.camera.position.z--) 
      : (!($scope.camera.position.z < 6) || $scope.camera.position.z++);
      $timeout(function () { $rootScope.$emit('scroll', $e, $scope); });
  };

  $scope.keyControl = function ($e) {
    !$e.key.match(/down/gi) || (!($scope.camera.position.z > -75) || $scope.camera.position.z--);
    !$e.key.match(/up/gi) || (!($scope.camera.position.z < 6) || $scope.camera.position.z++);
    $timeout(function () { $rootScope.$emit('scroll', $e, $scope); }); 
  };

  $scope.swipeControl = function ($e) {
    console.log($e.type);
    if ($e.type == "swipedown") { (!($scope.camera.position.z > -75) || $scope.camera.position.z--); }
    if ($e.type == "swipeup") { (!($scope.camera.position.z < 6) || $scope.camera.position.z++); }
    $timeout(function () { $rootScope.$emit('scroll', $e, $scope); }); 
  }

  $scope.dragControl = function ($e) {
    $scope.camera.position.x += $e.originalEvent.movementX / -100;
    $scope.camera.position.y += $e.originalEvent.movementY / 100;
  };

  $document.on('keydown', $scope.keyDown);
  $document.on('keyup', $scope.keyUp);
  $scope.$canvas.on('mousedown', $scope.mouseDown);
  $scope.$canvas.on('mouseup', $scope.mouseUp);
  $scope.$canvas.on('mousemove', $scope.mouseMove);
  // $scope.$canvas.on('mousewheel', $scope.scrollControl);
  $document.on('mousewheel', $scope.scrollControl);
  $document.on('keydown', $scope.keyControl);
  $document.on('swipe', console.log);
  $document.on('swipeup', $scope.swipeControl);
  $document.on('swipedown', $scope.swipeControl);
  $document.on('swipeLeft', angular.noop);
  $document.on('swipeRight', angular.noop);
  $document.on('tap', function ($e) { $e.preventDefault(); $e.stopPropagation(); });
  $document.on('focus', function ($e) { console.log('document focus', $e); });
  $document.on('tapHold', angular.noop);
  angular.element($window).on(
    'resize',
    function () {
      $scope.sizeUpFrame($window.innerWidth, $window.innerHeight);
      $scope.animate();
    }
  );

  // $rootScope.$emit('scroll', new Event('mousewheel'), $scope);
});