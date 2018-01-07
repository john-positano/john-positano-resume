JohnPositanoResume.controller('jFrameCameraController', function ($rootScope, $window, $scope, $log, $timeout, $interval, $document) {
  $scope._mouseDown = false;
  $scope.mouseDown = function ($e) { $scope._mouseDown = true; };

  $scope.mouseUp = function ($e) { $scope._mouseDown = false; };

  $scope.mouseMove = function ($e) {
    !($scope._mouseDown && $e.shiftKey) || $scope.dragControl($e); 
  };

  $scope.scrollControl = function ($e) {
      $rootScope.$emit('scroll', $e);
      $e.originalEvent.deltaY > 0
        ? $scope.camera.position.z-- 
        : (!($scope.camera.position.z < 6) || $scope.camera.position.z++);
  };

  $scope.dragControl = function ($e) {
    $scope.camera.position.x += $e.originalEvent.movementX / -100;
    $scope.camera.position.y += $e.originalEvent.movementY / 100;
  };

  $document.on('keydown', $scope.keyDown);
  $document.on('keyup', $scope.keyUp);
  $scope.$canvas.on('mousedown', $scope.mouseDown);
  $scope.$canvas.on('mouseup', $scope.mouseUp);
  $scope.$canvas.on('mousemove', $scope.mouseMove);
  $scope.$canvas.on('mousewheel', $scope.scrollControl);
  $document.on('scroll', function ($e) {  
    $e.preventDefault(); 
    $e.stopPropagation();
    console.log($e.isDefaultPrevented(), $e.isPropagationStopped()); 
  });
});